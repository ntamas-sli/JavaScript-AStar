const fieldCol = document.querySelectorAll('.field-col');
const fieldRow = document.querySelectorAll('.field-row');

let dirCheck = (item, lenC, len) => {
    dir = [];
    for (let i = 0; i < 4; i++) {
        dir[i] = true;
    }
    if (item - lenC <= 0 || 
        fieldCol[item - lenC].style.backgroundColor === "black") {
        dir[0] = false;
        // ^
    } 
    if (item % lenC === lenC - 1 ||
        fieldCol[item + 1].style.backgroundColor === "black") {
        dir[1] = false;
        // >>
    }
    if (item + lenC >= len ||
        fieldCol[item + lenC].style.backgroundColor === "black") {
        dir[2] = false;
        // V
    }  
    if (item % lenC === 0 ||
        fieldCol[item - 1].style.backgroundColor === "black")  {
        dir[3] = false;
        // <<
    } 
    console.log('dir works')
    return dir;
}

let h = (start, goal) => {

    const width = window.innerWidth ;
    let lengthRow = Math.floor(width / 30);

    let startPositionX = Math.floor(start / lengthRow);
    let startPositionY = start % lengthRow;
    let goalPositionX = Math.floor(goal / lengthRow);
    let goalPositionY = goal % lengthRow;

    
    let distance = Math.abs(goalPositionX - startPositionX) + 
                   Math.abs(goalPositionY - startPositionY);
    
    return distance;    
}

//FIX neighborFind to not take nodes which were already visited
// Idea, if node is RED(visited) or GREEN(start) , skip it

let neighborFind = item => {
    let lenC = Math.floor(fieldCol.length / fieldRow.length);
    result = [];
    if (item - lenC >= 0) {
        if (fieldCol[item - lenC].style.backgroundColor !== "black" &&
            fieldCol[item - lenC].style.backgroundColor !== "red") {
                result.push(item - lenC);
                // ^
        } 
    }
    if (item % lenC !== lenC - 1) {
        if (fieldCol[item + 1].style.backgroundColor !== "black" &&
            fieldCol[item + 1].style.backgroundColor !== "red") {
                result.push(item + 1);
                // >>
        }
    }
    if (item + lenC <= fieldCol.length) {
        if (fieldCol[item + lenC].style.backgroundColor !== "black" &&
            fieldCol[item + lenC].style.backgroundColor !== "red") {
                result.push(item + lenC);
                // V
        }  
    }
    if (item % lenC !== 0) {
        if (fieldCol[item - 1].style.backgroundColor !== "black" &&
            fieldCol[item - 1].style.backgroundColor !== "red")  {
                result.push(item - 1);
                // <<
        } 
    }
    return result;
}

let minFind = ((array,fS) => {
    let min = array[0];
    let minIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (fS[min] > fS[array[i]]) {
            minIndex = i;    
            min = array[i];
        }
    }
    return minIndex;
})

// array.includes(x) for if openSet.includes(neighbor) is not in it, add it to openSet

//FIX neighborFind to not take nodes which were already visited
// Idea, if node is RED(visited) or GREEN(start) , skip it

let aStar = (start, goal) => {
    let tentative_gScore;
    let current;
    const openSet = [];
    openSet[0] = start;
  
    console.log(openSet,  'openSet at the very start');
    console.log(openSet[2],  'openSet at the very start');


    let cameFrom = [];
    let gScore = [];
    gScore[start] = 0;
    let fScore = [];
    fScore[start] = h(start, goal);

    found = 0;
    while (openSet.length > 0 ) {

        index = minFind(openSet, fScore);
        current = openSet[index];
        console.log(current, 'starting index')
        console.log(fScore,  'fscore');
        fieldCol[current].style.backgroundColor = "red";
        if ( current === goal ) {
            return console.log("YEY");
        }
        console.log(openSet,  'openSet before pop');
        openSet.splice(index, 1);
        console.log(openSet,  'openSet after pop');
        neighbor = neighborFind(current);
        tentative_gScore = gScore[current] + 1;
        

        for (let i = 0; i < neighbor.length; i++) {

            let val = neighbor[i];

            if (gScore[val] === undefined ||
                tentative_gScore < gScore[val]) {
                    cameFrom[val] = current;
                    gScore[val] = tentative_gScore;
                    fScore[val] = gScore[val] + h(val, goal);
                }
            
            if (!openSet.includes(val)) {
                found++;
                openSet.push(val);
            }
            
        }
        
    }
    return console.log('There is no path to the target given.');
}




let colorBox = () => {
    let lenRow = fieldRow.length;   
    let lenCol = fieldCol.length / lenRow;

    for (let j = 0; j < fieldCol.length; j++) {
        fieldCol[j].addEventListener('click', () => {
            //fieldCol[j].style.backgroundColor = "red";


                //if (!fieldCol[j + 1].style.backgroundColor) {
                //    fieldCol[j + 1].style.backgroundColor = "red";
                //    fieldCol[j - lenCol].style.backgroundColor = "red";
                //}

                let dir  = dirCheck(j, lenCol, fieldCol.length);

                if (dir[1] === true) {
                    fieldCol[j + 1].style.backgroundColor = "red";
                    j = j + 1;
                } else if (dir[2] === true) {
                    fieldCol[j + lenCol].style.backgroundColor = "red";
                    j = j + lenCol;
                }

                // DIRECTIONS:
                // UP   : j - lenCol
                // DOWN : j + lenCol
                // RIGHT: j + 1  
                // LEFT : j - 1
                
                // BORDER CHECK:
                // UP   : j - lenCol >= 0
                // DOWN : j + lenCol <= fieldCol.length
                // RIGHT: j % lenCol !== lenCol - 1
                // LEFT : j % lenCol !== 0

                //if (j - lenCol >= 0) {
                //    fieldCol[j - lenCol].style.backgroundColor = "red";
                //    j = j - lenCol;
                //} else {
                //    if (j % (fieldCol.length / lenRow ) !== fieldCol.length / lenRow - 1) {
                //        j = j + 1 + fieldCol.length - lenCol;
                //        fieldCol[j].style.backgroundColor = "red";
                //    }
                //} 
            //if (j - lenCol >= 0) {
            //    fieldCol[j - lenCol].style.backgroundColor = "red";
            //    j = j - lenCol;
            //}  
            //if (j + lenCol <= fieldCol.length) {
            //    fieldCol[j + lenCol].style.backgroundColor = "red";
            //} 
            //if (j % lenCol !== 0) {
            //    fieldCol[j - 1].style.backgroundColor = "red";
            //} 
            //if (j % lenCol !== lenCol - 1) {
            //    fieldCol[j + 1].style.backgroundColor = "red";
            //}
        })
    }


    

    //const field = document.querySelectorAll('.field-col');
    //let bool = true;
    //field.forEach(e => {
    //    if (e.style.backgroundColor !== "red" && bool === true) {
    //        e.style.backgroundColor = "red";
    //        bool = false;
    //    }
    //});
}


//let countdown = setInterval(colorBox, 100);

colorBox();
aStar(1, 79);

window.addEventListener('resize', colorBox);

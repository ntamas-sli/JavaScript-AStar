const fieldCol = document.querySelectorAll('.field-col');
const fieldRow = document.querySelectorAll('.field-row');
const startBtn = document.querySelector('.btn-start');
const asd = document.querySelector('#asd');
let color = [];
let colorIndex = [];

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

let minFind = ((array, fS, g) => {
    let min = array[0];
    let minIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (fS[min] > fS[array[i]]) {
            minIndex = i;    
            min = array[i];
        } else if (h(min, g) > h(array[i], g)) {
            minIndex = i;    
            min = array[i];
        }   
    }
    return minIndex;
})

// array.includes(x) for if openSet.includes(neighbor) is not in it, add it to openSet

//FIX neighborFind to not take nodes which were already visited
// Idea, if node is RED(visited) or GREEN(start) , skip it


// aStar probably doesn't work as intended, try debuging. ###################

let aStar = (start, goal) => {
    let tentative_gScore;
    let current;
    const openSet = [];
    openSet[0] = start;

    let cameFrom = [];
    let gScore = [];
    gScore[start] = 0;
    let fScore = [];
    fScore[start] = h(start, goal);

    found = 0;
    let aStarDelay = () => {
        setTimeout(() => {
            index = minFind(openSet, fScore, goal);
            current = openSet[index];
        
            fieldCol[current].style.backgroundColor = "red";
            if ( current === goal ) {
                found = 1;
                return reconstPath(cameFrom, goal, start);
            }
            
            openSet.splice(index, 1);
        
            neighbor = neighborFind(current);
            tentative_gScore = gScore[current] + 1;
            
        
            for (let i = 0; i < neighbor.length; i++) {
        
                let val = neighbor[i];
        
                if (gScore[val] === undefined ||
                    tentative_gScore < gScore[val]) {
                        cameFrom[val] = current;
                        gScore[val] = tentative_gScore;
                        fScore[val] = gScore[val] + h(val, goal);
        
                        fieldCol[val].style.backgroundColor = "green";
                        fieldCol[val].innerHTML = `${fScore[val]},${gScore[val]}`;
                    }
                
                if (!openSet.includes(val)) {
                    openSet.push(val);
                }
            }
            if (openSet.length > 0 && found < 1) {
                aStarDelay();
            }
        }, 100);
    }
    aStarDelay();

    
    //while (openSet.length > 0 && found !== 5) {
    //
//
    //    index = minFind(openSet, fScore, goal);
    //    current = openSet[index];
//
    //    fieldCol[current].style.backgroundColor = "red";
    //    if ( current === goal ) {
    //        return reconstPath(cameFrom, goal, start);
    //    }
    //   
    //    openSet.splice(index, 1);
  //
    //    neighbor = neighborFind(current);
    //    tentative_gScore = gScore[current] + 1;
    //    
//
    //    for (let i = 0; i < neighbor.length; i++) {
//
    //        let val = neighbor[i];
//
    //        if (gScore[val] === undefined ||
    //            tentative_gScore < gScore[val]) {
    //                cameFrom[val] = current;
    //                gScore[val] = tentative_gScore;
    //                fScore[val] = gScore[val] + h(val, goal);
    //
    //                fieldCol[val].style.backgroundColor = "green";
    //                fieldCol[val].innerHTML = `${fScore[val]},${gScore[val]}`;
    //            }
    //        
    //        if (!openSet.includes(val)) {
    //            openSet.push(val);
    //        }
    //        
    //    }
    //    
    //}
    console.log(found);
    if (found === 0) {
        return console.log('There is no path to the target given.');
    }
}

let reconstPath = (array, g, s) => {
    let numb = g;
    
    while (array[numb] !== array[s]) {
        numb = array[numb];

        fieldCol[numb].style.backgroundColor = "purple";
        
    }
}


let colorBox = () => {
    let lenRow = fieldRow.length;   
    let lenCol = fieldCol.length / lenRow;

    for (let j = 0; j < fieldCol.length; j++) {
        fieldCol[j].addEventListener('pressHold', () => {
            //fieldCol[j].style.backgroundColor = "red";
                
               
                //if (!fieldCol[j + 1].style.backgroundColor) {
                //    fieldCol[j + 1].style.backgroundColor = "red";
                //    fieldCol[j - lenCol].style.backgroundColor = "red";
                //}


                fieldCol[j].style.backgroundColor = "black"; 

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
startBtn.addEventListener('click', () => {
    aStar(1, 79);
});

window.addEventListener('resize', colorBox);

(function asd1() {

    var mouseTimer;
    function mouseDown() { 
        mouseUp();
        mouseTimer = window.setTimeout(execMouseDown,100); //set timeout to fire in 2 seconds when the user presses mouse button down
        asd.innerHTML = `CLICKED`;
    }
  
    function mouseUp() { 
        if (mouseTimer) window.clearTimeout(mouseTimer);  //cancel timer when mouse button is released
        div.style.backgroundColor = "#FFFFFF";
        asd.innerHTML = `UP`;
    }
  
    function execMouseDown() { 
        div.style.backgroundColor = "#CFCF00";
        asd.innerHTML = `HOLD`;
        fieldCol.forEach( item => {
            item.addEventListener('mouseover', e => {
                item.style.backgroundColor = "black";
                console.log(e.type);
            });          
        })
        let check = 0;
        fields.addEventListener('mouseup', () => {
            check = 1;
        });
        if (check === 1) {
            return
        }
    }
  
    var div = document.getElementById("asd");
    
    window.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp);  //listen for mouse up event on body, not just the element you originally clicked on
    
  }());


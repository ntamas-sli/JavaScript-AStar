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
    let startPositionX = start % lengthRow;
    let startPositionY = Math.floor(start / lengthRow);
    let goalPositionX = goal % lengthRow;
    let goalPositionY = Math.floor(goal / lengthRow);
    let distance;

    if (startPositionX < goalPositionX) {
        distance = goalPositionX - startPositionX;
    } else {
        distance = startPositionX - goalPositionX;
    }
    if (startPositionY < goalPositionY) {
        distance += goalPositionY - startPositionY - 1;
    } else {
        distance += startPositionY - goalPositionY - 1;
    } 
    
    return distance;    
}

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

let neighborFind = item => {
    let lenC = Math.floor(fieldCol.length / fieldRow.length);
    console.log(lenC)
    result = [];
    if (item - lenC >= 0) {
        if (fieldCol[item - lenC].style.backgroundColor !== "black") {
            result[0] = item - lenC;
            // ^
        } 
    }
    if (item % lenC !== lenC - 1) {
        if (fieldCol[item + 1].style.backgroundColor !== "black") {
            result[1] = item + 1;
            // >>
        }
    }
    if (item + lenC <= fieldCol.length) {
        if (fieldCol[item + lenC].style.backgroundColor !== "black") {
            result[2] = item + lenC;
            // V
        }  
    }
    if (item % lenC !== 0) {
        if (fieldCol[item - 1].style.backgroundColor !== "black")  {
            result[3] = item - 1;
            // <<
        } 
    }

    return result;
}

// array.includes(x) for if openSet.includes(neighbor) is not in it, add it to openSet

let aStar = (start, goal) => {
    let current;
    let openSet = [];
    openSet[0] = start;
    let cameFrom = [];
    let gScore = [];
    gScore[start] = 0;
    let fScore = [];
    fScore[start] = h(start, goal);
    current = Array.min(openSet);
    found = false;
    while (openSet.length > 0 ) {

        current = Array.min(openSet);
        if ( current === goal ) {
            return console.log("YEY");
        }

        console.log(openSet.length);
        console.log(openSet[openSet.length - 1]);
        
        openSet = openSet.splice(openSet.length - 1, current);

        console.log(openSet.length);
        console.log(openSet[openSet.length - 1]);

        neighbor = neighborFind(current);
        console.log(neighbor);

        console.log(neighbor.length, 'nei');
        for (let i = 0; i < neighbor.length; i++) {
            console.log(i);
            console.log('yey');
        }
        found = true;
    }
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
aStar(0, 12);

window.addEventListener('resize', colorBox);

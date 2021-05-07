let fieldCol = document.querySelectorAll('.field-col');
let fieldRow = document.querySelectorAll('.field-row');
let rangethingy = document.getElementById('size-setting');
let speedSetting = document.getElementById('speed-setting');
launch = false;

let h = (start, goal) => {
    const width = window.innerWidth ;
    let lengthRow = Math.floor(width / boxSize);

    let startPositionX = Math.floor(start / lengthRow);
    let startPositionY = start % lengthRow;
    let goalPositionX = Math.floor(goal / lengthRow);
    let goalPositionY = goal % lengthRow;

    
    let distance = Math.abs(goalPositionX - startPositionX) + 
                   Math.abs(goalPositionY - startPositionY);
    
    return distance;    
}

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
    if (item + lenC < fieldCol.length) {
    
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
        } 
        else if (fS[min] === fS[array[i]]) { 
            if (h(min, g) > h(array[i], g)) {
                minIndex = i;    
                min = array[i];
            }
        }   
    }
    return minIndex;
})

let aStar = (start, goal) => {
    let tentative_gScore;
    let current;
    const openSet = [];
    openSet[0] = start;

    let speed = parseInt(speedSetting.value);
    speed = 500 / speed;

    let cameFrom = [];
    let gScore = [];
    gScore[start] = 0;
    let fScore = [];
    fScore[start] = h(start, goal);

    found = 0;
    let aStarDelay = () => {
        setTimeout(() => {

            if (stopCheck === true) {
                return;
            }
            
            index = minFind(openSet, fScore, goal);
            current = openSet[index];
        
            fieldCol[current].style.backgroundColor = "red";
            if ( current === goal ) {
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

                    }
                
                if (!openSet.includes(val)) {
                    openSet.push(val);
                }
            }
            if (openSet.length > 0 ) {
                aStarDelay();
            } else {
                resetBtn.style.display = 'inline-block';
            }
        }, speed);
    }
    aStarDelay();

}

let reconstPath = (array, g, s) => {
    let numb = g;
    fieldCol[numb].style.backgroundColor = "purple";
    while (array[numb] !== array[s]) {
        numb = array[numb];
        fieldCol[numb].style.backgroundColor = "purple";       
    }
    resetBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
}

window.addEventListener('resize', colorBox);
window.addEventListener('resize', () => {   
    fieldCol = document.querySelectorAll('.field-col');
    fieldRow = document.querySelectorAll('.field-row');
});


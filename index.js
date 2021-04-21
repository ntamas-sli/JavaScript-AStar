const title = document.querySelector('.title');
const fields = document.querySelector('.fields');

let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

let matrixGen = () => {
    const width = window.innerWidth ;
    let numberOfBoxes = Math.floor(width / 30);
    let string = ``;
    for (let i = 0; i < 5; i++) {
        string += `<div class="field-row">`;
        for (let j = 0; j < numberOfBoxes; j++) {
            string += `<div class="field-col">${i},${j}</div>`;
        }
        string += `</div>`;
    }
    
    fields.innerHTML = string;
    const field = document.querySelectorAll('.field-col');
    
    field.forEach((e, index) => {
        let rand = getRndInteger(4,5);
        e.style.width ="28px";
        e.style.height ="28px";
        if ( index % rand === 0 ) {
            e.style.backgroundColor = "black";
        }
    });
    field[field.length - 1].style.backgroundColor = "green";
    field[0].style.backgroundColor = "red";

    //const fieldRow = document.querySelectorAll('.field-row');
    //const fieldCol = fieldRow[2].querySelectorAll('.field-col');
    //let number = Math.floor(numberOfBoxes / 2);
    //fieldCol[number].style.backgroundColor = "red";
    colorBox();
}

let dirCheck = (item, lenC, len) => {
    const fieldCol = document.querySelectorAll('.field-col');
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
    return dir;
}

let colorBox = () => {
    const fieldRow = document.querySelectorAll('.field-row');
    let lenRow = fieldRow.length;   
    const fieldCol = document.querySelectorAll('.field-col');
    let lenCol = fieldCol.length / lenRow;

    let dir  = dirCheck(2, lenCol, fieldCol.length);
    console.log(dir);

    for (let j = 0; j < fieldCol.length; j++) {
        fieldCol[j].addEventListener('click', () => {
            //fieldCol[j].style.backgroundColor = "red";
            console.log(lenCol);
            let countdown = setInterval(() => {

                //if (!fieldCol[j + 1].style.backgroundColor) {
                //    fieldCol[j + 1].style.backgroundColor = "red";
                //    fieldCol[j - lenCol].style.backgroundColor = "red";
                //}

                let dir  = dirCheck(j, lenCol, fieldCol.length);
                console.log(dir);
                
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
            }, 100);
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

matrixGen();

//let countdown = setInterval(colorBox, 100);



window.addEventListener('resize', matrixGen);



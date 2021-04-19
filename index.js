const title = document.querySelector('.title');
const fields = document.querySelector('.fields');

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
    //const fieldRow = document.getElementsByClassName('field-row');
    //for (let i = 0; i < fieldRow.length; i++) {
    //    let fieldCol = fieldRow[i].getElementsByClassName('field-col');
    //    console.log(fieldCol);
    //}
    const field = document.querySelectorAll('.field-col');

    field.forEach(e => {
        e.style.width ="28px";
        e.style.height ="28px";
    });

    const fieldRow = document.querySelectorAll('.field-row');
    const fieldCol = fieldRow[2].querySelectorAll('.field-col');
    let number = Math.floor(numberOfBoxes / 2);
    fieldCol[number].style.backgroundColor = "red";
 
}

let colorBox = () => {
    const fieldRow = document.querySelectorAll('.field-row');
    let len1 = fieldRow.length;   
    const fieldCol = document.querySelectorAll('.field-col');
    let len2 = fieldCol.length / len1;
    console.log(fieldCol.length / len1);
  
    for (let j = 0; j < fieldCol.length; j++) {
        fieldCol[j].addEventListener('click', () => {
            console.log(j);
            if (j - len2 >= 0) {
                fieldCol[j - len2].style.backgroundColor = "red";
            }
            if (j + len2 <= fieldCol.length) {
                fieldCol[j + len2].style.backgroundColor = "red";
            }
            if (j % (fieldCol.length / len1) !== 0) {
                fieldCol[j - 1].style.backgroundColor = "red";
            }
            if (j % (fieldCol.length / len1 ) !== fieldCol.length / len1 - 1) {
                fieldCol[j + 1].style.backgroundColor = "red";
            }
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
colorBox();
//let countdown = setInterval(colorBox, 100);



window.addEventListener('resize', matrixGen);



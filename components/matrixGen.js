const fields = document.querySelector('.fields');   
const rect = fields.getBoundingClientRect();
let boxSize = 40;
let launch = true;

let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

let matrixGen = () => {
    let width = window.innerWidth;
    if (launch === false) {
        boxSize = parseInt(rangethingy.value);
        console.log(boxSize);
    }
    console.log(boxSize);
    let numberOfBoxes = Math.floor(width / boxSize);
    let string = ``;
    let k = 0;
    for (let i = 0; i < numberOfBoxes / 2 - 1; i++) {
        string += `<div class="field-row">`;
        for (let j = 0; j < numberOfBoxes; j++) {
            string += `<div class="field-col" ></div>`;
            k++;
        }
        string += `</div>`;
    }
    
    fields.innerHTML = string;
    const field = document.querySelectorAll('.field-col');
    const fieldRow = document.querySelector('.field-row');
    fieldRow.style.height = `${boxSize}px`;
    
    field.forEach( e => {
        e.style.width =`${boxSize - 2}px`;
        e.style.height =`${boxSize - 2}px`;
        e.style.backgroundColor = "white";
    });
    field[field.length - 1].style.backgroundColor = "green";
    field[1].style.backgroundColor = "red";
    colorBox();
}

let colorBox = () => {

    const fields = document.querySelectorAll('.field-col');
    arrayFields = [];
    let check = 0;

    fields.forEach( item => {

        let execMouseDown = () => {
            let val = item.style.backgroundColor;
            if (val === "white" || val === "black") {
                if (val === 'white') {
                    item.style.backgroundColor = 'black';
                } else {
                    item.style.backgroundColor = 'white';
                }
            }
        }

        
    
        item.addEventListener('mousedown', execMouseDown);
        

    });
};

matrixGen();

window.addEventListener('resize', matrixGen);
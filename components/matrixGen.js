const fields = document.querySelector('.fields');   
const rect = fields.getBoundingClientRect();
let boxSize = 40;
let launch = true;

let matrixGen = () => {
    let width = window.innerWidth;
    if (launch === false) {
        boxSize = parseInt(sizeValue.value);
    }

    let numberOfCols = Math.floor(width / boxSize);
    let numberOfRows = Math.floor(numberOfCols / 2);
    let string = ``;

    for (let i = 0; i < numberOfRows; i++) {
        string += `<div class="field-row">`;
        for (let j = 0; j < numberOfCols; j++) {

            if (i === 0 && j === 0 || 
                i === numberOfRows - 1  && j === numberOfCols - 1) {
                string += `<div class="field-col" id="${i*numberOfCols + j}" >
                                <i class="fas fa-chevron-right fill" draggable="true"></i>
                            </div>`;
            } else {
                string += `<div class="field-col empty" id="${i*numberOfCols + j}"></div>`;
            }
  
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
    field[field.length - 1].style.backgroundColor = "purple";
    field[0].style.backgroundColor = "green";
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
const fields = document.querySelector('.fields');   


let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

let matrixGen = () => {
    const width = window.innerWidth ;
    let numberOfBoxes = Math.floor(width / 30);
    let string = ``;
    let k = 0;
    for (let i = 0; i < 5; i++) {
        string += `<div class="field-row">`;
        for (let j = 0; j < numberOfBoxes; j++) {
            string += `<div class="field-col" ></div>`;
            k++;
        }
        string += `</div>`;
    }
    
    fields.innerHTML = string;
    const field = document.querySelectorAll('.field-col');
    
    field.forEach( e => {
        e.style.width ="28px";
        e.style.height ="28px";
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
            if (val !== 'red' && val !== 'green') {
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
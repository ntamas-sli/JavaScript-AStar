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
        } else {
            e.style.backgroundColor = "white";
        }
    });
    field[field.length - 1].style.backgroundColor = "green";
    field[0].style.backgroundColor = "red";
}

matrixGen();

window.addEventListener('resize', matrixGen);
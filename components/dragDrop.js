let moveables = document.querySelectorAll('.fas');
let allFields = document.querySelectorAll('.field-col');

let dragStart = () => {
    setTimeout(() => (this.className = 'invisible'), 0);
}

let dragEnd = () => {
    
}

let dragDrop = () => {
    
}

moveables.forEach( item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

allFields.forEach(item => {
    item.addEventListener('dropend', e =>{
        e.preventDefault();
        console.log("drop on to:::", item.id);
    });
});


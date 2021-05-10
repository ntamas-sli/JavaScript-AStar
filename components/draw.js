let onHoldDraw = e => {
    e.preventDefault();
    let pageWidth = window.innerWidth;

    let pageX = Math.floor(window.event.pageX / boxSize);
    let pageY = Math.floor(window.event.pageY / boxSize);
 
    let rowLength = Math.floor(pageWidth / boxSize);
    let current = pageX + pageY * rowLength; 

    if (fieldCol[current].style.backgroundColor === "white") {
        fieldCol[current].style.backgroundColor = "black";
    } 
};
let activate = () => {  
    fieldCol.forEach( item => {
        item.addEventListener("mouseover", onHoldDraw);
    });
};
let deactivate = () => {
    fieldCol.forEach( item => {
        item.removeEventListener("mouseover", onHoldDraw);
    })
} 

document.addEventListener("mousedown", activate);
document.addEventListener("mouseup", deactivate);
let prevPosX = 0.0;
let prevPosY = 0.0;

let onHoldDraw = e => {
    e.preventDefault();
    let pageWidth = window.innerWidth;

    let pageX = Math.floor(window.event.pageX / boxSize);
    let pageY = Math.floor(window.event.pageY / boxSize);

    // CHANGES START 
    //let pageX = window.event.pageX / boxSize;
    //let pageY = window.event.pageY / boxSize;
//
    //let deltaX = pageX - prevPosX;
    //let deltaY = pageY - prevPosY;
    //let deltaErr = Math.abs(deltaY / deltaX);
    //let err = 0;
//
    //let rowLength = Math.floor(pageWidth / boxSize);
    //
    //pageY = Math.floor(pageY);
//
    //for (let i = Math.floor(prevPosX); i < Math.floor(pageX); i++) {
    //    currentErr = err;   
    //    console.log(err);     
    //    let currentNode = i + (pageY + currentErr) * rowLength; 
    //
    //    
    //    if (fieldCol[currentNode].style.backgroundColor === "white") {
    //        fieldCol[currentNode].style.backgroundColor = "black";
    //    }
    //    err = err + deltaErr;
    //}
    // // CHANGES END 
 

    let rowLength = Math.floor(pageWidth / boxSize);
    let current = pageX + pageY * rowLength; 

    if (fieldCol[current].style.backgroundColor === "white" ||
        fieldCol[current].style.backgroundColor === "black") {

            if (fieldCol[current].style.backgroundColor === "white") {
                fieldCol[current].style.backgroundColor = "black";
            } 
            //else {
                //fieldCol[current].style.backgroundColor = "white";
            //}
        }
    // AND THIS TOO, V
    //prevPosX = pageX;
    //prevPosY = pageY;
};
let activate = e => {  
    e.preventDefault();
    //prevPosX = window.event.pageX / boxSize;
    //prevPosY = window.event.pageY / boxSize;
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
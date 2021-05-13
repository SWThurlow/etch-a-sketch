 /*Retrieve HTMl elements.*/
 const container = document.querySelector('.gridContainer');
 const gridSize = document.getElementById('gridSize');
 const greyScale = document.getElementById('greyScale');
 const rainbow = document.getElementById('rainbow');
 const colourPicker = document.getElementById('picker');
 const clearGrid = document.getElementById('clearGrid');
 const eraser = document.getElementById('eraser');

 /*Colours object.*/
const colours = {
    picker: colourPicker.value,
    rainbow: false,
    grey: false,
    eraser: false,
}

/*Populating container with grid cells.*/
function makeGrid(){
    [...container.childNodes].forEach(child => container.removeChild(child));
    container.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`
    for(let i = 1; i <= gridSize.value**2; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'gridCell');
        div.addEventListener('mouseover', colour)
        container.appendChild(div);
    }
}

/*To colour in grid cells when the mouse is over them.*/
function colour(e) {
    e.target.style.backgroundColor = colours.picker;
}



/*All the event listeners.*/

//Setting up grid on page load.
window.addEventListener('load', makeGrid);
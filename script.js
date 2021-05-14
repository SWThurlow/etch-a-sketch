 /*Retrieve HTMl elements.*/
 const container = document.querySelector('.gridContainer');
 const gridSize = document.getElementById('gridSize');
 const colourPicker = document.getElementById('picker');
 const sizeLabel = document.querySelector('section p');
 const userInputs = document.querySelector('section');

 /*Colours object.*/
const colours = {
    picker: colourPicker.value,
    rainbow: false,
    grey: false,
    eraser: false,
}

/*Populating container with grid cells.*/
function makeGrid() {
    [...container.childNodes].forEach(child => container.removeChild(child));
    container.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`
    for(let i = 1; i <= gridSize.value**2; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'gridCell');
        div.setAttribute('data-grey', '1');
        container.appendChild(div);
    }

    //If being called due to grid resizing.
    sizeLabel.textContent = `${gridSize.value} x ${gridSize.value}`
    
}

/*To colour in grid cells when the mouse is over them.*/
function colour(e) {
    if(!colours.rainbow && !colours.grey && !colours.eraser){
        e.target.style.backgroundColor = colours.picker;
    } else if (colours.rainbow && !colours.grey && !colours.eraser) {
        console.log(typeof(e.target.style))
        rainbowColour(e.target.style)
    } else if (!colours.rainbow && colours.grey && !colours.eraser) {
        fiftyShades(e.target)
    } else if (!colours.rainbow && !colours.grey && colours.eraser) {
        rubbingOut(e.target)
    }
}

/*Rainbow colouring.*/
let hue = 0; //Global variable so that it can change consistently across events.
function rainbowColour(style) {
    style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue += 5;
    if(hue > 360) {
        hue = 0;
    } 
}

/*Colouring with grey scale.*/
function fiftyShades(target) {
    let shade = target.dataset.grey;
    if(shade >= 10){
        target.style.backgroundColor = `rgba(0, 0, 0, ${shade})`;
    } else {
        target.style.backgroundColor = `rgba(0, 0, 0, 0.${shade})`;
        shade = Number(shade);
        shade++;
        target.dataset.grey = `${shade}`;
    }
}

/*Eraser*/
function rubbingOut(target) {
    target.style.backgroundColor = `#fff`;
    target.dataset.grey = `1`;
}

/*For picking a colour*/
function setColour(target, colourValue) {
    switch (target){
        case 'picker':
            colours.picker = colourValue
            colours.rainbow = false
            colours.grey = false
            colours.eraser = false
            break;
        case 'rainbow':
            colours.rainbow = true
            colours.grey = false
            colours.eraser = false
            break;
        case 'greyScale':
            colours.rainbow = false
            colours.grey = true
            colours.eraser = false
            break;
        case 'eraser':
            colours.rainbow = false
            colours.grey = false
            colours.eraser = true
            break;
    } 
}

/*Function for click triggered events*/
function click(e) {
    if(e.target.dataset.click === 'colour'){
        setColour(e.target.id, null);
    } else if(e.target.dataset.click === 'clear-grid'){
        makeGrid();
    }
}

/*All the event listeners.*/

//Setting up grid on page load.
window.addEventListener('load', makeGrid);

//Colour and eraser choice.
userInputs.addEventListener('click', click)
picker.addEventListener('input', (e) => {setColour(e.target.id, e.target.value)});

//Resizing the grid.
gridSize.addEventListener('input', makeGrid);

//Colouring in the grid cells.
container.addEventListener('mouseover', colour);
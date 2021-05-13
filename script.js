 /*Retrieve HTMl elements*/
 const container = document.querySelector('.etchCanvas');
 const gridSize = document.getElementById('gridSize');
 const greyScale = document.getElementById('greyScale');
 const rainbow = document.getElementById('rainbow');
 const colourPicker = document.getElementById('picker');
 const clearGrid = document.getElementById('clearGrid');
 const eraser = document.getElementById('eraser')

 /*Colours object*/
const colours = {
    picker: colourPicker.nodeValue,
    rainbow: false,
    grey: false,
    eraser: false,
}


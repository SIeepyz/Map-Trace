const image = document.getElementById('map');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sampleData = {}
var x = 0;
var y = 0;

var tempString


function overwriteFile() {
  var text = document.getElementById("input").value;
  var lines = text.split("\n");
  var filteredLines = [];

  for (var i = 0; i < lines.length; i += 8) {
    filteredLines.push(lines[i+4]);
    filteredLines.push(lines[i+7]);
  }

  var outputText = filteredLines.join("\n");
  console.log(outputText)
  tempString = outputText
  document.getElementById("input").value = outputText;
}

function convertToDict() {
  var text = tempString;
  var lines = text.split("\n");
  var outputDict = {};

  for (var i = 0; i < lines.length; i += 2) {
    var key = i / 2;
    var value = [lines[i] ? lines[i].trim() : '', lines[i+1] ? lines[i+1].trim() : ''];
    outputDict[key] = value;
  }

  return outputDict;
}




// wait for the image to load before setting the canvas dimensions
image.onload = function() {
    //Just setting up the drawing area
    canvas.width = image.width; 
    canvas.height = image.height;
    const canvHeight = canvas.height
    const canvWidth = canvas.width    

    ctx.drawImage(image, 0, 0); //Sets the map background to the canvas
    ctx.transform(-1, 0, 0, 1, canvas.width, 0);


}

function submitHandler() {
        var inputValue = document.getElementById("input").value; // Assigns contents of text box to inputValue
        overwriteFile();
        var dictionary = convertToDict();
        document.getElementById("output").textContent = "Please refresh the page to clear map, if it failed make sure you copied it properly otherwise contact galaga for assistance";
        document.getElementById("input").value = ""; // Clear input
        drawPath(dictionary,100) // Runs the path trace
}

function drawPath(pathData) {
    ctx.beginPath(); //Initializes the path
    ctx.strokeStyle = "#FF0000"; // Color green go brrrr
    ctx.lineWidth = 4
    var length = Object.keys(pathData).length;
    var colorIncrement = Math.round(255 / length)
    var color
    console.log(colorIncrement)
    var keys = Object.keys(pathData).reverse(); // Reverses the dictionary to make the path make sense chronologically as its drawn
    for (const i in keys) {

        const key = keys[i];
        if (i == 1)
            continue; // If its the initilization key then skip it

        setTimeout(() => { //Just for visual effect so its possible for the user to watch the path generate
            ctx.lineTo((((pathData[key][1] / 12) + 400)), (pathData[key][0] / 11) + 250); //Updates the pen's current locations
            var r = 0
            var g = Math.floor(0 + (i *colorIncrement));
            var b = 0
            var hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            ctx.strokeStyle = hexColor
            ctx.stroke(); // Draws the line
            ctx.beginPath(); // start a new path for the next line
            ctx.moveTo((((pathData[key][1] / 12) + 400)), (pathData[key][0] / 11) + 250); // move to the start of the next line
        }, i * 20); // Ends the wait
    }
}

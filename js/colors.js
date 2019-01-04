// The original KA colors, border, feet, then body
var originalPalette = [
    [3, 1, 3],
    [252, 194, 228],
    [252, 110, 204]
]

// Several new palettes for Kirby, chosen by me
var presetPalettes = [
    ["0D", "35", "25"], // Pink
    ["0D", "25", "15"], // Red
    ["0D", "27", "17"], // Orange
    ["0D", "38", "28"], // Yellow
    ["0D", "39", "29"], // Light Green
    ["0D", "29", "19"], // Green
    ["0D", "31", "21"], // Light Blue
    ["0D", "21", "11"], // Blue
    ["0D", "24", "14"], // Purple
    ["0D", "20", "10"]  // Grayscale
]

// Places to replace Kirby's palette
var colorLocations = [0x32FEC, 0x43AC9, 0x43AF7, 0x43CE1, 0x47E4A, 0x6D5EB, 0x6D5EF, 0x711E4, 0x711EB, 0x76759, 0x76783, 0x7679B, 0x767B3, 0x767CB, 0x767E3, 0x767FB, 0x76813, 0x7682B, 0x7684F, 0x7687B, 0x77A61, 0x78A0D, 0x78A1D, 0x78A2D, 0x78A35, 0x79552, 0x79562, 0x7ADA6, 0x7ADB6, 0x7ADD2, 0x2CED0, 0x2D2F6, 0x43B79, 0x43CE9, 0x5C980, 0x5C98C, 0x69D29, 0x69D49, 0x69D69, 0x69D71, 0x69D89, 0x69DA9, 0x69DC9, 0x69DE9, 0x69E09, 0x6D5F7, 0x6DBAF, 0x6DF56, 0x711F3, 0x79542, 0x7954A, 0x7855A, 0x7ADCA, 0x43ACD]

// Map of NES palette values to 24-bit hex color
var nesMap = {
    "00": "7C7C7C",
    "01": "0000FC",
    "02": "0000BC",
    "03": "4428BC",
    "04": "940084",
    "05": "A80020",
    "06": "A81000",
    "07": "881400",
    "08": "503000",
    "09": "007800",
    "0A": "006800",
    "0B": "005800",
    "0C": "004058",
    "0D": "000000",
    "10": "BCBCBC",
    "11": "0078F8",
    "12": "0058F8",
    "13": "6844FC",
    "14": "D800CC",
    "15": "E40058",
    "16": "F83800",
    "17": "E45C10",
    "18": "AC7C00",
    "19": "00B800",
    "1A": "00A800",
    "1B": "00A844",
    "1C": "008888",
    "1D": "000000",
    "20": "F8F8F8",
    "21": "3CBCFC",
    "22": "6888FC",
    "23": "9878F8",
    "24": "F878F8",
    "25": "F85898",
    "26": "F87858",
    "27": "FCA044",
    "28": "F8B800",
    "29": "B8F818",
    "2A": "58D854",
    "2B": "58F898",
    "2C": "00E8D8",
    "2D": "787878",
    "30": "FCFCFC",
    "31": "A4E4FC",
    "32": "B8B8F8",
    "33": "D8B8F8",
    "34": "F8B8F8",
    "35": "F8A4C0",
    "36": "F0D0B0",
    "37": "FCE0A8",
    "38": "F8D878",
    "3D": "F8D8F8",
    "39": "D8F878",
    "3A": "B8F8B8",
    "3B": "B8F8D8",
    "3C": "00FCFC",
    "3D": "F7D8F8"
}

var nesColors = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D"]

var brightText = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "11", "12", "13", "18", "19", "1A", "1B", "1C", "1D", "2D"]

// There is probably a better way to pass the NES value to be written into the ROM, but I couldn't think of it
var nesVals = ["0F", "35", "25"]

function populateTable() {
    var t = document.getElementById("paletteTable")
    // Table shall be 4 rows, 14 columns
    for (var row = 0; row < 4; row++) {
        var tableRow = document.createElement("tr")
        for (var col = 0; col < 14; col++) {
            var cell = document.createElement("input")
            cell.type = "button"
            cell.id = nesColors[14 * row + col]
            cell.style = "width: 20px"
            cell.style = "background-color: #" + nesMap[nesColors[14 * row + col]]
            cell.addEventListener("click", function(d) {
                var thisButton = document.getElementById("palette").getElementsByTagName("button")[t.value]
                thisButton.style.backgroundColor = d.target.style.backgroundColor
                if (brightText.includes(d.target.id)) {
                    thisButton.style.color = "#fff"
                } else {
                    thisButton.style.color = "#000"
                }
                changeColor(t.value, nesMap[d.target.id])
                nesVals[t.value] = d.target.id
                t.classList.add("hidden")
            })
            tableRow.appendChild(cell)
        }
        t.appendChild(tableRow)
    }
}

function viewTable(index) {
    var t = document.getElementById("paletteTable")

    if (t.classList.contains("hidden")) {
        t.classList.remove("hidden")
    } else if (t.value == index) {
        t.classList.add("hidden")
    }
    t.value = index
}

// Rewrite ROM with new palette
function replaceColor() {
    // Yeah, these are out of order, but I didn't want to redo all of the for loops just for this
    var newColor0 = parseInt(nesVals[1], 16)
    var newColor1 = parseInt(nesVals[2], 16)
    var newColor2 = parseInt(nesVals[0], 16)

    for (var i = 0; i < colorLocations.length; i++) {
        var colorAddress = colorLocations[i]
        rom[colorAddress] = newColor0
        rom[colorAddress + 1] = newColor1
        rom[colorAddress + 2] = newColor2
    }
}

// Draws Kirby on canvas
function drawKirby() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
    imageData = ctx.getImageData(0, 0, img.width, img.height)
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    originalPixelArray = Uint8ClampedArray.from(imageData.data)
}

function hex2rgb(hex) {
    var r = parseInt(hex.slice(0, 2), 16)
    var g = parseInt(hex.slice(2, 4), 16)
    var b = parseInt(hex.slice(4, 6), 16)

    return [r, g, b]
}

// Draw recolored Kirby on canvas
// Iterate through pixels of Kirby image, recolor if a match
function changeColor(oldIndex, color) {
    var newColor = hex2rgb(color)

    // Pixel array is four parts: R, G, B, A
    var length = originalPixelArray.length / 4;
    var newPixelArray = Uint8ClampedArray.from(imageData.data)
    for (var i = 0; i < length; i++) {
        var index = 4 * i;

        var r = originalPixelArray[index];
        var g = originalPixelArray[index + 1];
        var b = originalPixelArray[index + 2];

        if (r == originalPalette[oldIndex][0] && g == originalPalette[oldIndex][1] && b == originalPalette[oldIndex][2]) {
            newPixelArray[index] = newColor[0];
            newPixelArray[index + 1] = newColor[1];
            newPixelArray[index + 2] = newColor[2];
        }
    }
    imageData.data.set(newPixelArray)
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

function setPreset() {
    var presetIdx = Number(document.getElementById("presets").value)

    var nodes = document.getElementById("palette").getElementsByTagName("button")
    for (var i = 0; i < nodes.length; i++) {
        nesVals[i] = presetPalettes[presetIdx][i]
        nodes[i].style.backgroundColor = "#" + nesMap[presetPalettes[presetIdx][i]]
        if (brightText.includes(presetPalettes[presetIdx][i])) {
            nodes[i].style.color = "#fff"
        } else {
            nodes[i].style.color = "#000"
        }
        changeColor(i, nesMap[presetPalettes[presetIdx][i]])
    }
}

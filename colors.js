// The original KA colors, border, feet, then body
var originalPalette = [
    [3, 1, 3],
    [252, 194, 228],
    [252, 110, 204]
]

// Several new palettes for Kirby, chosen by me
newPalettes = [0x201000,0x31210F,0x21110F,0x24140F,0x25150F,0x27170F,0x38280F,0x39290F,0x29190F]

// Places to replace Kirby's palette
colorLocations = [0x32FEC,0x43AC9,0x43AF7,0x43CE1,0x47E4A,0x6D5EB,0x6D5EF,0x711E4,0x711EB,0x76759,0x76783,0x7679B,0x767B3,0x767CB,0x767E3,0x767FB,0x76813,0x7682B,0x7684F,0x7687B,0x77A61,0x78A0D,0x78A1D,0x78A2D,0x78A35,0x79552,0x79562,0x7ADA6,0x7ADB6,0x7ADD2,0x2CED0,0x2D2F6,0x43B79,0x43CE9,0x5C980,0x5C98C,0x69D29,0x69D49,0x69D69,0x69D71,0x69D89,0x69DA9,0x69DC9,0x69DE9,0x69E09,0x6D5F7,0x6DBAF,0x6DF56,0x711F3,0x79542,0x7954A,0x7855A,0x7ADCA,0x43ACD]

var nesColors = [
    ["00", "7C7C7C"],
    ["01", "0000FC"],
    ["02", "0000BC"],
    ["03", "4428BC"],
    ["04", "940084"],
    ["05", "A80020"],
    ["06", "A81000"],
    ["07", "881400"],
    ["08", "503000"],
    ["09", "007800"],
    ["0A", "006800"],
    ["0B", "005800"],
    ["0C", "004058"],
    ["0D", "000000"],
    ["10", "BCBCBC"],
    ["11", "0078F8"],
    ["12", "0058F8"],
    ["13", "6844FC"],
    ["14", "D800CC"],
    ["15", "E40058"],
    ["16", "F83800"],
    ["17", "E45C10"],
    ["18", "AC7C00"],
    ["19", "00B800"],
    ["1A", "00A800"],
    ["1B", "00A844"],
    ["1C", "008888"],
    ["1D", "000000"],
    ["20", "F8F8F8"],
    ["21", "3CBCFC"],
    ["22", "6888FC"],
    ["23", "9878F8"],
    ["24", "F878F8"],
    ["25", "F85898"],
    ["26", "F87858"],
    ["27", "FCA044"],
    ["28", "F8B800"],
    ["29", "B8F818"],
    ["2A", "58D854"],
    ["2B", "58F898"],
    ["2C", "00E8D8"],
    ["2D", "787878"],
    ["30", "FCFCFC"],
    ["31", "A4E4FC"],
    ["32", "B8B8F8"],
    ["33", "D8B8F8"],
    ["34", "F8B8F8"],
    ["35", "F8A4C0"],
    ["36", "F0D0B0"],
    ["37", "FCE0A8"],
    ["38", "F8D878"],
    ["39", "D8F878"],
    ["3A", "B8F8B8"],
    ["3B", "B8F8D8"],
    ["3C", "00FCFC"],
    ["3D", "F8D8F8"]
]

function populateDropdowns() {
    var bodyList = document.getElementById("bodyColor")
    var footList = document.getElementById("footColor")
    var borderList = document.getElementById("borderColor")

    for (var i = 0; i < nesColors.length; i++) {
        var opt = document.createElement("option")
        opt.value = i
        // opt.innerHTML = nesColors[i][0]
        opt.style = "background: #" + nesColors[i][1]
        var opt2 = opt.cloneNode(true)
        var opt3 = opt.cloneNode(true)
        bodyList.appendChild(opt)
        footList.appendChild(opt2)
        borderList.appendChild(opt3)
    }
}

// Rewrite ROM with new palette
function replaceColor() {
    // var newColor =

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
function changeColor(oldIndex, node) {
    // Change color of select element
    var selectedColor = node.options[node.selectedIndex].style.backgroundColor
    node.style.backgroundColor = selectedColor

    var color = nesColors[node.selectedIndex][1]
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

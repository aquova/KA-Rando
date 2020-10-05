// Constants
const TABLE_COLS = 14
const TABLE_ROWS = 4

// Kirby's original palette, RGB
var original_palette = [
    [252, 194, 228],    // Feet
    [252, 110, 204],    // Body
    [3,   1,   3],      // Border
]

// Several new palettes for Kirby, chosen by me
const preset_palettes = [
    ["35", "25", "0D"], // Pink
    ["25", "15", "0D"], // Red
    ["27", "17", "0D"], // Orange
    ["38", "28", "0D"], // Yellow
    ["39", "29", "0D"], // Light Green
    ["29", "19", "0D"], // Green
    ["31", "21", "0D"], // Light Blue
    ["21", "11", "0D"], // Blue
    ["24", "14", "0D"], // Purple
    ["20", "10", "0D"], // Grayscale
]

// Places to replace Kirby's palette
const color_locations = [
    0x32FEC, 0x43AC9, 0x43AF7, 0x43CE1, 0x47E4A, 0x6D5EB, 0x6D5EF, 0x711E4, 0x711EB, 0x76759,
    0x76783, 0x7679B, 0x767B3, 0x767CB, 0x767E3, 0x767FB, 0x76813, 0x7682B, 0x7684F, 0x7687B,
    0x77A61, 0x78A0D, 0x78A1D, 0x78A2D, 0x78A35, 0x79552, 0x79562, 0x7ADA6, 0x7ADB6, 0x7ADD2,
    0x2CED0, 0x2D2F6, 0x43B79, 0x43CE9, 0x5C980, 0x5C98C, 0x69D29, 0x69D49, 0x69D69, 0x69D71,
    0x69D89, 0x69DA9, 0x69DC9, 0x69DE9, 0x69E09, 0x6D5F7, 0x6DBAF, 0x6DF56, 0x711F3, 0x79542,
    0x7954A, 0x7855A, 0x7ADCA, 0x43ACD
]

// Map of NES palette values to 24-bit hex color
const nes_map = {
    "00": "7C7C7C", "01": "0000FC", "02": "0000BC", "03": "4428BC", "04": "940084", "05": "A80020", "06": "A81000",
    "07": "881400", "08": "503000", "09": "007800", "0A": "006800", "0B": "005800", "0C": "004058", "0D": "000000",
    "10": "BCBCBC", "11": "0078F8", "12": "0058F8", "13": "6844FC", "14": "D800CC", "15": "E40058", "16": "F83800",
    "17": "E45C10", "18": "AC7C00", "19": "00B800", "1A": "00A800", "1B": "00A844", "1C": "008888", "1D": "000000",
    "20": "F8F8F8", "21": "3CBCFC", "22": "6888FC", "23": "9878F8", "24": "F878F8", "25": "F85898", "26": "F87858",
    "27": "FCA044", "28": "F8B800", "29": "B8F818", "2A": "58D854", "2B": "58F898", "2C": "00E8D8", "2D": "787878",
    "30": "FCFCFC", "31": "A4E4FC", "32": "B8B8F8", "33": "D8B8F8", "34": "F8B8F8", "35": "F8A4C0", "36": "F0D0B0",
    "37": "FCE0A8", "38": "F8D878", "39": "D8F878", "3A": "B8F8B8", "3B": "B8F8D8", "3C": "00FCFC", "3D": "F7D8F8"
}

// Keys for the nes_map dictionary
// JS doesn't have a method for getting ordered keys of a hashmap
const nes_colors = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D",
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D",
    "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D"
]

// List of NES indices which should have white foreground text
const bright_text = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "11", "12", "13", "18", "19", "1A", "1B", "1C", "1D", "2D"
]

// Currently selected NES palette color indices
var nes_vals = ["35", "25", "0F"]

function populate_table() {
    var t = document.getElementById("paletteTable")
    // Table shall be 4 rows, 14 columns
    for (var row = 0; row < TABLE_ROWS; row++) {
        var tableRow = document.createElement("tr")
        for (var col = 0; col < TABLE_COLS; col++) {
            var cell = document.createElement("input")
            cell.type = "button"
            // ID of each button shall be its NES index
            cell.id = nes_colors[TABLE_COLS * row + col]
            cell.style = "background-color: #" + nes_map[nes_colors[TABLE_COLS * row + col]]
            // On click, recolor parent button to match selection
            cell.addEventListener("click", function(d) {
                var thisButton = document.getElementById("palette").getElementsByTagName("button")[t.value]
                thisButton.style.backgroundColor = d.target.style.backgroundColor
                if (bright_text.includes(d.target.id)) {
                    thisButton.style.color = "#fff"
                } else {
                    thisButton.style.color = "#000"
                }
                change_color(t.value, nes_map[d.target.id])
                nes_vals[t.value] = d.target.id
                t.classList.add("hidden")
            })
            tableRow.appendChild(cell)
        }
        t.appendChild(tableRow)
    }
}

// Toggles table visibility
function view_table(index) {
    var t = document.getElementById("paletteTable")

    if (t.classList.contains("hidden")) {
        t.classList.remove("hidden")
    } else if (t.value == index) {
        t.classList.add("hidden")
    }
    t.value = index
}

// Rewrite ROM with new palette
function replace_color() {
    const new_body = parseInt(nes_vals[0], 16)
    const new_feet = parseInt(nes_vals[1], 16)
    const new_border = parseInt(nes_vals[2], 16)

    for (var i = 0; i < color_locations.length; i++) {
        var colorAddress = color_locations[i]
        // Palette data is encoded as Body-Feet-Border indices
        rom[colorAddress] = new_body
        rom[colorAddress + 1] = new_feet
        rom[colorAddress + 2] = new_border
    }
}

// Draws Kirby on canvas
function draw_kirby() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
    imageData = ctx.getImageData(0, 0, img.width, img.height)
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    originalPixelArray = Uint8ClampedArray.from(imageData.data)
}

// Utility function to convert 24-bit color (as string) to RGB list
function hex2rgb(hex) {
    var r = parseInt(hex.slice(0, 2), 16)
    var g = parseInt(hex.slice(2, 4), 16)
    var b = parseInt(hex.slice(4, 6), 16)

    return [r, g, b]
}

// Draw recolored Kirby on canvas
// Iterate through pixels of Kirby image, recolor if a match
function change_color(oldIndex, color) {
    var newColor = hex2rgb(color)

    // Pixel array is four parts: R, G, B, A
    var length = originalPixelArray.length / 4;
    var newPixelArray = Uint8ClampedArray.from(imageData.data)
    for (var i = 0; i < length; i++) {
        var index = 4 * i;

        var r = originalPixelArray[index];
        var g = originalPixelArray[index + 1];
        var b = originalPixelArray[index + 2];

        if (r == original_palette[oldIndex][0] && g == original_palette[oldIndex][1] && b == original_palette[oldIndex][2]) {
            newPixelArray[index] = newColor[0];
            newPixelArray[index + 1] = newColor[1];
            newPixelArray[index + 2] = newColor[2];
        }
    }
    imageData.data.set(newPixelArray)
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

// Recolor parent buttons if palette preset is chosen
function set_preset() {
    var preset_idx = Number(document.getElementById("presets").value)

    var nodes = document.getElementById("palette").getElementsByTagName("button")
    for (var i = 0; i < nodes.length; i++) {
        nes_vals[i] = preset_palettes[preset_idx][i]
        nodes[i].style.backgroundColor = "#" + nes_map[preset_palettes[preset_idx][i]]
        if (bright_text.includes(preset_palettes[preset_idx][i])) {
            nodes[i].style.color = "#fff"
        } else {
            nodes[i].style.color = "#000"
        }
        change_color(i, nes_map[preset_palettes[preset_idx][i]])
    }
}

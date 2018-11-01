var originalPalette = [
    [],
    [],
    []
]
// Several new palettes for Kirby, chosen by me
newPalettes = [0x201000,0x31210F,0x21110F,0x24140F,0x25150F,0x27170F,0x38280F,0x39290F,0x29190F]

// Places to replace Kirby's palette
colorLocations = [0x32FEC,0x43AC9,0x43AF7,0x43CE1,0x47E4A,0x6D5EB,0x6D5EF,0x711E4,0x711EB,0x76759,0x76783,0x7679B,0x767B3,0x767CB,0x767E3,0x767FB,0x76813,0x7682B,0x7684F,0x7687B,0x77A61,0x78A0D,0x78A1D,0x78A2D,0x78A35,0x79552,0x79562,0x7ADA6,0x7ADB6,0x7ADD2,0x2CED0,0x2D2F6,0x43B79,0x43CE9,0x5C980,0x5C98C,0x69D29,0x69D49,0x69D69,0x69D71,0x69D89,0x69DA9,0x69DC9,0x69DE9,0x69E09,0x6D5F7,0x6DBAF,0x6DF56,0x711F3,0x79542,0x7954A,0x7855A,0x7ADCA,0x43ACD]

// nesColors =
// #7C7C7C
// #0000FC
// #0000BC
// #4428BC
// #940084
// #A80020
// #A81000
// #881400
// #503000
// #007800
// #006800
// #005800
// #004058
// #000000
// #000000
// #000000
// #BCBCBC
// #0078F8
// #0058F8
// #6844FC
// #D800CC
// #E40058
// #F83800
// #E45C10
// #AC7C00
// #00B800
// #00A800
// #00A844
// #008888
// #000000
// #000000
// #000000
// #F8F8F8
// #3CBCFC
// #6888FC
// #9878F8
// #F878F8
// #F85898
// #F87858
// #FCA044
// #F8B800
// #B8F818
// #58D854
// #58F898
// #00E8D8
// #787878
// #000000
// #000000
// #FCFCFC
// #A4E4FC
// #B8B8F8
// #D8B8F8
// #F8B8F8
// #F8A4C0
// #F0D0B0
// #FCE0A8
// #F8D878
// #D8F878
// #B8F8B8
// #B8F8D8
// #00FCFC
// #F8D8F8
// #000000
// #000000

function replaceColor() {
    // var newColor =
}

function drawKirby() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
    imageData = ctx.getImageData(0, 0, img.width, img.height)
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    originalPixelArray = Uint8ClampedArray.from(imageData.data)
}

// Iterate through pixels of Kirby image, recolor if a match
function changeColor(oldIndex, newColor) {
    // Pixel array is four parts: R, G, B, A
    var length = originalPixelArray.length / 4;
    var newPixelArray = Uint8ClampedArray.from(imageData.data)
    originalPalette = getPaletteForGame()
    for (var i = 0; i < length; i++) {
        var index = 4 * i;

        var r = originalPixelArray[index];
        var g = originalPixelArray[index + 1];
        var b = originalPixelArray[index + 2];

        if (r == originalPalette[oldIndex][0] && g == originalPalette[oldIndex][1] && b == originalPalette[oldIndex][2]) {
            newPixelArray[index] = newColor.rgb[0];
            newPixelArray[index + 1] = newColor.rgb[1];
            newPixelArray[index + 2] = newColor.rgb[2];
        }
    }
    imageData.data.set(newPixelArray)
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

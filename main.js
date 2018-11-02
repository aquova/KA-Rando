var version = "4.0.0"

function readFile(evt) {
    var f = evt.target.files[0]
    if (!f) {
        alert("Failed to read file")
    } else {
        var fr = new FileReader()
        fr.onload = function(e) {
            name = f.name.split('.')[0]
            // TODO: append seed here
            name += "_new.nes"
            var arrayBuffer = fr.result
            rom = new Uint8Array(arrayBuffer)
        }
        fr.readAsArrayBuffer(f)
        randoButton.disabled = false
        randoButton.classList.remove("disabled")
    }
}

function writeFile(evt) {
    var a = document.createElement("a")
    a.download = name
    var blob = new Blob([rom], {
        type: "text/plain"
    })
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

// -----------------
// Utility Functions
// -----------------
// Apparently JS doesn't support seeds, so need to make my own random function
// From here: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        swap(array, i, j)
    }
}

function swap(array, a, b) {
    var tmp = array[a]
    array[a] = array[b]
    array[b] = tmp
}

function range(min, max) {
    var array = []
    for (var i = min; i < max; i++) {
        array.push(i)
    }
    return array
}

function randomize(evt) {
    var seed = document.getElementById("seed").innerHTML
    if (seed == "") {
        seed = Math.random()
    }

    if (enemyCheckButton.checked) {
        if (starRodButton.checked) {
            abilityValues.push(0x18)
        }

        if (noAbilityButton.checked) {
            abilityLocations.concat(neutralLocations)
        }

        replaceEnemies()
    }

    if (document.getElementById("doorCheck").checked) {
        shuffleDoors()
    }

    writeFile(evt)
}

var rom;

var canvas = document.getElementById("kirbyCanvas")
ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

var img = new Image()
img.crossOrigin = "Anonymous"
// img.src = "https://austinbricker.com/KA-Rando/img/kirby_KA.png"
// This is temporary
img.src = "https://raw.githubusercontent.com/aquova/KA-Rando/website/img/kirby_KA.png"

img.onload = function() {
    drawKirby()
}

var randoButton = document.getElementById("rando-button")
randoButton.addEventListener("click", randomize)
randoButton.disabled = true
randoButton.classList.add("disabled")
populateDropdowns()

var enemyCheckButton = document.getElementById("enemyCheck")
var starRodButton = document.getElementById("starRodCheck")
var noAbilityButton = document.getElementById("noAbilityCheck")

enemyCheckButton.addEventListener("change", function() {
    if (this.checked) {
        starRodButton.disabled = false
        document.getElementById("starRodLabel").classList.remove("disabled")
        noAbilityButton.disabled = false
        document.getElementById("noAbilityLabel").classList.remove("disabled")
    } else {
        starRodButton.disabled = true
        document.getElementById("starRodLabel").classList.add("disabled")
        noAbilityButton.disabled = true
        document.getElementById("noAbilityLabel").classList.add("disabled")
    }
})

document.getElementById("fileinput").addEventListener('change', readFile, false)

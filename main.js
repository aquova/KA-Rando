var version = "3.1.0"

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

// Apparently JS doesn't support seeds, so need to make my own random function
// From here: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randomize(evt) {
    var seed = document.getElementById("seed").innerHTML
    if (seed == "") {
        seed = Math.random()
    }

    if (document.getElementById("enemyCheck").checked) {
        if (document.getElementById("starRodCheck").checked) {
            abilityValues.push(0x18)
        }

        if (document.getElementById("noAbilityCheck").checked) {
            abilityLocations.concat(neutralLocations)
        }
    }

    replaceEnemies()

    if (document.getElementById("doorCheck").checked) {
        shuffleDoors()
    }

    writeFile(evt)
}

var rom;
var randoButton = document.getElementById("rando-button")
randoButton.addEventListener("click", randomize)
randoButton.disabled = true

document.getElementById("fileinput").addEventListener('change', readFile, false)

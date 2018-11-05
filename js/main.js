var version = "4.0.0"

function readFile(evt) {
    var f = evt.target.files[0]
    if (!f) {
        alert("Failed to read file")
    } else {
        var fr = new FileReader()
        fr.onload = function(e) {
            name = f.name.split('.')[0]
            var arrayBuffer = fr.result
            rom = new Uint8Array(arrayBuffer)
        }
        // Check for correct checksum - d41d8cd98f00b204e9800998ecf8427e
        var hash = CryptoJS.MD5(rom)
        if (hash != "d41d8cd98f00b204e9800998ecf8427e") {
            alert("Invalid checksum - Please use a valid US Kirby's Adventure ROM")
            return
        }
        fr.readAsArrayBuffer(f)
        randoButton.disabled = false
        randoButton.classList.remove("disabled")
    }
}

function writeFile(evt) {
    var a = document.createElement("a")
    var seedInput = document.getElementById("seed").value
    if (seedInput == "") {
        a.download = name + "_" + seed + ".nes"
    } else {
        a.download = name + "_" + seedInput + ".nes"
    }

    var blob = new Blob([rom], {
        type: "text/plain"
    })
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function randomize(evt) {
    var seedInput = document.getElementById("seed").value
    if (seedInput == "") {
        seed = Math.random()
    } else {
        seed = parseInt(CryptoJS.MD5(seedInput).toString(), 16) % 1e+10
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

    // TODO: Create check, don't call this if color unchanged
    replaceColor()
    writeFile(evt)
}

var rom
var seed

var canvas = document.getElementById("kirbyCanvas")
ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

var img = new Image()
img.crossOrigin = "Anonymous"
img.src = "./img/kirby_KA.png"

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

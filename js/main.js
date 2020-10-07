const VERSION = "4.0.2"

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
            // Check for correct checksum - 1c47d0a7689f94e5d5f21eabdf0072da
            var romString = rom.toString()
            var hash = CryptoJS.MD5(romString)
            if (hash != "1c47d0a7689f94e5d5f21eabdf0072da") {
                alert("Invalid checksum - Please use a valid US Kirby's Adventure ROM")
                return
            }
        }
        fr.readAsArrayBuffer(f)
        randoButton.disabled = false
        randoButton.classList.remove("disabled")
    }
}

function writeFile(evt) {
    var a = document.createElement("a")
    a.download = name + "_" + seedInput + ".nes"

    var blob = new Blob([rom], {
        type: "text/plain"
    })
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function randomize(evt) {
    seedInput = document.getElementById("seed").value
    if (seedInput == "") {
        seedInput = Math.random().toString().split(".")[1]
    }
    seed = parseInt(CryptoJS.MD5(seedInput).toString(), 16) % 1e+10

    if (enemyCheckButton.checked) {
        if (starRodButton.checked) {
            ability_values.push(0x18)
        }

        if (noAbilityButton.checked) {
            ability_locations.concat(neutral_locations)
        }

        replace_enemies()
    }

    if (document.getElementById("roomCheck").checked) {
        shuffle_rooms()
    }

    if (document.getElementById("doorCheck").checked) {
        shuffle_doors()
    }

    replace_color()
    writeFile(evt)
}

var rom
var seed
var seedInput

var canvas = document.getElementById("kirbyCanvas")
ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

var img = new Image()
img.crossOrigin = "Anonymous"
img.src = "./img/kirby_KA.png"

img.onload = function() {
    draw_kirby()
    populate_table()
}

var randoButton = document.getElementById("rando-button")
randoButton.addEventListener("click", randomize)
randoButton.disabled = true
randoButton.classList.add("disabled")

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

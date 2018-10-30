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

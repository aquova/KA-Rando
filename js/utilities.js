// Utility Functions

// Apparently JS doesn't support seeds, so need to make my own random function
// Adapted from here: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function random() {
    // Returns between 0 and 1
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
}

function randomChoice(array) {
    return array[Math.floor(random() * array.length)]
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(random() * (i + 1))
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

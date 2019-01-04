// Locations of the entrance and exit of the same levels
// MUST have the same number of elements as door_values
var doorLocations = [[0x2524B, 0x254B7], // 1-1
                    // ["2525A", "254DF"], 1-2 - Contains Warp Star
                    [0x2525F, 0x25502], // 1-3
                    [0x25264, 0x25516], // 1-4
                    [0x25381, 0x25534], // 6-1
                    [0x25386, 0x2556B], // 6-2
                    // ["25390", "255E3"], 6-3 - Contains Warp Star
                    [0x2539F, 0x2562E], // 6-4
                    [0x253A4, 0x25651], // 6-5
                    [0x253B3, 0x25697], // 6-6
                    [0x253C7, 0x256B5], // 7-1
                    // ["253CC", "2575F"], 7-2 - Contains Warp Star
                    [0x253D6, 0x25773], // 7-3
                    [0x253DB, 0x25791], // 7-4
                    [0x253E0, 0x257E6], // 7-5
                    [0x253EA, 0x257C3], // 7-6
                    [0x2527D, 0x25827], // 2-1
                    // ["25282", "25840"], 2-2 - Contains Warp Star
                    [0x2528C, 0x25863], // 2-3
                    [0x25287, 0x25890], // 2-4
                    [0x252A0, 0x258C2], // 2-5
                    [0x252C8, 0x258DB], // 3-1
                    [0x252DC, 0x25921], // 3-2
                    [0x252C3, 0x2593F], // 3-3
                    // ["252D7", "25994"], 3-4 - Contains Warp Star
                    [0x252D2, 0x259AD], // 3-5
                    [0x252CD, 0x259E4], // 3-6
                    [0x252FA, 0x25A02], // 4-1
                    [0x252FF, 0x25A2A], // 4-2
                    // ["2530E", "25A57"], 4-3 - Contains Warp Star
                    [0x25313, 0x25A7A], // 4-4
                    [0x2531D, 0x25AAC], // 4-5
                    [0x25322, 0x25AD4], // 4-6
                    [0x2533B, 0x25AF7], // 5-1
                    [0x25340, 0x25B2E], // 5-2
                    [0x25345, 0x25B74], // 5-3
                    [0x2534F, 0x25BA1], // 5-4
                    // ["2535E", "25BC4"], 5-5 - Contains Warp Star
                    [0x25368, 0x25BF1]] // 5-6

// First array is the entrance of the level door, the second is the end of level door
// The three bytes are the 3rd, 4th, and 5th bytes of the 5-byte door data
var doorValues = [[[0x2B, 0x00, 0x24], [0x00, 0x12, 0x66]], // 1-1
                 // [["2F", "00", "24"], ["00", "12", "F8"]], 1-2
                 [[0x35, 0x00, 0x34], [0x00, 0x13, 0x42]], // 1-3
                 [[0x39, 0x01, 0x21], [0x00, 0x13, 0x85]], // 1-4
                 [[0x3D, 0x03, 0x56], [0x05, 0x13, 0x88]], // 6-1
                 [[0x43, 0x00, 0x23], [0x05, 0x13, 0xC2]], // 6-2
                 // [["4A", "00", "23"], ["05", "14", "35"]], 6-3
                 [[0x56, 0x00, 0x2A], [0x05, 0x14, 0xA3]], // 6-4
                 [[0x5C, 0x00, 0x23], [0x05, 0x15, 0x41]], // 6-5
                 [[0x61, 0x00, 0x39], [0x05, 0x12, 0xAB]], // 6-6
                 [[0x6D, 0x00, 0x36], [0x06, 0x12, 0x52]], // 7-1
                 // [["71", "00", "29"], ["06", "12", "A4"]], 7-2
                 [[0x90, 0x00, 0x34], [0x06, 0x13, 0x06]], // 7-3
                 [[0x94, 0x00, 0x34], [0x06, 0x13, 0x53]], // 7-4
                 [[0xA3, 0x00, 0x55], [0x06, 0x13, 0xA1]], // 7-5
                 [[0x9A, 0x00, 0x24], [0x06, 0x11, 0xDA]], // 7-6
                 [[0xA9, 0x00, 0x34], [0x01, 0x13, 0x74]], // 2-1
                 // [["AD", "00", "37"], ["01", "11", "0B"]], 2-2
                 [[0xB2, 0x00, 0x22], [0x01, 0x14, 0x17]], // 2-3
                 [[0xB8, 0x00, 0x26], [0x01, 0x11, 0x16]], // 2-4
                 [[0xBF, 0x00, 0x25], [0x01, 0x14, 0xF3]], // 2-5
                 [[0xC6, 0x00, 0x24], [0x02, 0x13, 0x77]], // 3-1
                 [[0xCC, 0x01, 0x25], [0x02, 0x13, 0x80]], // 3-2
                 [[0xD3, 0x02, 0x61], [0x02, 0x12, 0x77]], // 3-3
                 // [["D8", "00", "45"], ["02", "12", "81"]], 3-4
                 [[0xDE, 0x00, 0x25], [0x02, 0x11, 0x85]], // 3-5
                 [[0xE3, 0x00, 0x25], [0x02, 0x11, 0x80]], // 3-6
                 [[0xEC, 0x00, 0x33], [0x03, 0x13, 0x75]], // 4-1
                 [[0xF2, 0x00, 0x29], [0x03, 0x13, 0xA0]], // 4-2
                 // [["F8", "00", "24"], ["03", "11", "47"]], 4-3
                 [[0xFF, 0x00, 0x23], [0x03, 0x14, 0x76]], // 4-4
                 [[0x04, 0x80, 0x24], [0x03, 0x15, 0x23]], // 4-5
                 [[0x0B, 0x80, 0x38], [0x03, 0x12, 0x66]], // 4-6
                 [[0x11, 0x80, 0x34], [0x04, 0x10, 0x38]], // 5-1
                 [[0x16, 0x80, 0x22], [0x04, 0x10, 0x95]], // 5-2
                 [[0x1D, 0x84, 0x36], [0x04, 0x10, 0xAA]], // 5-3
                 [[0x23, 0x80, 0x57], [0x04, 0x14, 0x30]], // 5-4
                 // [["2A", "85", "13"], ["04", "15", "14"]], 5-5
                 [[0x31, 0x80, 0x49], [0x04, 0x15, 0x85]]] // 5-6

// === FULL RANDOMIZED ===
var deadEndAddresses = [
    // Into,  Exit
    [0x254A8, 0x254B2], // 1-1 UFO Room
    [0x2584A, 0x2584F], // 2-3 UFO Room
    [0x2587C, 0x25881], // 2-4 Hidden Room, maybe wrong
    [0x258A4, 0x258A9], // 2-5 Hidden Room, also maybe wrong
]

var deadEndData = [
    [[0x2E, 0x00, 0x89], [0x2C, 0x03, 0xC8]],
    [[0xB7, 0x00, 0x39], [0xB5, 0x00, 0x23]]
]
// =======================

function shuffleDoors() {
    var num_array = range(0, doorLocations.length)
    shuffle(num_array)
    for (var i = 0; i < num_array.length; i++) {
        j = num_array[i]
        var entry_address = doorLocations[i][0]
        var exit_address = doorLocations[j][1]

        rom[entry_address + 2] = doorValues[j][0][0]
        rom[entry_address + 3] = doorValues[j][0][1]
        rom[entry_address + 4] = doorValues[j][0][2]

        rom[exit_address + 2] = doorValues[i][1][0]
        rom[exit_address + 3] = doorValues[i][1][1]
        rom[exit_address + 4] = doorValues[i][1][2]
    }
}

function fullRando() {
    var num_array = range(0, deadEndData)
    shufle(num_array)
    for (var i = 0; i < num_array.length; i++) {
        j = num_array[i]
        var entry_address = deadEndAddresses[i][0]
        var exit_address = deadEndAddresses[j][1]

        rom[entry_address + 2] = deadEndData[j][0][0]
        rom[entry_address + 3] = deadEndData[j][0][1]
        rom[entry_address + 4] = deadEndData[j][0][2]

        rom[exit_address + 2] = deadEndData[i][1][0]
        rom[exit_address + 3] = deadEndData[i][1][1]
        rom[exit_address + 4] = deadEndData[i][1][2]
    }
}

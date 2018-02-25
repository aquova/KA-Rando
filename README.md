# KA-Rando

Kirby's Adventure Randomizer

An ability randomizer for Kirby's Adventure for NES.

https://github.com/Aquova/KA-Rando

Written by Austin Bricker, 2017-2018

## -- Overview --

Programs to randomize the level order, enemy abilities, and Kirby's color in Kirby's Adventure. There are three programs contained within this repository which are to be used with a US version of Kirby's Adventure for NES. As of Version 3.0.3, only the original release of the game (PRG0) is supported.

First is a .lua script intended to be used with FCEUX or similar lua-compatible emulator. The lua script edits the RAM in real time, ensuring a completely random ability each time an enemy is swallowed.

Secondly, there are two programs that edit the ROM, allowing it to be distributed and used with any emulator.
However, while the abilites are randomized, they are always constant within that ROM.
Ex. If a fire enemy now gives you the spark ability, ALL fire enemies will always give you the spark ability.

## -- Usage --

In addition to the files included in the repository, you will also need a US copy of the Kirby's Adventure ROM (which is left to the user to obtain). Follow the instructions in the subcategories below for your operating system/preference.

#### --- Windows ---

Run `KA-Randomize-PC.exe`, found on the 'Releases' page. Select the options you desire, and select the location of your .nes Kirby's Adventure file. Finish by clicking the 'Randomize' button. The randomized ROM will be saved into the same folder as the original, with the seed appended onto the end of the file name.

#### --- macOS ---

Run `KA-Randomize-Mac.app`, found on the 'Releases' page. Select the options you desire, and select the location of your .nes Kirby's Adventure file. Finish by clicking the 'Randomize' button. The randomized ROM will be saved into the same folder as the original, with the seed appended onto the end of the file name.

#### --- Linux/Python ---

Linux users, or users who want to simply run the Python program itself, have two options.

1. If you have Python3, Qt5, and PyQt installed, you can run the following command in Terminal:

`python3 KA-Randomize.py`

This will open the same application as the PC and Mac binaries.

2. If you just have Python 3, there is a Command Line version of the program, which can be run via:

`python3 KA-Rando-Simple.py`

Make sure that your .nes file is located in the same folder as the program, then simply follow the instructions. Note that the command line version is missing some of the features of the GUI version, such as the ability to choose a specific color for Kirby.

#### --- .lua Compatible Emulator ---

If your emulator supports Lua scripts (such as FCEUX or Bizhawk), you are welcome to instead use the `Randomize-Script.lua` script. This script edits the RAM in real time, allowing for complete randomization of Kirby's abilities, meaning that eating enemies of the same type may give different results. However, this script does not change Kirby's color or the level order, but it can be used with a ROM that has been randomized.

## -- Known Issues --

- Dying with Star Rod disables select button until level completion
- All six levels with in-level Warp Stars are not randomized, due to game-breaking bugs occurring.
- Museum enemies are not randomized

## -- Version History --

v3.0.3 - 2/25/18 - Changed icon to not match KNDL-Randomizer, removed support for PRG1

v3.0.2 - 1/23/18 - Removed the last two stages with Warp Stars from randomization to avoid potential bugs

v3.0.1 - 1/22/18 - Removed stage 7-2 from randomization list due to Warp Star bugs

v3.0.0 - 12/31/17 - Added support for randomizing the level order, full randomization of Kirby's color, and checksum verification

v2.0.1 - 11/20/17 - Added option to only change Kirby's color, but don't randomize anything

v2.0.0 - 11/16/17 - Added GUI interface. Can now select specific Kirby color in addition to randomizing the color. Switched from Python 2 to Python 3

v1.0.3 - 9/2/17 - Removed need to import data from txt files. Entire program now contained in .py

v1.0.2 - 6/8/17 - Added option to randomize Kirby's color palette

v1.0.1 - 5/25/17 - Fixed issues with OS dependancy. The Python program now works on all OS's, and added an exe program for Windows users.

v1.0.0 - 5/24/17 - Completed the Python program. Enemy abilites are now randomized, supports options for omitting the Star Rod ability or randomizing non-ability enemies.

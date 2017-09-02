# KA-Rando

Kirby's Adventure Randomizer

An ability randomizer for Kirby's Adventure for NES.

https://github.com/Aquova/KA-Rando

Written by Austin Bricker (Aquova), 2017

https://twitter.com/Aquova_


## -- Overview --

Programs to randomize the abilities that Kirby will gain from eating enemies in Kirby's Adventure. There are two programs contained within this repository.

First is a .lua script intended to be used with FCEUX or similar lua-compatible emulator and a US ROM of Kirby's Adventure for NES.
The lua script edits the RAM in real time, ensuring a completely random ability each time an enemy is swallowed. Completed.

Secondly, there is a program that edits the ROM, allowing it to be distributed and used with any emulator.
However, while the abilites are randomized, they are always constant within that ROM.
Ex. If a fire enemy now gives you the spark ability, ALL fire enemies will always give you the spark ability.

## -- Usage --

A copy of the US Kirby's Adventure ROM (which is left to the user to obtain) should be placed into the 'KA-Rando' folder. The programs require the ROM to be located in their same directory.

#### --- Windows ---

Run the .exe program, and follow the on screen instructions

#### --- Mac/Linux/Python ---

Users with Python 2.7+ installed should run the following commands in Terminal:

`cd /PATH/TO/FILE/KA-Rando`

`python KA_Randomize.py`

#### --- .Lua Compatible Emulator ---

If your emulator supports Lua scripts (such as FCEUX or Bizhawk), you are welcome to instead use the 'KirbyAbility.lua' script. This script edits the RAM in real time, allowing for complete randomization of Kirby's abilities, meaning that eating enemies of the same type may give different results. However, this script does not change Kirby's color.


## -- Version History --

v1.03 - 9/2/17 - Removed need to import data from txt files. Entire program now contained in .py

v1.02 - 6/8/17 - Added option to randomize Kirby's color palette

v1.01 - 5/25/17 - Fixed issues with OS dependancy. The Python program now works on all OS's, and added an exe program for Windows users.

v1.00 - 5/24/17 - Completed the Python program. Enemy abilites are now randomized, supports options for omitting the Star Rod ability or randomizing non-ability enemies.

## -- Known Issues/Future Plans --

Dying with Star Rod disables select button until level completion

Museum enemies are not randomized

Add future support for room order

Possible support for complete color randomization, depending on demand.

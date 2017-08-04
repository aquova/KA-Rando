# KA-Rando

Kirby's Adventure Randomizer

An ability randomizer for Kirby's Adventure for NES.

https://github.com/Aquova/Kirbys_Adventure_Randomizer

Written by Austin Bricker (Aquova), 2017

https://twitter.com/Aquova_


-- Overview --

A program that will randomize the abilities that Kirby will gain from eating enemies in Kirby's Adventure.
Ex. When eating a fire enemy, instead of gaining the fire ability, Kirby will gain a random ability.

-- Usage --

There are two programs contained within this repository.

First is a .lua script intended to be used with FCEUX or similar lua-compatible emulator and a US ROM of Kirby's Adventure for NES.
The lua script edits the RAM in real time, ensuring a completely random ability each time an enemy is swallowed. Completed.

Secondly, there is a program that edits the ROM, allowing it to be distributed and used with any emulator.
However, while the abilites are randomized, they are always constant within that ROM.
Ex. If a fire enemy now gives you the spark ability, ALL fire enemies will always give you the spark ability.

Windows users should use the exe, while those with Python 2.7 are welcome to run the Python program.

-- Version History --

v1.02 - 6/8/17 - Added option to randomize Kirby's color palette

v1.01 - 5/25/17 - Fixed issues with OS dependancy. The Python program now works on all OS's, and added an exe program for Windows users.

v1.00 - 5/24/17 - Completed the Python program. Enemy abilites are now randomized, supports options for omitting the Star Rod ability or randomizing non-ability enemies.

-- Known Issues/Future Plans --

Museum enemies are not randomized

Add future support for room order

Possible support for complete color randomization, depending on demand.

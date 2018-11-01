# KA-Rando

Kirby's Adventure Randomizer

Randomize levels, character colors, and enemy abilities for *Kirby's Adventure* on NES.

https://austinbricker.com/KA-Rando

https://github.com/aquova/KA-Rando

Written by Austin Bricker, 2017-2018

## -- Overview --

Programs to randomize the level order, enemy abilities, and Kirby's color in Kirby's Adventure. There are three programs contained within this repository which are to be used with a US version of Kirby's Adventure for NES. As of Version 3.0.3, only the original release of the game (PRG0) is supported.

## -- Features --

- Randomize the levels! You can now randomize the level order, so each level door you go through will take you to an unexpected level!
    - Note, boss doors and a handful of the regular levels (the ones with warp stars) are not randomized as of yet.
- Randomize enemy abilities! Enemies will give you different abilities than the vanilla game when eaten.
- Randomize your color! Kirby's color can now be randomized or chosen between a handful of color palettes I've selected. If you're feeling really crazy, you can also *completely* randomize Kirby's color, which often ends up looking rather hideous.

## -- Usage --

All you need is a US copy of the original version of the Kirby's Adventure ROM (which is left to the user to obtain). Then, visit https://austinbricker.com/KA-Rando, choose the options you desire, select your file, and press 'Randomize'.

## -- Running Locally --

This project runs entirely in the client, so if you need to use the randomizer offline, you can simply download and visit the webpage in a browser. To do so, either click `Clone or download` on the GitHub page and download the zip file, or in a Terminal run `git clone https://github.com/aquova/KA-Rando`. Once downloaded, simply open `index.html` in a browser of your choice!

## -- Known Issues --

- Dying with Star Rod disables select button until level completion
- All six levels with in-level Warp Stars are not randomized, due to game-breaking bugs occurring.
- Museum enemies are not randomized

## -- Version History --

v3.1.0 - 11/1/18 - Ported entire project from Python to JavaScript, from now on the project will use a web-based interface.

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

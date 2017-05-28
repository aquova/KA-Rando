Kirby's Adventure Randomizer v1.01
by Austin Bricker (Aquova), 2017
https://github.com/Aquova

A program to randomize the enemy abilities in Kirby's Adventure for NES

-- Overview --

Contained in this repository are two separate programs that randomize the abilities gained when Kirby swallows enemies in Kirby's Adventure.

Ex. When eating a fire enemy, instead of gaining the fire ability, Kirby will gain a random ability.

-- Usage --

There are two programs contained within this repository.

First is a .lua script intended to be used with FCEUX or similar lua-compatible emulator and a US ROM of Kirby's Adventure for NES. The lua script edits the RAM in real time, ensuring a completely random ability each time an enemy is swallowed.

Secondly, there is a program that edits the ROM, allowing it to be distributed and used with any emulator. However, while the abilities are randomized, they are always constant within that ROM. Windows users should use the exe, while those with Python 2.7 are welcome to run the Python program.
Ex. If a fire enemy now gives you the spark ability, ALL fire enemies will always give you the spark ability.

When the python/exe is run, the user will be asked a number of questions.

- Firstly, to specify the name of the ROM to modify. For the program to run, the ROM must be in the same directory as the program.
- Second, the user will be asked to specify a seed for the random generator. If no seed is given, a random one will be used instead. When the modified ROM is generated, the new file name will be appended with the seed for easy reference.
- Finally, there are two options about the ROM randomization. First is whether or not to allow the Star Rod ability to be used, which while fully playable, has some small bugs (see below). Lastly, whether or not to allow enemies who don't normally give abilities to be randomized as well.

-- Version History --

v1.01 - 5/25/17 - Fixed issues with OS dependancy. The Python program now works on all OS's, and added an exe program for Windows users.

v1.00 - 5/24/17 - Completed the Python program. Enemy abilities are now randomized, supports options for omitting the Star Rod ability or randomizing non-ability enemies.

-- Known Issues/Future Plans --

- Museum enemies are not randomized
- If you die with the Star Rod ability, you will be unable to give up an ability until the level ends
- Add future support for randomizing Kirby color and room order

-- Contact Me --

@Aquova_    : Twitter
Aquova#1296 : Discord

-- Special Thanks --

Romhacking.net and the Data Crystal wiki for their reference materials
Randomizer Central discord for their assistance
Nintendo and HAL Laboratories for originally creating the game
You! For using my software. Thank you!

# Release Notes

## 4.0.2

Fixed issue with the checksum verification.

## 4.0.0

A very big release this time. I'd been getting increasingly frustratated with the GUI setup I had, and decided to bite the bullet and convert to a web interface. I rewrote all the logic and UI in JavaScript, and implemented some of the additions from the sister *Kirby Color Editor* project. In addition to being a web release, all the original functionality is there, as well as a greater ability to make palette swaps.

## 3.0.3

Two small changes to this release

- With the release of my Kirby: Nightmare in Dream Land randomizer, I've decided to use the old icon for that, and a new one from Kirby's Adventure for this one.
- I've decided to limit the randomizer to work only with the original release (PRG0) ROM, and not the first revision (PRG1). This second ROM always had issues with the color palettes, and it's not worth the effort to try and debug two different versions of the game. If you still wish to use this ROM, the older releases still support it, but with their existing bugs.

## 3.0.2

Due to further issues with levels containing Warp Stars, I've removed the final two levels from the randomized list until I can figure out a way to stop the problem

## 3.0.1

A small patch which removes Stage 7-2 from being randomized due to issues with the Warp Star.

## 3.0.0

Another big new release!

- You can now randomize the level order of the game! Entering doors from the level overworlds now lead to completely new random levels. Note that once a level is started, all the rooms are still in the same order as normal.
- You can now also completely randomize Kirby's color! The randomizer will choose random values to use as Kirby's color palette. To be honest, it's really hideous, but it was easy to add, so I figured why not.

Some other smaller things:

- The randomizer now verifies the checksum of the given ROM. If the ROM is not a US Kirby's Adventure initial version or first revision (PRG0 or PRG1) then it will be rejected.
- Currently three levels are not randomized in the level order. They contain in-level Warp Stars which had some game breaking bugs when they were randomized. There are three other levels which do contain Warp Stars, but they seemed to still work as intended. If they prove to also have issues, then they may be removed from the level randomization as well. The boss stages are also no randomized as of yet.
- The CLI version of the program has also been updated to Version 3.0.0, but does not allow to specifically choose Kirby's color.

## 2.0.1

Added new option in the GUI to only change Kirby's color, but don't randomize any behavior.

## 2.0.0

A big new release!

- I've added a GUI interface! Running KA-Randomize now opens a graphical application to select your options.
- In addition to the PC .exe binary, I've also included a .app file for Mac users.
- With the GUI, you can not only randomize Kirby's color, but also have the option of choosing which color you want.
- I've (finally) made the switch from Python 2.7 to Python 3
- For Linux users/those who don't want to use the GUI, a Python 3 version of the original command line interface is also included, in KA-Rando-Simple.py

## 1.0.3

Improved program structure, no longer relies on importing data from external files.

## 1.0.2

Adds option to randomize Kirby's color based on a few preset values.

## 1.0.1

Added Windows support

## 1.0.0

First release of the Kirby's Adventure Randomizer

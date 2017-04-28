# Program that randomizes the enemies that spawn in Kirby's Adventure
# Written by Aquova, 2017
# Still a work in progress

import os, random

VERSION = 1.00

# Gets the absolute path of realPath, so the file can be read
def getAbsPath(realPath):
    currentPath = os.path.abspath(__file__)
    currentPath = os.path.split(currentPath)[0]
    filename = os.path.join(currentPath, realPath)
    return filename

# Reads and stores the hex values from enemy_list.txt
# Contains the hex values of valid enemies
def getEnemyValues():
    enemies = open(getAbsPath("tables/enemy_list.txt"), 'r')
    enemy_values = []
    for line in enemies:
        enemy_values.append(line.split(" ")[0])
    enemies.close()
    return enemy_values

# Reads and stores the hex values from enemy_locations.txt
# Contains the hex addresses of enemies in the ROM
def getEnemyMap():
    locations = open(getAbsPath("tables/enemy_locations.txt"), 'r')
    enemy_rom_locs = []
    for line in locations:
        enemy_rom_locs.append(line.split(" ")[0])
    locations.close()
    return enemy_rom_locs

if __name__ == "__main__":
    # rom = open("/Users/austinbricker/Desktop/KA.nes", 'rb')
    # for i in range(5):
    #     test = rom.next()
    #     print test
    # rom.close()

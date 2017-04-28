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
    rom_name = "/Users/austinbricker/Desktop/KA.nes"
    rom = open(rom_name, 'rb').read()
    for item in getEnemyMap():
        address = int(item, 16)
        rand_ind = random.randint(0,len(getEnemyValues()) - 1)
        new_enemy = getEnemyValues()[rand_ind]
        new_enemy = chr(int(new_enemy,16))
        rom = rom[:address] + new_enemy + rom[(address + 1):]
    new_rom = open(rom_name.split(".")[0] + "_random.nes", 'w')
    new_rom.write(rom)
    new_rom.close()

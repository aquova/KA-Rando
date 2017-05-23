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
def getAbilityValues():
    abilities = open(getAbsPath("tables/ability_list.txt"), 'r')
    ability_values = []
    for line in abilities:
        ability_values.append(line.split(" ")[0])
    abilities.close()
    return ability_values

# Reads and stores the hex values from enemy_locations.txt
# Contains the hex addresses of abilities in the ROM
def getAbilityMap():
    locations = open(getAbsPath("tables/ability_locations.txt"), 'r')
    ability_rom_locs = []
    for line in locations:
        ability_rom_locs.append(line.split(" ")[0])
    locations.close()
    return ability_rom_locs

if __name__ == "__main__":
    print("Thanks for using the Kirby's Adventure Randomizer, version %s" % VERSION)
    rom_name = raw_input("Give the name of the ROM (must be in same folder as this program): ")
    rom_name = getAbsPath(rom_name)
    KA_seed = raw_input("Now give a seed to be used (or leave blank): ")
    random.seed(KA_seed)
    rom = open(rom_name, 'rb').read()
    for item in getAbilityMap():
        address = int(item, 16)
        rand_ind = random.randint(0,len(getAbilityValues()) - 1)
        new_enemy = getAbilityValues()[rand_ind]
        new_enemy = chr(int(new_enemy,16))
        rom = rom[:address] + new_enemy + rom[(address + 1):]
    new_rom = open(rom_name.split(".")[0] + "_" + KA_seed + ".nes", 'w')
    new_rom.write(rom)
    new_rom.close()

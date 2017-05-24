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

def readHexValues(fileName):
    file = open(getAbsPath(fileName), 'r')
    values = []
    for line in file:
        values.append(line.split(" ")[0])
    file.close()
    return values

# # Reads and stores the hex values from enemy_list.txt
# # Contains the hex values of valid enemies
# def getAbilityValues():
#     abilities = open(getAbsPath("tables/ability_list.txt"), 'r')
#     ability_values = []
#     for line in abilities:
#         ability_values.append(line.split(" ")[0])
#     abilities.close()
#     return ability_values
#
# # Reads and stores the hex values from enemy_locations.txt
# # Contains the hex addresses of abilities in the ROM
# def getAbilityLoc():
#     locations = open(getAbsPath("tables/ability_locations.txt"), 'r')
#     ability_rom_locs = []
#     for line in locations:
#         ability_rom_locs.append(line.split(" ")[0])
#     locations.close()
#     return ability_rom_locs

if __name__ == "__main__":
    try:
        print("Thanks for using the Kirby's Adventure Randomizer, version %s" % VERSION)
        rom_name = raw_input("Give the name of the ROM (must be in same folder as this program): ")
        rom_name = getAbsPath(rom_name)

        # If seed is blank, generate a random seed
        # Python will generate one by default, but you can't access it
        KA_seed = raw_input("Now give a seed to be used (or leave blank): ")
        if KA_seed == "":
            KA_seed = random.randint(0, 999999999)
        random.seed(KA_seed)

        ability_values = readHexValues("tables/ability_list.txt")
        ability_locations = readHexValues("tables/ability_enemies_locations.txt")

        star_rod = raw_input("Should the Star Rod be an available ability? (Y/N): ")
        neutral = raw_input("Should enemies without abilities also be randomized? (Y/N): ")
        if star_rod.upper() == 'Y':
            # Add 0x18, the value of Star Rod
            ability_values.append(str(18))

        if neutral.upper() == 'Y':
            # Add in locations of enemies w/o abilities
            neutral_locations = readHexValues("tables/neutral_enemies_locations.txt")
            ability_locations.extend(neutral_locations)

        rom = open(rom_name, 'rb').read()
        for item in ability_locations:
            address = int(item, 16)
            rand_ind = random.randint(0,len(ability_values) - 1)
            new_enemy = ability_values[rand_ind]
            new_enemy = chr(int(new_enemy,16))
            rom = rom[:address] + new_enemy + rom[(address + 1):]
        new_rom = open(rom_name.split(".")[0] + "_" + str(KA_seed) + ".nes", 'w')
        new_rom.write(rom)
        new_rom.close()
    except Exception, e:
        print("ERROR: %s" % e)

# Program that randomizes the abilities of swallowed enemies in Kirby's Adventure
# Written by Aquova, 2017

import os, random

VERSION = 1.02

def readHexValues(fileName):
    file = open(fileName, 'r')
    values = []
    for line in file:
        values.append(line.split(" ")[0])
    file.close()
    return values

if __name__ == "__main__":
    try:
        print("Thanks for using the Kirby's Adventure Randomizer, version %s" % VERSION)
        rom_name = raw_input("Give the name of the ROM (must be in same folder as this program): ")
        rom_name = os.path.join(os.path.dirname(__file__), rom_name)

        # If seed is blank, generate a random seed
        # Python will generate one by default, but you can't access it
        KA_seed = raw_input("Now give a seed to be used (or leave blank): ")
        if KA_seed == "":
            KA_seed = random.randint(0, 999999999)
        random.seed(KA_seed)

        ability_values = readHexValues(os.path.join(os.path.dirname(__file__), 'tables','ability_list.txt'))
        ability_locations = readHexValues(os.path.join(os.path.dirname(__file__), 'tables','ability_enemies_locations.txt'))

        star_rod = raw_input("Should the Star Rod be an available ability? (Y/N): ")
        neutral = raw_input("Should enemies without abilities also be randomized? (Y/N): ")
        color = raw_input("Should Kirby's color be randomized? (Y/N): ")
        if star_rod.upper() == 'Y':
            # Add 0x18, the value of Star Rod
            ability_values.append(str(18))

        if neutral.upper() == 'Y':
            # Add in locations of enemies w/o abilities
            neutral_locations = readHexValues(os.path.join(os.path.dirname(__file__), 'tables','neutral_enemies_locations.txt'))
            ability_locations.extend(neutral_locations)

        rom = open(rom_name, 'rb').read()
        rom_list = list(rom)

        # Gives enemies new abilities based on random selection from file
        for item in ability_locations:
            address = int(item, 16)
            rand_ind = random.randint(0,len(ability_values) - 1)
            new_enemy = ability_values[rand_ind]
            new_enemy = chr(int(new_enemy,16))
            rom_list[address] = new_enemy

        if color.upper() == 'Y':
            # Chooses random new color palette
            # Default for Kirby is 35,25,0F
            new_palette = readHexValues(os.path.join(os.path.dirname(__file__), 'tables','palette_list.txt'))
            palette_ind = random.randint(0, len(new_palette) - 1)
            row = new_palette[palette_ind]
            print(new_palette)
            # row = new_palette[8]
            new_color0 = chr(int(row[0:2],16))
            new_color1 = chr(int(row[2:4],16))
            new_color2 = chr(int(row[4:6],16))

            # Replaces old color palettes with the new
            color_locations = readHexValues(os.path.join(os.path.dirname(__file__), 'tables','palette_locations.txt'))
            for item in color_locations:
                if item[0] != '#':
                    color_address = int(item, 16)
                    rom_list[color_address] = new_color0
                    rom_list[color_address + 1] = new_color1
                    rom_list[color_address + 2] = new_color2

        rom = "".join(rom_list)
        new_rom = open(rom_name.split(".")[0] + "_" + str(KA_seed) + ".nes", 'wb')
        new_rom.write(rom)
        new_rom.close()

    except Exception, e:
        print("ERROR: %s" % e)
        raw_input("Press Enter to close.")

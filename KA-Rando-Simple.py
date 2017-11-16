# Program that randomizes the abilities of swallowed enemies in Kirby's Adventure
# Written by Aquova, 2017
# Usage: python KA_Randomize.py
# http://github.com/Aquova/KA-Rando

import os, random

VERSION = 2.00

# Valid byte values for Kirby's ability
ability_values = ["00","01","02","03","04","05","06","07","08","09","0A","0B","0C",
                "0D","0E","0F","10","11","12","13","14","15","16","17","FF"]

# ROM locations of enemy abilities
ability_locations = ["72BA7","72C1F","72C07","72C7F","72CF7","72D3F","72D6F","72DB7",
                    "72DFF","72E17","73237","73297","73267","72E2F","73117","730FF",
                    "732F0","7324F","730E7","73027","73057","73087","72E8F","7318F",
                    "7330F","727B7","72817","7372F","737D7","731D7"]

# ROM locations of enemies without abilities
neutral_locations = ["72B8F","72C37","72C67","72C4F","72CAF","72CC7","72E5F","72F1F",
                    "72E47","72FF7","72F4F","72DE7","72F7F","72FAF","72FC7","72F37"]

# Several new palettes for Kirby, chosen by me
new_palette = ["201000","31210F","21110F","24140F","25150F","26160F","38280F","39290F","29190F"]

# Places to replace Kirby's palette
# TODO: This can probably be greatly shortened down
color_locations = ["32FEC","43AC9","43AF7","43CE1","47E4A","6D5EB","6D5EF","711E4","711EB","76759",
                    "76783","7679B","767B3","767CB","767E3","767FB","76813","7682B","7684F","7687B",
                    "77A61","78A0D","78A1D","78A2D","78A35","79552","79562","7ADA6","7ADB6","7ADD2",
                    "2CED0","2D2F6","43B79","43CE9","5C980","5C98C","69D29","69D49","69D69","69D71",
                    "69D89","69DA9","69DC9","69DE9","69E09","6D5F7","6DBAF","6DF56","711F3","79542",
                    "7954A","7855A","7ADCA","43ACD"]

if __name__ == "__main__":
    try:
        print("Thanks for using the Kirby's Adventure Randomizer, version " + VERSION)
        rom_name = input("Give the name of the ROM (must be in same folder as this program): ")
        rom_name = os.path.join(os.path.dirname(__file__), rom_name)

        # If seed is blank, generate a random seed
        # Python will generate one by default, but you can't access it
        KA_seed = input("Now give a seed to be used (or leave blank): ")
        if KA_seed == "":
            KA_seed = random.randint(0, 999999999)
        random.seed(KA_seed)

        star_rod = input("Should the Star Rod be an available ability? (Y/N): ")
        neutral = input("Should enemies without abilities also be randomized? (Y/N): ")
        color = input("Should Kirby's color be randomized? (Y/N): ")
        if star_rod.upper() == 'Y':
            # Add 0x18, the value of Star Rod
            ability_values.append("18")

        if neutral.upper() == 'Y':
            # Add in locations of enemies w/o abilities
            ability_locations.extend(neutral_locations)

        rom = open(rom_name, 'rb').read()
        rom_list = list(rom)

        # Gives enemies new abilities based on random selection from file
        for item in ability_locations:
            address = int(item, 16)
            rand_ind = random.randint(0,len(ability_values) - 1)
            new_enemy = ability_values[rand_ind]
            new_enemy = int(new_enemy,16)
            rom_list[address] = new_enemy

        if color.upper() == 'Y':
            # Chooses random new color palette
            # Default for Kirby is 35,25,0F
            palette_ind = random.randint(0, len(new_palette) - 1)
            row = new_palette[palette_ind]

            new_color0 = chr(int(row[0:2],16))
            new_color1 = chr(int(row[2:4],16))
            new_color2 = chr(int(row[4:6],16))

            # Replaces old color palettes with the new
            for item in color_locations:
                color_address = int(item, 16)
                rom_list[color_address] = new_color0
                rom_list[color_address + 1] = new_color1
                rom_list[color_address + 2] = new_color2

        rom = bytes(rom_list)
        new_rom = open('.'.join(self.rom_file.split(".")[:-1]) + "_" + str(KA_seed) + ".nes", 'wb')
        new_rom.write(rom)
        new_rom.close()

    except Exception as e:
        print("ERROR: " + e)
        input("Press Enter to close.")

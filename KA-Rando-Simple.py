# Program that randomizes the abilities of swallowed enemies in Kirby's Adventure
# Written by Aquova, 2017-2018
# Usage: python3 KA_Randomize.py
# http://github.com/Aquova/KA-Rando

import os, random, hashlib

VERSION = "3.0.1 CLI"

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

# Locations of the entrance and exit of the same levels
# MUST have the same number of elements as door_values
door_locations = [["2524B", "254B7"], # 1-1
                  ["2525A", "254DF"], # 1-2 - Contains Warp Star, seems fine.
                  ["2525F", "25502"], # 1-3
                  ["25264", "25516"], # 1-4
                  ["25381", "25534"], # 6-1
                  ["25386", "2556B"], # 6-2
                  ["25390", "255E3"], # 6-3 - Contains Warp Star, seems fine.
                  ["2539F", "2562E"], # 6-4
                  ["253A4", "25651"], # 6-5
                  ["253B3", "25697"], # 6-6
                  ["253C7", "256B5"], # 7-1
                  # ["253CC", "2575F"], # 7-2
                  ["253D6", "25773"], # 7-3
                  ["253DB", "25791"], # 7-4
                  ["253E0", "257E6"], # 7-5
                  ["253EA", "257C3"], # 7-6
                  ["2527D", "25827"], # 2-1
                  # ["25282", "25840"], # 2-2 - Contains Warp Star
                  ["2528C", "25863"], # 2-3
                  ["25287", "25890"], # 2-4
                  ["252A0", "258C2"], # 2-5
                  ["252C8", "258DB"], # 3-1
                  ["252DC", "25921"], # 3-2
                  ["252C3", "2593F"], # 3-3
                  # ["252D7", "25994"], # 3-4 - Contains Warp Star
                  ["252D2", "259AD"], # 3-5
                  ["252CD", "259E4"], # 3-6
                  ["252FA", "25A02"], # 4-1
                  ["252FF", "25A2A"], # 4-2
                  # ["2530E", "25A57"], # 4-3 - Contains Warp Star
                  ["25313", "25A7A"], # 4-4
                  ["2531D", "25AAC"], # 4-5
                  ["25322", "25AD4"], # 4-6
                  ["2533B", "25AF7"], # 5-1
                  ["25340", "25B2E"], # 5-2
                  ["25345", "25B74"], # 5-3
                  ["2534F", "25BA1"], # 5-4
                  ["2535E", "25BC4"], # 5-5
                  ["25368", "25BF1"]] # 5-6

# First array is the entrance of the level door, the second is the end of level door
# The three bytes are the 3rd, 4th, and 5th bytes of the 5-byte door data
door_values = [[["2B", "00", "24"], ["00", "12", "66"]], # 1-1
               [["2F", "00", "24"], ["00", "12", "F8"]], # 1-2
               [["35", "00", "34"], ["00", "13", "42"]], # 1-3
               [["39", "01", "21"], ["00", "13", "85"]], # 1-4
               [["3D", "03", "56"], ["05", "13", "88"]], # 6-1
               [["43", "00", "23"], ["05", "13", "C2"]], # 6-2
               [["4A", "00", "23"], ["05", "14", "35"]], # 6-3
               [["56", "00", "2A"], ["05", "14", "A3"]], # 6-4
               [["5C", "00", "23"], ["05", "15", "41"]], # 6-5
               [["61", "00", "39"], ["05", "12", "AB"]], # 6-6
               [["6D", "00", "36"], ["06", "12", "52"]], # 7-1
               # [["71", "00", "29"], ["06", "12", "A4"]], # 7-2
               [["90", "00", "34"], ["06", "13", "06"]], # 7-3
               [["94", "00", "34"], ["06", "13", "53"]], # 7-4
               [["A3", "00", "55"], ["06", "13", "A1"]], # 7-5
               [["9A", "00", "24"], ["06", "11", "DA"]], # 7-6
               [["A9", "00", "34"], ["01", "13", "74"]], # 2-1
               # [["AD", "00", "37"], ["01", "11", "0B"]], # 2-2
               [["B2", "00", "22"], ["01", "14", "17"]], # 2-3
               [["B8", "00", "26"], ["01", "11", "16"]], # 2-4
               [["BF", "00", "25"], ["01", "14", "F3"]], # 2-5
               [["C6", "00", "24"], ["02", "13", "77"]], # 3-1
               [["CC", "01", "25"], ["02", "13", "80"]], # 3-2
               [["D3", "02", "61"], ["02", "12", "77"]], # 3-3
               # [["D8", "00", "45"], ["02", "12", "81"]], # 3-4
               [["DE", "00", "25"], ["02", "11", "85"]], # 3-5
               [["E3", "00", "25"], ["02", "11", "80"]], # 3-6
               [["EC", "00", "33"], ["03", "13", "75"]], # 4-1
               [["F2", "00", "29"], ["03", "13", "A0"]], # 4-2
               # [["F8", "00", "24"], ["03", "11", "47"]], # 4-3
               [["FF", "00", "23"], ["03", "14", "76"]], # 4-4
               [["04", "80", "24"], ["03", "15", "23"]], # 4-5
               [["0B", "80", "38"], ["03", "12", "66"]], # 4-6
               [["11", "80", "34"], ["04", "10", "38"]], # 5-1
               [["16", "80", "22"], ["04", "10", "95"]], # 5-2
               [["1D", "84", "36"], ["04", "10", "AA"]], # 5-3
               [["23", "80", "57"], ["04", "14", "30"]], # 5-4
               [["2A", "85", "13"], ["04", "15", "14"]], # 5-5
               [["31", "80", "49"], ["04", "15", "85"]]] # 5-6

# Creating a custom exception, how fancy
class HashError(Exception):
    pass

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

        rom = open(rom_name, 'rb').read()
        test_hash = hashlib.md5(rom).hexdigest()
        if (test_hash != "a415cb0e40f8bcdce71e28283a7e6cd7" and test_hash != "69018a5181f255bc3a66badfb19fdb76"):
            raise HashError("Invalid checksum")
        rom_list = list(rom)

        star_rod = input("Should the Star Rod be an available ability? (Y/N): ")
        neutral = input("Should enemies without abilities also be randomized? (Y/N): ")
        color = input("Should Kirby's color be randomized? (Y/N): ")
        doors = input("Should the level order be randomized? (Y/N): ")

        if star_rod.upper() == 'Y':
            # Add 0x18, the value of Star Rod
            ability_values.append("18")

        if neutral.upper() == 'Y':
            # Add in locations of enemies w/o abilities
            ability_locations.extend(neutral_locations)

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

            new_color0 = int(row[0:2],16)
            new_color1 = int(row[2:4],16)
            new_color2 = int(row[4:6],16)

            # Replaces old color palettes with the new
            for item in color_locations:
                color_address = int(item, 16)
                rom_list[color_address] = new_color0
                rom_list[color_address + 1] = new_color1
                rom_list[color_address + 2] = new_color2

        if doors.upper() == 'Y':
            # Creates two lists of numbers, one sorted, one shuffled
            num_doors = len(door_locations)
            num_array = list(range(0, num_doors))
            shuffled_nums = num_array
            random.shuffle(shuffled_nums)
            # Restructures the ROM so the original level at the sorted index now leads to the level at the shuffled index
            # Original door -> Shuffled Room 1 -> ... -> Shuffled final door -> Original Bonus Section (ensures the right level is completed)
            for i in num_array:
                j = shuffled_nums[i]
                entry_address = int(door_locations[i][0], 16)
                exit_address = int(door_locations[j][1], 16)

                rom_list[entry_address + 2] = int(door_values[j][0][0], 16)
                rom_list[entry_address + 3] = int(door_values[j][0][1], 16)
                rom_list[entry_address + 4] = int(door_values[j][0][2], 16)

                rom_list[exit_address + 2] = int(door_values[i][1][0], 16)
                rom_list[exit_address + 3] = int(door_values[i][1][1], 16)
                rom_list[exit_address + 4] = int(door_values[i][1][2], 16)

        rom = bytes(rom_list)
        new_rom = open('.'.join(rom_name.split(".")[:-1]) + "_" + str(KA_seed) + ".nes", 'wb')
        new_rom.write(rom)
        new_rom.close()

        input("Your copy of Kirby's Adventure has been randomized, enjoy! Press Enter to close.")

    except FileNotFoundError:
        input("No file of that name was found. Make sure your .nes ROM is in the same folder as this program. Press Enter to close.")
    except HashError:
        input("The file given is invalid. Please use a US NES Kirby's Adventure ROM. Press Enter to close.")
    except Exception as e:
        print("ERROR: {}".format(e))
        input("Press Enter to close.")

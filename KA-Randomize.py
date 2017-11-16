# Program that randomizes the abilities of swallowed enemies in Kirby's Adventure
# Written by Aquova, 2017
# http://github.com/Aquova/KA-Rando

from PyQt5 import QtWidgets
import os, random, sys
from gui_design import Ui_MainWindow

VERSION = '2.00'

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

class KirbyApp(QtWidgets.QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(KirbyApp, self).__init__(parent)
        self.setupUi(self)
        self.findROMButton.clicked.connect(self.open_file)
        self.randomizeButton.clicked.connect(self.runRandomizer)
        self.title.setText(self.title.text() + VERSION)

    def open_file(self):
        self.romDisplay.clear()
        self.rom_file = QtWidgets.QFileDialog.getOpenFileName(self, "Open file", os.path.dirname(__file__), "NES ROMs (*.nes)")[0]
        if self.rom_file:
            self.romDisplay.setText(self.rom_file)

    def selectedColor(self):
        if self.grayColor.isChecked():
            return 0
        elif self.lightBlueColor.isChecked():
            return 1
        elif self.blueColor.isChecked():
            return 2
        elif self.purpleColor.isChecked():
            return 3
        elif self.redColor.isChecked():
            return 4
        elif self.orangeColor.isChecked():
            return 5
        elif self.yellowColor.isChecked():
            return 6
        elif self.lightGreenColor.isChecked():
            return 7
        elif self.greenColor.isChecked():
            return 8
        elif self.randomColor.isChecked():
            return random.randint(0, 8)

    def runRandomizer(self):
        try:
            KA_seed = self.seedValue.text()
            if KA_seed == "":
                KA_seed = random.randint(0, 999999999)
            random.seed(KA_seed)

            if self.starRodCheck.isChecked():
                ability_values.append("18")

            if self.noAbilityCheck.isChecked():
                ability_locations.extend(neutral_locations)

            rom = open(self.rom_file, 'rb').read()
            rom_list = list(rom)

            # Gives enemies new abilities based on random selection from file
            for item in ability_locations:
                address = int(item, 16)
                rand_ind = random.randint(0,len(ability_values) - 1)
                new_enemy = ability_values[rand_ind]
                new_enemy = int(new_enemy,16)
                rom_list[address] = new_enemy

            if self.defaultColor.isChecked() == False:
                new_color = self.selectedColor()
                row = new_palette[new_color]

                new_color0 = int(row[0:2],16)
                new_color1 = int(row[2:4],16)
                new_color2 = int(row[4:6],16)

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

            QtWidgets.QMessageBox.about(self, "Success", "Your copy of Kirby's Adventure has been randomized. Enjoy!")
        except AttributeError:
            QtWidgets.QMessageBox.about(self, "Error", "Error: Specify a ROM location")
        except FileNotFoundError:
            QtWidgets.QMessageBox.about(self, "Error", "Error: File not found")

def main():
    app = QtWidgets.QApplication(sys.argv)
    window = KirbyApp()
    window.show()
    app.exec_()

if __name__ == "__main__":
    main()

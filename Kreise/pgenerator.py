#%%
#!/usr/bin/env python

import random
from PIL import Image
from PIL import ImageDraw
import csv

picturecount = 0

def draw () :
    

    canvas_width = 64
    canvas_height = 64
    white = (255, 255, 255)
   
    diff =  random.randrange(0, 30, 3)

    y1 = 16 + diff / 2
    y2 = 48 - diff / 2

    image1 = Image.new("RGB", (canvas_width, canvas_height), white)
    draw = ImageDraw.Draw(image1)
    draw.ellipse([16,y1,48,y2], fill="white", outline = "black")

    filename = "circle"+str(picturecount)+".jpg"
    image1.save(filename)
    return diff

with open('pictures.csv', 'w', newline = '') as csvfile:
    filewriter = csv.writer(csvfile, delimiter=';', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    while picturecount < 200:
        diff = draw()
        filewriter.writerow([ str( 10 - (diff / 3)) ])
        picturecount += 1
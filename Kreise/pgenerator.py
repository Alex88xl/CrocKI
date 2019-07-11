# pythonfile for generating trainingimages and the associated testdata
#%%
#!/usr/bin/env python

import random
from PIL import Image
from PIL import ImageDraw
import csv

picturecount = 0

def draw () :
    
    # draw a 64x64 canvas
    canvas_width = 64
    canvas_height = 64

    # colour all pixles white
    white = (255, 255, 255)
   
    # used to generate a random number which will then be used to draw an eclipse
    # the more the ellipse equals a circle the higher is the worth
    diff =  random.randrange(0, 30, 3)
    y1 = 16 + diff / 2
    y2 = 48 - diff / 2

    image1 = Image.new("RGB", (canvas_width, canvas_height), white)
    draw = ImageDraw.Draw(image1)
    draw.ellipse([16,y1,48,y2], fill="white", outline = "black")

    # save the generated image
    filename = "circle"+str(picturecount)+".jpg"
    image1.save(filename)
    return diff

# open or create a picture.csv. The picture.csv will contain the worth of each picture in same order
with open('pictures.csv', 'w', newline = '') as csvfile:
    filewriter = csv.writer(csvfile, delimiter=';', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    while picturecount < 200:
        diff = draw()
        filewriter.writerow([ str( 10 - (diff / 3)) ])
        picturecount += 1
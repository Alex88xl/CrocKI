# Run all cells in order 
#%%
import cv2
import os
import numpy as np
from tqdm import tqdm
import pandas as pd

# Load train and testdata. Traindata is a folder with 200 64x64 pictures. Testdata is a csv with the worth of each picture (0-10)
train_data = '/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/Bilder'
test_data = '/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/pictures.csv'

# read the traindata and convert to grayscale image. In case the picture is more than 64x64 it gets resized to 64x64
def read_train_data():
    train_images = []
    x = 0
    # foreach equivalent in python. Iterate throught folder
    for i in tqdm(os.listdir(train_data)):
        # Load an image in order
        path = train_data + "/circle" + str(x) + ".jpg"
        img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (64, 64))
        train_images.append(np.array(img))
        x = x + 1
    return train_images

# read the csv file in same order as the pictures
def readcsv(filename):
    data = pd.read_csv(filename) 
    return(np.array(data))

# functioncall
test_csv = readcsv(test_data)
train_images = read_train_data()

#%%
import tensorflow as tf
 
# load the 64x64 images of circles
tr_img_data = train_images
tr_lbl_data = np.array([i[0] for i in test_csv])

# print out the whole image in numbers
np.set_printoptions(threshold=np.inf)

x_train = tr_img_data
y_train = tr_lbl_data

# convert each pixel from 0-255 to 0-1. DL-network will work better this way
x_train = np.multiply(x_train, 1.0/255.0)

# print example picture
print(x_train[1])

# build the DL-model
model = tf.keras.models.Sequential()

model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(64, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(64, activation=tf.nn.relu))
# 11 Outputs (0-10)
model.add(tf.keras.layers.Dense(11, activation=tf.nn.softmax))

# parameters for DL-model to learn efficient
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"])

# train the model with the loaded data and the parameters 50 times
history = model.fit(x_train, y_train, epochs=50)

# save the model for later use in server.py
model.save('my_model.h5')


#%%
import matplotlib.pyplot as plt
import numpy as np

# print image
plt.imshow(x_train[6], cmap = plt.cm.binary)
#%%
# predict sample image
pred = model.predict_proba(x_train)
# reduce the 11 outputs to the highest. example: 0.2 0.3 0.5. Only the number of the highest number will be used (2)
print(np.argmax(pred[6]))
print(y_train[6])

#%%
import cv2
import numpy as np

# load the saved model to test for later use
new_model = tf.keras.models.load_model('my_model.h5')

test = []
# load an example picutre which was created after the training. Therefore new picture for the DL-model
path = "/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/circle0.jpg"
img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
img = cv2.resize(img, (64, 64))
test.append(np.array(img))

x_test = np.multiply(test, 1.0/255.0)

# test if the model works with a new picture
pred = new_model.predict_proba(x_test)
print(np.argmax(pred[0]))
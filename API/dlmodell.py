#%%
import cv2
import os
import numpy as np
from tqdm import tqdm
import pandas as pd

train_data = '/Users/alexwrede/Downloads/Bilder'
test_data = '/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/pictures.csv'

def read_train_data():
    train_images = []
    for i in tqdm(os.listdir(train_data)):
        path = os.path.join(train_data, i)
        img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (64, 64))
        train_images.append(np.array(img))
    return train_images

def readcsv(filename):
    data = pd.read_csv(filename) 
    return(np.array(data))

test_csv = readcsv(test_data)
train_images = read_train_data()

#%%
import tensorflow as tf
 
# 64x64 images of hand-written digits 0-9
# tr_img_data = np.array([i[0] for i in train_images]).reshape(-1,64,64,1)
tr_img_data = train_images
tr_lbl_data = np.array([i[0] for i in test_csv])

np.set_printoptions(threshold=np.inf)

x_train = tr_img_data
y_train = tr_lbl_data

# (x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = tf.keras.utils.normalize(x_train, axis=1)
# x_test = tf.keras.utils.normalize(x_test, axis=1)

# print(x_train[1])

model = tf.keras.models.Sequential()

model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(512, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(10, activation=tf.nn.softmax))

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"])

history = model.fit(x_train, y_train, epochs=50)
#%%
import cv2
import os
import numpy as np
from tqdm import tqdm
import pandas as pd

train_data = '/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/Bilder'
test_data = '/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/pictures.csv'

def read_train_data():
    train_images = []
    x = 0;
    for i in tqdm(os.listdir(train_data)):
        path = "/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/API/Bilder/circle" + str(x) + ".jpg"
        img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (64, 64))
        train_images.append(np.array(img))
        x = x + 1;
    return train_images

def readcsv(filename):
    data = pd.read_csv(filename) 
    return(np.array(data))

test_csv = readcsv(test_data)
train_images = read_train_data()

#%%
import tensorflow as tf
 
# 64x64 images of circles
tr_img_data = train_images
tr_lbl_data = np.array([i[0] for i in test_csv])

np.set_printoptions(threshold=np.inf)

x_train = tr_img_data
y_train = tr_lbl_data

x_train = np.multiply(x_train, 1.0/255.0)

print(x_train[1])

model = tf.keras.models.Sequential()

model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(64, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(64, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(11, activation=tf.nn.softmax))

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"])

history = model.fit(x_train, y_train, epochs=50)

model.save('my_model.h5')


#%%
import matplotlib.pyplot as plt
import numpy as np

plt.imshow(x_train[6], cmap = plt.cm.binary)
#%%
pred = model.predict_proba(x_train)
print(np.argmax(pred[6]))
print(y_train[6])

#%%
import cv2
import numpy as np

new_model = tf.keras.models.load_model('my_model.h5')

test = []
path = "/Users/alexwrede/Desktop/DHBW/DHBW 2019/Intergrationsseminar/CrocKI/circle0.jpg"
img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
img = cv2.resize(img, (64, 64))
test.append(np.array(img))

x_test = np.multiply(test, 1.0/255.0)

pred = new_model.predict_proba(x_test)
print(np.argmax(pred[0]))
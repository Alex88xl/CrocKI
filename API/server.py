from flask import Flask
import cv2
import numpy as np
import tensorflow as tf
from flask import request
from flask_cors import CORS
import urllib.request

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    
    new_model = tf.keras.models.load_model('my_model.h5')

    test = []
    path = request.args.get('link','')
    path = "http://crocki.sitterfinder.de/pictures/" + path

    urllib.request.urlretrieve(path, "local-filename.jpg")

    img = cv2.imread("local-filename.jpg", cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (64, 64))
    test.append(np.array(img))

    x_test = np.multiply(test, 1.0/255.0)

    pred = new_model.predict_proba(x_test)
    return("" + str(np.argmax(pred[0])))
from flask import Flask
import cv2
import numpy as np
import tensorflow as tf
from flask import request
from flask_cors import CORS
import urllib.request

# use Flask as python server runtime 
app = Flask(__name__)
# disable CORS-warnings. The server.py gets requested by a webserver.
cors = CORS(app)

# delegate all requests send to the server.py to the index function
@app.route('/')
def index():
    
    # load the in dlmodell.py saved DL-model
    new_model = tf.keras.models.load_model('my_model.h5')

    test = []
    # load the arguments of the ajax-request e.g. link to a picture saved on webserver
    path = request.args.get('link','')
    # path to the saved picture
    path = "http://crocki.sitterfinder.de/pictures/" + path

    # retrieve the image from server and save as local file for further processing
    urllib.request.urlretrieve(path, "local-filename.jpg")

    # use local imagefile and resize to 64x64 in case it was larger
    img = cv2.imread("local-filename.jpg", cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (64, 64))
    test.append(np.array(img))

    x_test = np.multiply(test, 1.0/255.0)

    # predict the value of the image and return
    pred = new_model.predict_proba(x_test)
    return("" + str(np.argmax(pred[0])))
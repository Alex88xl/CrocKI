from flask import Flask
import cv2
import numpy as np
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    
    new_model = tf.keras.models.load_model('my_model.h5')

    test = []
    path = request.args.get('link','')
    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (64, 64))
    test.append(np.array(img))

    x_test = np.multiply(test, 1.0/255.0)

    pred = new_model.predict_proba(x_test)
    return(np.argmax(pred[0]))
# CrocKI
Application to sell Artworks over Blockchain. The Worth off the Art will be set by an Deep Learning Model. 
The Communication from Smart Contract to DL uses the Oracle Pattern. 

# Usage Application
Start Ganache with Localhost and Port 8545

1. Open Terminal and go to the basedirectory. Run "npm install" to      install all needed dependencies. (www.npmjs.com/get-npm)

2. Run "npm install truffle"

3. When finished run "npm run devall" (SmartContract will be            deployed to the blockchain -> the ArtWarehouse.json will be          copied to Frontend (contains OraclePattern)
        -> If an error occurs with npm saying "missing script copyF", then just copy the ArtWarehouse.json from 
        "SmartContract/build/contracts/ArtWarehouse.json" to "Frontend"

4.  Furthermore the SmartContract needs to be migrated. Go to the        SmartContract directory.
    1. run "npm install" 
    2. run "npm run tm" to migrate the SmartContracts to the blockhain.

5.  Afterwards there are two options:
    1. Upload the Frontend-folder and pictures-folder to a webserver and use a browser (upload ArtWarehouse.json every time you migrated)
    2. Start a node.js server.
        1. run "npm init" in the Frontend-folder
        2. "npm install node.js"
        3. "npm run dev"

5.  Furthermore the SmartContract needs to be migrated. Go to the        SmartContract directory.
    1. run "npm install" 
    2. run "npm run tm" to migrate the SmartContracts to the blockhain.

6.  Run "npm run tt" to test the migrations.

7.  Go to the API-folder and run (Mac) "export FLASK_APP=server.py", 
    (Windows Powershell) "$env:FLASK_APP= "server.py"" to set the PATH to the FLASK server

8.  Install openCV2. Run "pip install opencv-python==" choose a          valid version (highest) and run the command again with the           versionnumber after "=="

9.  Install tensorflow. Run (Mac) "pip install tensorflow". 
    (Windows) "pip3 install --user --upgrade tensorflow".

10. Install numpy

11.  Go to the API-folder and run "flask run". The server.py will         start on localhost and port 5000.

=> Use your browser to access the frontend

=> Use localhost:3000 to access the frontend

# Usage pgenerator.py
Install Anaconda and afterwads install jupyter to use the "run cell" option in pgenerator.py. When the generation of new images was successfull a new Folder "Bilder" will appear, aswell as the pictures.csv. Those are needed for usage of the DL-Model

# Usage DL-Model
In addition to the steps done in "Usage pgenerator.py", do also install the newest version of openCV2.

Change the Paths to the Train- and Testdata to your "Bilder"-folder and to your pictures.csv.

Then just start running the cells in order.

After all cells finished, replace the new generated "my_model.h5" with the old one in the API-folder
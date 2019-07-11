# CrocKI
Application to sell Artworks over Blockchain. The Worth off the Art will be set by an Deep Learning Model. 
The Communication from Smart Contract to DL uses the Oracle Pattern. 

# Usage
Start Ganache with Localhost and Port 8545

1. Open Terminal and go to the basedirectory. Run "npm install" to      install all needed dependencies. 
2. When finished run "npm run devall" (SmartContract will be            deployed to the blockchain -> the ArtWarehouse.json will be          copied to Frontend (contains OraclePattern)
3.  Afterwards there are two options:
    1. Upload the Frontend-folder and pictures-folder to a webserver and use a browser
    2. Start a node.js server.
        1. run "npm init" in the Frontend-folder
        2. "npm install node.js"
        3. "npm run dev"

4.  Furthermore the SmartContract needs to be migrated. Go the           SmartContract-folder and run "npm run tm" to migrate the             SmartContracts to the blockhain.

5.  Run "npm run tt" to test the migrations.

6.  Go to the API-folder and run "flask run". The server.py will be      started on localhost and port 5000.

=> Use your browser to access the frontend
=> Use localhost:3000 to access the frontend
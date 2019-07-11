pragma solidity >=0.4.21 <0.6.0;

contract ArtWarehouse {

    // define a Pictureobject. Each picture will be stored as this on the blockchain
    struct Picture {
        int id;
        string link;
        int worth;
        address owner;
    }

    // define an associated array for listing all pictures in dependece of the pictureId
    mapping(int => Picture) public pictureList;
    // Store Pictures Count
    int public picturesCount;

    // constructor. Will be called when the SmartContract is migrated to the Blockchain only once
    constructor () public {
        picturesCount = 0;
    }

    // function for adding a picture to the blockchain. Will be called from the app.js
    function addPicture (string memory link) public {
        // boolean used to determine if a picture has already been uploaded
        bool used = false;
        // iterate through all stored pictures
        for (int i = 0; i <= picturesCount; i++) {
            // compare the names of a picture
            if(compareLinks(link, pictureList[i].link) == true){
                // if picture is already existing set boolean to true
                used = true;
            }
        }

        // require the boolean used to be false. Otherwise the picture won't be stored a failure will be returned
        require(used == false, "Bild bereits vorhanden!");

        // if picture is valid the pictureCount will be added by 1
        picturesCount ++;

        // the new picture will be written to the blockchain with the new picturesCount value as ID
        pictureList[picturesCount] = Picture(picturesCount, link, 0, msg.sender);

        // Event emmitten
        emit pictureUpload(msg.sender, picturesCount, link);
    }

    // function for setting the worth of a picture. Will be called from app.js
    function setWorth (int pictureID, int worth) public {
        // require a valid picture
        require((pictureID > 0 && pictureID <= picturesCount && worth <= 10 && worth >= 0), "ID nicht gültig.");

        // update pictures worth
        pictureList[pictureID].worth = worth;
    }

    // function for comparing the pictures names. Strings can't be compared in without hashing the strings
    function compareLinks (string memory a, string memory b) private pure returns (bool) {
        if(keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b))){
            return true;
        }else{
            return false;
        }
    }

    // this event will be emitted when a new picture has been added. Will be watched by the oraclePattern in app.js, which will then be fired
    event pictureUpload (address indexed sid, int pictureId, string link);
}
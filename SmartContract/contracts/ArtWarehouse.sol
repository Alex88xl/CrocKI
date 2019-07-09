pragma solidity >=0.4.21 <0.6.0;

contract ArtWarehouse {

    struct Picture {
        int id;
        string link;
        int worth;
        address owner;
    }

    // Read/write Pictures
    mapping(int => Picture) public pictureList;
    // Store Pictures Count
    int public picturesCount;

    constructor () public {
        picturesCount = 0;
    }

    function addPicture (string memory link) public {
        bool used = false;
        
        for (int i = 0; i <= picturesCount; i++) {
            if(compareLinks(link, pictureList[i].link) == true){
                used = true;
            }
        }

        require(used == false, "Bild bereits vorhanden!");

        picturesCount ++;
        pictureList[picturesCount] = Picture(picturesCount, link, 0, msg.sender);

        // Event emmitten
        emit pictureUpload(msg.sender, picturesCount, link);
    }

    function setWorth (int pictureID, int worth) public {
        // require a valid candidate
        require((pictureID > 0 && pictureID <= picturesCount && worth <= 10 && worth >= 0), "ID nicht gültig.");

        // update candidate vote Count
        pictureList[pictureID].worth = worth;
    }

    function compareLinks (string memory a, string memory b) private returns (bool) {
        if(keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b))){
            return true;
        }else{
            return false;
        }
    }

    // Dieses Event wird emitted und vom Backend beobachet
    event pictureUpload (address indexed sid, int pictureId, string link);
}
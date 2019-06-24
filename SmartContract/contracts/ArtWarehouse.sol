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
        picturesCount ++;
        pictureList[picturesCount] = Picture(picturesCount, link, 0, msg.sender);

        // Event emmitten
        emit pictureUpload(msg.sender, picturesCount, link);
    }

    function setWorth (int pictureID, int worth) public {
        // require that they haven't voted before
        //require(msg.sender == "abcAdresse");
        require(pictureID == 1, "ID nicht 1.");

        // require a valid candidate
        require((pictureID > 0 && pictureID <= picturesCount && worth <= 10 && worth >= 0), "ID nicht gültig.");

        // update candidate vote Count
        pictureList[pictureID].worth = worth;
    }

    // Dieses Event wird emitted und vom Backend beobachet
    event pictureUpload (address indexed sid, int pictureId, string link);
}
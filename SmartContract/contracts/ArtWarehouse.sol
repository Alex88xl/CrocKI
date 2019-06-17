pragma solidity >=0.4.21 <0.6.0;

contract Election {

    struct Picture {
        uint id;
        string link;
        uint worth;
        address owner;
    }

    // Read/write Pictures
    mapping(uint => Picture) public pictureList;
    // Store Pictures Count
    uint public picturesCount;

    constructor () public {
        picturesCount = 0;
    }

    function addPicture (string memory link) public {
        picturesCount ++;
        pictureList[picturesCount] = Picture(picturesCount, link, 0, msg.sender);

        // Event emmitten
        emit pictureUpload(picturesCount, link);
    }

    function setWorth (uint pictureID, uint worth) public {
        // require that they haven't voted before
        //require(msg.sender == "abcAdresse");
        require(pictureID == 1);

        // require a valid candidate
        require(pictureID > 0 && pictureID <= picturesCount && worth <= 10 && worth >= 0);

        // update candidate vote Count
        pictureList[pictureID].worth = worth;
    }

    // Dieses Event wird emitted und vom Backend beobachet
    event pictureUpload (uint indexed _pictureId, string link);
}
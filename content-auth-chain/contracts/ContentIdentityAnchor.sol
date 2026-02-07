// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ContentIdentityAnchor {

    struct ContentProof {
        address publisher;
        uint256 timestamp;
        uint8 contentType;
    }

    mapping(bytes32 => ContentProof) private proofs;
    uint256 public totalRegistered;

    event ContentRegistered(
        bytes32 indexed contentHash,
        address indexed publisher,
        uint256 timestamp,
        uint8 contentType
    );

    function contentExists(bytes32 contentHash) public view returns (bool) {
        return proofs[contentHash].publisher != address(0);
    }

    function registerContent(bytes32 contentHash, uint8 contentType) public {
        require(contentHash != bytes32(0), "Invalid hash");
        require(!contentExists(contentHash), "Already registered");

        proofs[contentHash] = ContentProof({
            publisher: msg.sender,
            timestamp: block.timestamp,
            contentType: contentType
        });

        totalRegistered++;

        emit ContentRegistered(contentHash, msg.sender, block.timestamp, contentType);
    }

    function verifyContent(bytes32 contentHash)
        public
        view
        returns (address publisher, uint256 timestamp, uint8 contentType)
    {
        require(contentExists(contentHash), "Not registered");

        ContentProof memory proof = proofs[contentHash];
        return (proof.publisher, proof.timestamp, proof.contentType);
    }
}

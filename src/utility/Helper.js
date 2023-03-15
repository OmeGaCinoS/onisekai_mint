import React, { useState, useEffect } from "react";

// Web3 Imports
import ReactLoading from 'react-loading';
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';
import Web3 from "web3";
import { IZGlistAddresses } from './IzanagiAddresses';
import { IZMlistAddresses } from './IzanamiAddresses';



async function _hashIzanagi(metamakAcc) {

    const leafNodes = IZGlistAddresses.map(addr => keccak256(addr));
    const markleTreeT = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = markleTreeT.getHexRoot();
    console.log("Root hash IZGGG ----> ", rootHash)

    // console.log("whitelist Merkle Tree\n", markleTreeT.toString());
    console.log("account -- > ", metamakAcc)

    const addressChecker = keccak256(metamakAcc).toString('hex')

    const HexProof = markleTreeT.getHexProof(addressChecker);

    return HexProof;
}


async function _hashIzanami(metamakAcc) {

    const leafNodes = IZMlistAddresses.map(addr => keccak256(addr));
    const markleTreeT = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = markleTreeT.getHexRoot();
    console.log("Root hash IZMMM ----> ", rootHash)

    // console.log("whitelist Merkle Tree\n", markleTreeT.toString());
    console.log("account -- > ", metamakAcc)

    const addressChecker = keccak256(metamakAcc).toString('hex')

    const HexProofSecond = markleTreeT.getHexProof(addressChecker);

    return HexProofSecond
}

export { _hashIzanagi, _hashIzanami }
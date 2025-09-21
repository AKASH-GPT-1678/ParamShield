// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library InsuranceLibrary {


       function randMod(uint _modulus, uint randNonce) external returns(uint)
    {
        // increase nonce
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce))) % _modulus;
    } 

}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library InsuranceLibrary {


       function randVal(uint _modulus, uint randNonce) external returns(uint)
    {
  
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce))) % _modulus;
    } 

}
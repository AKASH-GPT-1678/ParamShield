// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library InsuranceLibrary {
    function randVal(uint256 _modulus, uint256 randNonce) external view returns (uint256) {
        randNonce++;
        return uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    msg.sender,
                    randNonce
                )
            )
        ) % _modulus;
    }
}

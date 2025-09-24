// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {Insurance} from "../src/Insurance.sol";

contract InsuranceTest is Test {
    Insurance insurance;
    
    function setUp() public {
        insurance = new Insurance();
    }









    function testNewInsurance() public{
        insurance.newInsurance(
               "Book Policy",
            100 ether,
            1000 ether,
            30 days,
            50 ether,
            "Books",
            "First policy",
            block.timestamp,
            block.timestamp + 365 days,
            1
        );
          assertEq(insurance.count(), 1);
        

    }


}
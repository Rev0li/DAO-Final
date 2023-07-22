// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Voting.sol";
import "./SBT.sol";

contract DAO {
    Voting public vote;
    SBT public sbt;

    constructor() {
        vote = new Voting();
        sbt = new SBT("Sbt-Sportif", "BCS");
    }

    //Gouvernance
}

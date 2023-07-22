// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @author Revoli
 * @title ProposalDao
 * @notice Serves as a proposal in Dao.
 * @dev Inherits the OpenZepplin Ownable implentation.
 */

contract Voting is Ownable {
    mapping(address => bool) public whitelist;
    //script seed.js pour ajouter les address
    event Whitelisted(address desc);

    struct Proposal {
        string description;
        uint8 yesVotes;
        uint8 noVotes;
        uint8 neutralVotes;
        bool voteDecision;
    }
    Proposal[] public proposals;
    event emitProposal(string addr);

    struct Vote {
        bool hasVoted;
        uint choice;
    }
    mapping(address => mapping(uint => Vote)) public Votes;

    modifier onlyWhitelisted() {
        require(
            whitelist[msg.sender],
            "Vous n'etes pas autorise a effectuer cette action"
        );
        _;
    }

    // ::::::::::::: ADD VOTER ::::::::::::: //

    function addVoter(address _voterDao) external onlyOwner {
        require(!whitelist[_voterDao], "Voter is already add");
        whitelist[_voterDao] = true;
        emit Whitelisted(_voterDao);
    }

    // ::::::::::::: EMIT PROPOSAL ::::::::::::: //

    /**
     * @notice Add a proposal to the list.
     * @param _desc The description of the proposal.
     */
    function addProposal(string calldata _desc) external onlyWhitelisted {
        require(bytes(_desc).length > 0, "Description empty is not accepted");
        proposals.push(Proposal(_desc, 0, 0, 0, false));
        emit emitProposal(_desc);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @notice Vote for a proposal.
     * @param _proposalId The ID of the proposal to vote for.
     * _decision
     */
    function setVote(
        uint256 _proposalId,
        uint _decision
    ) external onlyWhitelisted {
        require(
            !Votes[msg.sender][_proposalId].hasVoted,
            "Already voted for this proposal"
        );
        require(_proposalId < proposals.length, "Proposal not found");
        Votes[msg.sender][_proposalId].choice = _decision;
        Votes[msg.sender][_proposalId].hasVoted = true;

        if (_decision == 1) {
            proposals[_proposalId].yesVotes++;
        }
        if (_decision == 2) {
            proposals[_proposalId].noVotes++;
        }
        if (_decision == 0) {
            proposals[_proposalId].neutralVotes++;
        }

        if (proposals[_proposalId].yesVotes > proposals[_proposalId].noVotes) {
            proposals[_proposalId].voteDecision = true;
        } else {
            proposals[_proposalId].voteDecision = false;
        }
    }
}

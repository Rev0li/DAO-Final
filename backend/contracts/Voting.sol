// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @author Revoli
 * @title Voting
 * @notice Ce contrat gère les propositions et les votes dans un système de gouvernance decentralisée (DAO).
 * @dev Ce contrat hérite de la bibliothèque OpenZeppelin Ownable.
 */
contract Voting is Ownable {
    struct Proposal {
        string description;
        uint8 yesVotes;
        uint8 noVotes;
        uint8 neutralVotes;
        bool voteDecision;
    }

    mapping(address => bool) public whitelist;
    Proposal[] public proposals;
    mapping(address => mapping(uint => bool)) public hasVoted;

    event Whitelisted(address indexed voter);
    event ProposalAdded(uint indexed proposalId, string description);
    event Voted(address indexed voter, uint indexed proposalId, uint8 choice);

    modifier onlyWhitelisted() {
        require(
            whitelist[msg.sender],
            "Vous n'etes pas autorise a effectuer cette action"
        );
        _;
    }

    // ::::::::::::: ADD VOTER ::::::::::::: //

    /**
     * @notice Ajoute un votant a la liste blanche.
     * @param _voterDao L'adresse du votant a ajouter.
     */
    function addVoter(address _voterDao) external onlyOwner {
        require(!whitelist[_voterDao], "Votant deja ajoute");
        whitelist[_voterDao] = true;
        emit Whitelisted(_voterDao);
    }

    // ::::::::::::: ADD PROPOSAL ::::::::::::: //

    /**
     * @notice Ajoute une proposition a la liste.
     * @param _desc La description de la proposition.
     */
    function addProposal(string calldata _desc) external onlyWhitelisted {
        require(bytes(_desc).length > 0, "Description vide non acceptee");
        proposals.push(Proposal(_desc, 0, 0, 0, false));
        emit ProposalAdded(proposals.length - 1, _desc);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @notice Vote pour une proposition.
     * @param _proposalId L'ID de la proposition pour laquelle voter.
     * @param _choice Le choix du vote (0: neutre, 1: oui, 2: non).
     */
    function vote(uint256 _proposalId, uint8 _choice) external onlyWhitelisted {
        require(
            !hasVoted[msg.sender][_proposalId],
            "Already voted for this proposal"
        );
        require(_proposalId < proposals.length, "Proposal not found");

        Proposal storage proposal = proposals[_proposalId];
        hasVoted[msg.sender][_proposalId] = true;

        if (_choice == 1) {
            proposal.yesVotes++;
        } else if (_choice == 2) {
            proposal.noVotes++;
        } else if (_choice == 0) {
            proposal.neutralVotes++;
        } else {
            revert("Choix de vote non valide");
        }

        if (proposal.yesVotes > proposal.noVotes) {
            proposal.voteDecision = true;
        } else {
            proposal.voteDecision = false;
        }

        emit Voted(msg.sender, _proposalId, _choice);
    }
}

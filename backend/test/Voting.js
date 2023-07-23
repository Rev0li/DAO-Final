const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let votingContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy();
    await votingContract.deployed();
  });

  // ADD VOTER Functionality

  describe("ADD VOTER Functionality", function () {
    it("should return Voter is already add", async function () {
      await votingContract.addVoter(addr1.address);
      await expect(votingContract.addVoter(addr1.address)).to.be.revertedWith(
        "Votant deja ajoute"
      );
    });

    it("should emit event Whitelisted", async function () {
      await expect(votingContract.addVoter(addr1.address))
        .to.emit(votingContract, "Whitelisted")
        .withArgs(addr1.address);
    });
  });

  // EMIT PROPOSAL Functionality

  describe("EMIT PROPOSAL Functionality", function () {
    it("should return Description empty is not accepted", async function () {
      await votingContract.addVoter(addr1.address);
      await expect(
        votingContract.connect(addr1).addProposal("")
      ).to.be.revertedWith("Description vide non acceptee");
    });

    it("should emit event emitProposal", async function () {
      await votingContract.addVoter(addr1.address);
      const tx = await votingContract
        .connect(addr1)
        .addProposal("Première proposition");
      const receipt = await tx.wait();
      const proposalId = receipt.events[0].args[0];
      const proposal = await votingContract.proposals(proposalId);
      expect(proposal.description).to.equal("Première proposition");
    });
  });

  // SET VOTE Functionality

  describe("SET VOTE Functionality", function () {
    it("should record yesVotes for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr1).vote(0, 1); // Remplacer vote par setVote
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.yesVotes).to.equal(1);
    });

    it("should record noVotes for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr1).vote(0, 2); // Remplacer vote par setVote
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.noVotes).to.equal(1);
    });

    it("should record neutralVotes for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr1).vote(0, 0); // Remplacer vote par setVote
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.neutralVotes).to.equal(1);
    });

    it("should return Already voted for this proposal", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr1).vote(0, 0);
      await expect(votingContract.connect(addr1).vote(0, 0)).to.be.revertedWith(
        "Already voted for this proposal"
      );
    });

    it("should return Proposal not found", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.addVoter(addr2.address);
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr2).addProposal("mière proposition");
      await expect(votingContract.connect(addr1).vote(2, 1)).to.be.revertedWith(
        "Proposal not found"
      );
    });
  });

  // Modifier, onlyWhitelist, and Owner

  describe("Modifier, onlyWhitelist and Owner", function () {
    it("should revert for Voting onlyWhitelist", async function () {
      await expect(votingContract.connect(addr1).vote(0, 1)).to.be.revertedWith(
        "Vous n'etes pas autorise a effectuer cette action"
      );
    });

    it("should revert for Proposal onlyWhitelist", async function () {
      await expect(
        votingContract.connect(addr1).addProposal("Première proposition")
      ).to.be.revertedWith("Vous n'etes pas autorise a effectuer cette action");
    });
  });
});

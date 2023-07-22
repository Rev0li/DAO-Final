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

  describe("ADD VOTER Functionality", function () {
    it("should return false at bool whitelist", async function () {
      expect(await votingContract.whitelist(addr1.address)).to.be.false;
    });

    it("should add a addr to the whitelist", async function () {
      await votingContract.addVoter(addr1.address);
      expect(await votingContract.whitelist(addr1.address)).to.be.true;
    });

    it("should return Voter is already add", async function () {
      await votingContract.addVoter(addr2.address);
      await expect(votingContract.addVoter(addr2.address)).to.be.revertedWith(
        "Voter is already add"
      );
    });

    it("should emit event Whilisted", async function () {
      await expect(votingContract.addVoter(addr1.address))
        .to.emit(votingContract, "Whitelisted")
        .withArgs(addr1.address);
    });
  });
  // EMIT PROPOSAL
  describe("EMIT PROPOSAL Functionality", function () {
    it("should array proposal to be equal 0", async function () {
      // Vérifier qu'il n'y a pas de propositions initiales
      await expect(votingContract.proposals.length).to.equal(0);
    });

    it("should add a proposal", async function () {
      await votingContract.addVoter(addr1.address);

      await votingContract.connect(addr1).addProposal("Première proposition");

      // Vérifier que la proposition est bien "Première proposition"
      const proposal = await votingContract.proposals(0);
      expect(proposal.description).to.equal("Première proposition");
    });

    it("should return Description empty is not accepted", async function () {
      await votingContract.addVoter(addr1.address);

      await expect(
        votingContract.connect(addr1).addProposal("")
      ).to.be.revertedWith("Description empty is not accepted");
    });

    it("should emit event emitProposal", async function () {
      await votingContract.addVoter(addr1.address);

      await expect(
        votingContract.connect(addr1).addProposal("Première proposition")
      )
        .to.emit(votingContract, "emitProposal")
        .withArgs("Première proposition");
    });
  });

  // SET VOTE
  describe("SET VOTE Functionality", function () {
    it("should record yesVote for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");

      // Effectuer un vote positif pour la première proposition en tant que addr1
      await votingContract.connect(addr1).setVote(0, 1);

      // Vérifier que le vote a été enregistré correctement pour addr1
      const vote1After = await votingContract.Votes(addr1.address, 0);
      expect(vote1After.hasVoted).to.be.true;
      expect(vote1After.choice).to.equal(1);
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.yesVotes).to.equal(1);
    });

    it("should record noVotes for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");

      // Effectuer un vote positif pour la première proposition en tant que addr1
      await votingContract.connect(addr1).setVote(0, 2);

      // Vérifier que le vote a été enregistré correctement pour addr1
      const vote1After = await votingContract.Votes(addr1.address, 0);
      expect(vote1After.hasVoted).to.be.true;
      expect(vote1After.choice).to.equal(2);
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.noVotes).to.equal(1);
    });

    it("should record neutralVotes for a proposal", async function () {
      await votingContract.addVoter(addr1.address);
      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");

      // Effectuer un vote positif pour la première proposition en tant que addr1
      await votingContract.connect(addr1).setVote(0, 0);

      // Vérifier que le vote a été enregistré correctement pour addr1
      const vote1After = await votingContract.Votes(addr1.address, 0);
      expect(vote1After.hasVoted).to.be.true;
      expect(vote1After.choice).to.equal(0);
      const proposalAfter = await votingContract.proposals(0);
      expect(proposalAfter.neutralVotes).to.equal(1);
    });

    it("should return Already voted for this proposal", async function () {
      await votingContract.addVoter(addr1.address);
      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");

      // Effectuer un vote positif pour la première proposition en tant que addr1
      await votingContract.connect(addr1).setVote(0, 0);
      await expect(
        votingContract.connect(addr1).setVote(0, 0)
      ).to.be.revertedWith("Already voted for this proposal");
    });

    it("should return Proposal not found", async function () {
      await votingContract.addVoter(addr1.address);
      await votingContract.addVoter(addr2.address);
      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr2).addProposal("mière proposition");

      await expect(
        votingContract.connect(addr1).setVote(2, 1)
      ).to.be.revertedWith("Proposal not found");
    });
  });

  describe("Modifier, onlyWhitelist and Owner", function () {
    it("should revert  for add addr to the whitelist onlyOwner", async function () {
      await expect(
        votingContract.connect(addr1).addVoter(addr1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should revert for Voting onlyWhitelist", async function () {
      await expect(
        votingContract.connect(addr1).setVote(0, 1)
      ).to.be.revertedWith("Vous n'etes pas autorise a effectuer cette action");
    });

    it("should revert for Proposal onlyWhitelist", async function () {
      await expect(
        votingContract.connect(addr1).addProposal("Première proposition")
      ).to.be.revertedWith("Vous n'etes pas autorise a effectuer cette action");
    });
  });
});
// Fonctionnalités de la liste blanche (whitelist)

// Vérifier que le propriétaire peut ajouter des votants à la liste blanche.
// Vérifier que seuls les votants de la liste blanche peuvent ajouter des propositions et voter.
// Essayer d'ajouter un votant en tant qu'utilisateur non propriétaire et vérifier que cela revert.
// Essayer d'ajouter une proposition en tant qu'utilisateur non votant et vérifier que cela revert.
// Autres fonctionnalités

// Vérifier que la longueur de la liste des propositions est correctement mise à jour après l'ajout de propositions.
// Vérifier que la récupération d'une proposition par son ID fonctionne correctement.
// Vérifier que la récupération d'un vote par son adresse et l'ID de la proposition fonctionne correctement.

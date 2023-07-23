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
    it("should return false at bool whitelist", async function () {
      // Vérifier qu'une adresse n'est pas présente dans la liste blanche par défaut.
      expect(await votingContract.whitelist(addr1.address)).to.be.false;
    });

    it("should add a addr to the whitelist", async function () {
      // Vérifier qu'une adresse peut être ajoutée à la liste blanche.
      await votingContract.addVoter(addr1.address);
      expect(await votingContract.whitelist(addr1.address)).to.be.true;
    });

    it("should return Voter is already add", async function () {
      // Vérifier qu'ajouter une adresse déjà présente dans la liste blanche renvoie une erreur.
      await votingContract.addVoter(addr2.address);
      await expect(votingContract.addVoter(addr2.address)).to.be.revertedWith(
        "Voter is already add"
      );
    });

    it("should emit event Whilisted", async function () {
      // Vérifier que l'événement Whitelisted est émis lorsqu'une adresse est ajoutée à la liste blanche.
      await expect(votingContract.addVoter(addr1.address))
        .to.emit(votingContract, "Whitelisted")
        .withArgs(addr1.address);
    });
  });

  // EMIT PROPOSAL Functionality

  describe("EMIT PROPOSAL Functionality", function () {
    it("should array proposal to be equal 0", async function () {
      // Vérifier que le tableau des propositions est vide par défaut.
      await expect(votingContract.proposals.length).to.equal(0);
    });

    it("should add a proposal", async function () {
      // Vérifier qu'une proposition peut être ajoutée au tableau des propositions.
      await votingContract.addVoter(addr1.address);

      await votingContract.connect(addr1).addProposal("Première proposition");

      // Vérifier que la proposition est bien "Première proposition"
      const proposal = await votingContract.proposals(0);
      expect(proposal.description).to.equal("Première proposition");
    });

    it("should return Description empty is not accepted", async function () {
      // Vérifier qu'ajouter une proposition avec une description vide renvoie une erreur.
      await votingContract.addVoter(addr1.address);

      await expect(
        votingContract.connect(addr1).addProposal("")
      ).to.be.revertedWith("Description empty is not accepted");
    });

    it("should emit event emitProposal", async function () {
      // Vérifier que l'événement emitProposal est émis lorsqu'une proposition est ajoutée.
      await votingContract.addVoter(addr1.address);

      await expect(
        votingContract.connect(addr1).addProposal("Première proposition")
      )
        .to.emit(votingContract, "emitProposal")
        .withArgs("Première proposition");
    });
  });

  // SET VOTE Functionality

  describe("SET VOTE Functionality", function () {
    it("should record yesVote for a proposal", async function () {
      // Vérifier qu'un vote positif est enregistré pour une proposition donnée.
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
      // Vérifier qu'un vote négatif est enregistré pour une proposition donnée.
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
      // Vérifier qu'un vote neutre est enregistré pour une proposition donnée.
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
      // Vérifier qu'essayer de voter pour une proposition qui n'existe pas renvoie une erreur.
      await votingContract.addVoter(addr1.address);
      await votingContract.addVoter(addr2.address);

      // Ajouter une proposition
      await votingContract.connect(addr1).addProposal("Première proposition");
      await votingContract.connect(addr2).addProposal("mière proposition");

      // Essayer de voter pour la troisième proposition, qui n'existe pas
      await expect(
        votingContract.connect(addr1).setVote(2, 1)
      ).to.be.revertedWith("Proposal not found");
    });
  });

  // Modifier, onlyWhitelist, and Owner

  describe("Modifier, onlyWhitelist and Owner", function () {
    // Vérifier qu'essayer d'ajouter une adresse à la liste blanche en tant qu'utilisateur non propriétaire renvoie une erreur.
    it("should revert  for add addr to the whitelist onlyOwner", async function () {
      await expect(
        votingContract.connect(addr1).addVoter(addr1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    // Vérifier qu'essayer de voter en tant qu'utilisateur non votant renvoie une erreur.
    it("should revert for Voting onlyWhitelist", async function () {
      await expect(
        votingContract.connect(addr1).setVote(0, 1)
      ).to.be.revertedWith("Vous n'etes pas autorise a effectuer cette action");
    });

    it("should revert for Proposal onlyWhitelist", async function () {
      // Vérifier qu'essayer d'ajouter une proposition en tant qu'utilisateur non votant renvoie une erreur.
      await expect(
        votingContract.connect(addr1).addProposal("Première proposition")
      ).to.be.revertedWith("Vous n'etes pas autorise a effectuer cette action");
    });
  });
});

const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("SBT Contract", function () {
  let sbt;

  beforeEach(async function () {
    [ownerDeploy, addr1, addr2] = await ethers.getSigners();
    const SBT = await ethers.getContractFactory("SBT");
    sbt = await SBT.deploy("SBT-Sport", "BCS");
    await sbt.deployed();
  });

  // MINT Functionality

  describe("MINT function", function () {
    it("should mint a new Soul", async function () {
      // Vérifier qu'un nouveau Soul (SBT) peut être créé avec les informations fournies.
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      const createdSoul = await sbt.connect(addr1).getSoul();
      // Vérifier que le nouveau Soul a été créé avec les informations correctes.

      expect(createdSoul.nom).to.equal("John");
      expect(createdSoul.prenom).to.equal("Doe");
      expect(createdSoul.dateNaissance).to.equal("01/01/2000");
      expect(createdSoul.grade).to.equal(1);
      expect(createdSoul.license).to.equal(true);
      expect(createdSoul.owner).to.equal(addr1.address);
    });
    it("should return SBT already exists", async function () {
      // Vérifier qu'un Soul (SBT) ne peut pas être créé s'il existe déjà pour l'adresse du créateur.
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      await expect(
        sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true)
      ).to.be.revertedWith("SBT already exists");
    });
  });

  // BURN Functionality

  describe("BURN function", function () {
    it("should burn a Soul", async function () {
      // Vérifier qu'un Soul (SBT) peut être supprimé.
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      // Vérifier qu'après la suppression, getSoul() renvoie une erreur "SBT don't exists".
      await sbt.connect(addr1).burn();
      await expect(sbt.connect(addr1).getSoul()).to.be.revertedWith(
        "SBT don't exists"
      );
    });
  });

  // UPDATE Functionality

  describe("UPDATE function", function () {
    it("should update a Soul", async function () {
      // Vérifier qu'un Soul (SBT) peut être mis à jour avec de nouvelles informations.
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      await sbt.connect(addr1).update("John", "Doe", "01/01/2000", 2, false);

      // Vérifier que les informations du Soul ont été mises à jour avec les nouvelles informations.
      const createdSoul = await sbt.connect(addr1).getSoul();
      expect(createdSoul.grade).to.equal(2);
      expect(createdSoul.license).to.equal(false);
    });

    it("should return You have not SBT", async function () {
      // Vérifier qu'une erreur est renvoyée si le msg.sender n'a pas de Soul (SBT) existant lorsqu'il essaie de mettre à jour ses informations.
      await expect(
        sbt.connect(addr1).update("John", "Doe", "01/01/2000", 2, false)
      ).to.be.revertedWith("You have not SBT");
    });
  });
});

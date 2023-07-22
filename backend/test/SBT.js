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

  describe("ownerSbt", function () {});

  describe("MINT function", function () {
    it("should mint a new Soul", async function () {
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      const createdSoul = await sbt.connect(addr1).getSoul();

      expect(createdSoul.nom).to.equal("John");
      expect(createdSoul.prenom).to.equal("Doe");
      expect(createdSoul.dateNaissance).to.equal("01/01/2000");
      expect(createdSoul.grade).to.equal(1);
      expect(createdSoul.license).to.equal(true);
      expect(createdSoul.owner).to.equal(addr1.address);
    });
    it("should return SBT already exists", async function () {
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      await expect(
        sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true)
      ).to.be.revertedWith("SBT already exists");
    });
  });

  describe("BURN function", function () {
    it("should burn a Soul", async function () {
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      await sbt.connect(addr1).burn();
      await expect(sbt.connect(addr1).getSoul()).to.be.revertedWith(
        "SBT don't exists"
      );
    });
  });

  describe("UPDATE function", function () {
    it("should update a Soul", async function () {
      await sbt.connect(addr1).mint("John", "Doe", "01/01/2000", 1, true);

      await sbt.connect(addr1).update("John", "Doe", "01/01/2000", 2, false);

      const createdSoul = await sbt.connect(addr1).getSoul();
      expect(createdSoul.grade).to.equal(2);
      expect(createdSoul.license).to.equal(false);
    });

    it("should return You have not SBT", async function () {
      await expect(
        sbt.connect(addr1).update("John", "Doe", "01/01/2000", 2, false)
      ).to.be.revertedWith("You have not SBT");
    });
  });
});

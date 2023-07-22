const hre = require("hardhat");

async function main() {
  // const DAO = await hre.ethers.getContractFactory("DAO");
  // const dao = await DAO.deploy();

  // await dao.deployed();

  // console.log("DAO deployed to:", dao.address);

  // // Déployer le contrat Voting
  const Voting = await hre.ethers.getContractFactory("Voting");
  const vote = await Voting.deploy();
  await vote.deployed();

  console.log("Voting contract deployed at:", vote.address);

  // Déployer le contrat SBT
  const SBT = await hre.ethers.getContractFactory("SBT");
  const sbt = await SBT.deploy("Sbt-Sportif", "BCS");
  await sbt.deployed();

  console.log("SBT contract deployed at:", sbt.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

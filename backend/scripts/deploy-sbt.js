const hre = require("hardhat");

async function main() {
  const SBT = await hre.ethers.getContractFactory("SBT");

  const sbt = await SBT.deploy("myname", "BCS");

  await sbt.deployed();
  // Vous pouvez accéder à l'adresse du contrat déployé
  console.log(`SBT deployed to ${sbt.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

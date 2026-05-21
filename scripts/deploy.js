const hre = require("hardhat");

async function main() {
  const GenesisBreath = await hre.ethers.getContractFactory("GenesisBreath");
  const contract = await GenesisBreath.deploy();
  await contract.deployed();
  console.log("GenesisBreath deployed to:", contract.address);
}

main().catch(console.error);

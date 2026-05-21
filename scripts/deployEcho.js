const hre = require("hardhat");

async function main() {
  const EchoRegistry = await hre.ethers.getContractFactory("EchoRegistry");
  const contract = await EchoRegistry.deploy();
  await contract.deployed();
  console.log("EchoRegistry deployed to:", contract.address);
}

main().catch(console.error);

const hre = require("hardhat");

async function main() {
  // Deploy EchoRegistry
  const EchoRegistry = await hre.ethers.getContractFactory("EchoRegistry");
  const echoRegistry = await EchoRegistry.deploy();
  await echoRegistry.deployed();
  console.log("EchoRegistry deployed to:", echoRegistry.address);

  // Deploy StrainToken
  const StrainToken = await hre.ethers.getContractFactory("StrainToken");
  const strainToken = await StrainToken.deploy(echoRegistry.address);
  await strainToken.deployed();
  console.log("StrainToken deployed to:", strainToken.address);

  // Optionally add StrainToken as authorized minter in EchoRegistry? Not needed now.
}

main().catch(console.error);

const hre = require("hardhat");

async function main() {
  const echoRegistryAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // آدرس EchoRegistry
  const StrainToken = await hre.ethers.getContractFactory("StrainToken");
  const strainToken = await StrainToken.deploy(echoRegistryAddress);
  await strainToken.deployed();
  console.log("StrainToken deployed to:", strainToken.address);
}

main().catch(console.error);

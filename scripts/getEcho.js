const hre = require("hardhat");

async function main() {
  const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
  const EchoRegistry = await hre.ethers.getContractFactory("EchoRegistry");
  const contract = await EchoRegistry.attach(contractAddress);
  const signer = await hre.ethers.provider.getSigner(0);
  const address = await signer.getAddress();
  const info = await contract.getEcho(address);
  console.log("Name:", info[0]);
  console.log("PrivacyLevel:", info[1]);
  console.log("StrainScore:", info[3].toString());
  console.log("Active:", info[5]);
}

main().catch(console.error);

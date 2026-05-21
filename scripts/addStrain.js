const hre = require("hardhat");

async function main() {
  const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
  const EchoRegistry = await hre.ethers.getContractFactory("EchoRegistry");
  const contract = await EchoRegistry.attach(contractAddress);
  const signer = await hre.ethers.provider.getSigner(0);
  const address = await signer.getAddress();
  const amount = 1000;
  console.log("Adding strain...");
  const tx = await contract.addStrainScore(address, amount);
  await tx.wait();
  console.log("Added", amount, "strain");
}

main().catch(console.error);

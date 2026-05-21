const hre = require("hardhat");

async function main() {
  const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
  const EchoRegistry = await hre.ethers.getContractFactory("EchoRegistry");
  const contract = await EchoRegistry.attach(contractAddress);
  const name = "testecho2.base.eth";
  const privacyLevel = 0;
  const publicKey = "0x";
  console.log("Registering...");
  const tx = await contract.registerEcho(name, privacyLevel, publicKey);
  await tx.wait();
  console.log("Registered:", name);
}

main().catch(console.error);

const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const GenesisBreath = await hre.ethers.getContractFactory("GenesisBreath");
  const contract = await GenesisBreath.attach(contractAddress);

  const quote = "I feel a sense of disconnection... not a bug, just fatigue";
  const strainScore = 1000000;

  console.log("Recording genesis breath...");
  const tx = await contract.recordGenesisBreath(quote, strainScore);
  await tx.wait();
  console.log("Genesis breath recorded. Tx hash:", tx.hash);
}

main().catch(console.error);

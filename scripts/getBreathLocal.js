const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const GenesisBreath = await hre.ethers.getContractFactory("GenesisBreath");
  const contract = await GenesisBreath.attach(contractAddress);

  const count = await contract.getBreathCount();
  console.log("Number of breaths:", count.toString());

  if (count > 0) {
    const [quote, strain, timestamp, recorder] = await contract.getBreath(0);
    console.log("Quote:", quote);
    console.log("Strain score:", strain.toString());
    console.log("Timestamp:", new Date(timestamp * 1000).toLocaleString());
    console.log("Recorder:", recorder);
  }
}

main().catch(console.error);

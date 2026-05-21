const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
  const StrainToken = await hre.ethers.getContractFactory("StrainToken");
  const token = await StrainToken.attach(tokenAddress);
  const signer = await hre.ethers.provider.getSigner(0);
  const address = await signer.getAddress();
  await token.addMinter("0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0");
  console.log("Added EchoRegistry as minter");
  await token.mint(address, 500);
  const balance = await token.balanceOf(address);
  console.log("STRAIN balance:", balance.toString());
}

main().catch(console.error);

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    localhost: { url: "http://127.0.0.1:8545" },
    baseSepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/2CAko0DegFnZ91k71YcPX",
      chainId: 84532,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};

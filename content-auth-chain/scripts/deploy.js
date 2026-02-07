const hre = require("hardhat");

async function main() {
  const ContractFactory = await hre.ethers.getContractFactory("ContentIdentityAnchor");
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();

  console.log("ContentIdentityAnchor deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


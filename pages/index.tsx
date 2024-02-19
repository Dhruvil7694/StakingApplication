import ContractCard from "../components/nft-card";
import { ERC1155_CONTRACT_ADDRESS, ERC720_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, NATURE_REIMAGINED, PROFILE_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS, TIP_JAR_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My <span className={styles.gradientText0}>Contracts.</span>
          </h1>

          <p className={styles.description}>
            Select the contract to intreact with.
          </p>
        </div>

        <div className={styles.grid}>
          <ContractCard
            href="/project/erc20"
            contractAddress={ERC720_CONTRACT_ADDRESS}
            title="ERC20 ->"
            description="Claim ERC20 Tokens "
          />
          <ContractCard
            href="/project/erc721"
            contractAddress={ERC721_CONTRACT_ADDRESS}
            title="ERC21 ->"
            description="Claim ERC21 Tokens "
          />
          <ContractCard
            href="/project/erc1155"
            contractAddress={ERC1155_CONTRACT_ADDRESS}
            title="ERC1155 ->"
            description="Claim ERC1155 Tokens "
          />
          <ContractCard
            href="/project/tipJar"
            contractAddress={TIP_JAR_CONTRACT_ADDRESS}
            title="TIPJAR Smart Contract->"
            description="Leave a tip for a blockchain in the tipjar."
          />
          <ContractCard
            href="/project/staking"
            contractAddress={STAKING_CONTRACT_ADDRESS}
            title="Staking Smart Contract ->"
            description="Stake your ERC721 NFT to earn ERC720 "
          />
          <ContractCard
            href="/project/status"
            contractAddress={PROFILE_CONTRACT_ADDRESS}
            title="Profile Status Smart Contract ->"
            description="Update your profile status on a Blockchian"
          />
        </div>
      </div>
      <div className={styles.note}>
        <br/>
        <p>
          NOTE: to deploy new contract, please visit <Link href={"https://thirdweb.com/"}>Thirdweb</Link>{" "}
          dashboard!!
        </p>
      </div>
    </main>
  );
};

export default Home;

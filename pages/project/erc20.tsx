import styles from "../../styles/Home.module.css";
import HeroCard from "../../components/heroCard";
import {
  ERC1155_CONTRACT_ADDRESS,
  ERC720_CONTRACT_ADDRESS,
} from "../../constants/addresses";
import {
  Web3Button,
  useContract,
  useContractMetadata,
  useTokenSupply,
} from "@thirdweb-dev/react";
import Link from "next/link";

export default function ERC20Project() {
  const { contract } = useContract(ERC720_CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);

  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenSupply(contract);

  return (
    <div className={styles.container}>
      <HeroCard
        isLoading={contractMetadataIsLoading}
        title={contractMetadata?.name!}
        description={contractMetadata?.description!}
        image={contractMetadata?.image!}
      />
      <div className={styles.grid1}>
        <div className={styles.cardo}>
          <h3>Token Stacks</h3>
          {tokenBalanceIsLoading ? (
            <p>Loading Supply...</p>
          ) : (
            <p>
              Total Supply: {tokenBalance?.displayValue} {tokenBalance?.symbol}
            </p>
          )}
        </div>
        <div className={styles.cardo}>
          <h3>Token Balance</h3>
          {tokenBalanceIsLoading ? (
            <p>Balance Loading...</p>
          ) : (
            <p>
              Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}
            </p>
          )}
          <Web3Button
            contractAddress={ERC720_CONTRACT_ADDRESS}
            action={(contract) => contract.erc20.burn(10)}
            onError={(error) => alert(error.message)}
            style={{ backgroundColor: "#a79af9", fontWeight: "bold" }}
          >
            Burn 10 Tokens
          </Web3Button>
        </div>
        <div className={styles.cardo}>
          <h3>Earn Tokens</h3>
          <p>Earn more tokens by staking ERC721 NFT</p>
          <div>
            <Link href="/project/staking">
              <button className={styles.web3btn} style={{ fontWeight: "bold" }}>
                Stake ERC721
              </button>
            </Link>
            <Link href="/project/erc721">
              <button className={styles.web3btn} style={{ fontWeight: "bold" }}>
                Claim ERC721
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

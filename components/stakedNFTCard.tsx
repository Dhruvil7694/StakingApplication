import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import {
  ERC721_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
} from "../constants/addresses";
import styles from "../styles/Home.module.css";

type NFTProps = {
  tokenID: number;
};

export default function StakedNFTCard({ tokenID }: NFTProps) {
  const { contract: ERC721Contract } = useContract(
    ERC721_CONTRACT_ADDRESS,
    "signature-drop"
  );

  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);

  const { data: nftMetadata, isLoading: nftMetadataIsLoading } = useNFT(
    ERC721Contract,
    tokenID
  );
  return (
    <div className={styles.Card1}>
      <ThirdwebNftMedia
        metadata={nftMetadata?.metadata!}
        width="100%"
        height="auto"
      />
      <div className={styles.stakeNFTCardContainer}>
        <p className={styles.nftname}>{nftMetadata?.metadata.name}</p>
        <p className={styles.nfttokenid}>Token:{nftMetadata?.metadata.id}</p>
      </div>
      <Web3Button
        contractAddress={STAKING_CONTRACT_ADDRESS}
        action={(contract) => contract.call("withdraw", [[tokenID]])}
        style={{ width: "100%" }}
      >
        Unstake
      </Web3Button>
    </div>
  );
}

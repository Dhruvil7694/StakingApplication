import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
  useTotalCount,
} from "@thirdweb-dev/react";
import HeroCard from "../../components/heroCard";
import styles from "../../styles/Home.module.css";
import { ERC721_CONTRACT_ADDRESS } from "../../constants/addresses";
import Link from "next/link";

export default function ERC721Project() {
  const address = useAddress();

  const { contract } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);

  const { data: totalSupply, isLoading: totalSupplyIsLoading } =
    useTotalCount(contract);

  const { data: totalClaimedSupply, isLoading: totalclaimedSupplyIsLoading } =
    useClaimedNFTSupply(contract);

  const { data: ownedNFTs, isLoading: ownedNFTsIsLoading } = useOwnedNFTs(
    contract,
    address
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contractPage}>
          <HeroCard
            isLoading={contractMetadataIsLoading}
            title={contractMetadata?.name!}
            description={contractMetadata?.description!}
            image={contractMetadata?.image!}
          />
        </div>
        <div className={styles.grid1}>
          <div className={styles.cardo}>
            <h2>Claim ERC721</h2>
            <p>Claim ERC721 NFTS for FREE!!!</p>
            <Web3Button
              contractAddress={ERC721_CONTRACT_ADDRESS}
              action={(contract) => contract.erc721.claim(1)}
              onSuccess={() => alert("NFT Claimed")}
              style={{
                backgroundColor: "#a79af9",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Claim NFT
            </Web3Button>
          </div>
          <div className={styles.cardo}>
            <h2>Contract Stats</h2>
            <p>
              Total Supply:{" "}
              {totalSupplyIsLoading
                ? "Loading..."
                : `${totalSupply?.toNumber()}`}
            </p>
            <p>
              Total claimed:{" "}
              {totalclaimedSupplyIsLoading
                ? "Loading..."
                : `${totalClaimedSupply?.toNumber()}`}
            </p>
          </div>
          <div className={styles.cardo}>
            <h2>Your NFTs</h2>
            <p>
              Your NFTs:{" "}
              {ownedNFTsIsLoading
                ? "Wallet Not Connected"
                : `${ownedNFTs?.length}`}
            </p>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.arrowGrid}>
            <h1 className={styles.myNFTColor} style={{ fontSize: "xxx-large" }}>
              My NFTs{" "}
            </h1>
            <img
              width="58"
              height="58"
              src="https://img.icons8.com/fluency/48/long-arrow-right.png"
              alt="long-arrow-right"
              className={styles.arrow}
            />
          </div>
          <div className={styles.container} style={{ marginLeft: "-1rem" }}>
            <div className={styles.grid2} style={{ gap: "1rem" }}>
              {ownedNFTsIsLoading ? (
                <p>loading...</p>
              ) : (
                ownedNFTs?.map((nft) => (
                  <div className={styles.cardo} key={nft.metadata.id}>
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      className={styles.nftCardImage}
                    />
                    <div className={styles.cardText}>
                      <h2
                        style={{
                          marginLeft: "1px",
                          marginBottom: "0.1rem",
                          fontSize: "x-large",
                          fontWeight: "bold",
                        }}
                      >
                        {nft.metadata.name}
                      </h2>
                      <p className={styles.truncatePara}>
                        {nft.metadata.description}
                      </p>
                    </div>
                    <Link href={`/projects/staking`}>
                      <button
                        className={styles.web3btn}
                        style={{
                          width: "40%",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Stake NFT
                      </button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

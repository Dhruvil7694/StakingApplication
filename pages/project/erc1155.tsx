import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Home.module.css";
import { ERC1155_CONTRACT_ADDRESS } from "../../constants/addresses";
import HeroCard from "../../components/heroCard";

export default function ERC1155Project() {
  const address = useAddress();

  const { contract } = useContract(ERC1155_CONTRACT_ADDRESS, "Editiondrop");

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);

  const { data: contractNFTSupply, isLoading: contractNFTSupplyIsLoading } =
    useTotalCount(contract);

  const {
    data: totalCirculatingSupply,
    isLoading: totalCirculatingSupplyIsLoading,
  } = useTotalCirculatingSupply(contract, 0);

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
          <div className={styles.grid1}>
            <div className={styles.cardo}>
              <h3>Claim ERC1155</h3>
              <p>Claim your NFT for 10 ENGP only.</p>
              <Web3Button
                contractAddress={ERC1155_CONTRACT_ADDRESS}
                action={(contract) => contract.erc1155.claim(1, 1)}
                onError={(error) => alert(error.message)}
                style={{ backgroundColor: "#a79af9" }}
              >
                <b>Claim ERC1155</b>
              </Web3Button>
            </div>
            <div className={styles.cardo}>
              <h3>Contract Stats</h3>
              <p>
                Total NFTs:{" "}
                {contractNFTSupplyIsLoading
                  ? "Loading..."
                  : `${contractNFTSupply?.toNumber()}`}
              </p>
              <p>
                Total Circulating Supply for TokenID 0 is{" "}
                {totalCirculatingSupplyIsLoading
                  ? "Loading..."
                  : `${totalCirculatingSupply?.toNumber()}`}
              </p>
            </div>
            <div className={styles.cardo}>
              <h3>Your NFTs</h3>
              <p>
                {ownedNFTsIsLoading
                  ? "Loading..."
                  : ownedNFTs?.map((nft) => (
                      <p key={nft.metadata.id}>
                        Token ID {nft.metadata.id} Owned: {nft.quantityOwned}{" "}
                        NFTs
                      </p>
                    ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

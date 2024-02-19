import {
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  useTotalCount,
} from "@thirdweb-dev/react";
import HeroCard from "../../components/heroCard";
import {
  ERC720_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
} from "../../constants/addresses";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import StakeNFTCard from "../../components/stakeNFTCard";
import StakedNFTCard from "../../components/stakedNFTCard";

export default function StatusProject() {
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { contract: erc20Contract } = useContract(ERC720_CONTRACT_ADDRESS);
  const { contract: erc721Contract } = useContract(ERC721_CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(stakingContract);

  const { data: ownedNFTs, isLoading: ownedNFTsIsLoading } = useOwnedNFTs(
    erc721Contract,
    address
  );

  const { data: stakedERC721Tokens, isLoading: isStakedNFTsIsLoading } =
    useContractRead(stakingContract, "getStakeInfo", [address]);

  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenBalance(erc20Contract, address);

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!stakingContract || !address) return;
    async function getClaimableRewards() {
      const claimableRewards = await stakingContract?.call("getStakeInfo", [
        address,
      ]);
      setClaimableRewards(claimableRewards[1]);
    }
    getClaimableRewards();
  }, [address, stakingContract]);

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
              <h3>Rewards</h3>
              {tokenBalanceIsLoading ? (
                "Loading..."
              ) : (
                <p>
                  Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}
                </p>
              )}
              {claimableRewards && (
                <p>
                  Reward Balance: {ethers.utils.formatEther(claimableRewards)}
                </p>
              )}
              <Web3Button
                contractAddress={STAKING_CONTRACT_ADDRESS}
                action={(contract) => contract.call("claimRewards")}
                onSuccess={() => {
                  alert("Rewards Claimed");
                  setClaimableRewards(ethers.constants.Zero);
                }}
                isDisabled={!claimableRewards || claimableRewards.isZero()}
                style={{
                  backgroundColor: "#a79af9",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Claim Rewards
              </Web3Button>
            </div>
            <div className={styles.cardo}>
              <h3>Unstaked</h3>
              {ownedNFTsIsLoading ? (
                <p>Loading....</p>
              ) : ownedNFTs && ownedNFTs.length > 0 ? (
                ownedNFTs.map((nft) => (
                  <div key={nft.metadata.id} className={styles.grid}>
                    <StakeNFTCard nft={nft} />
                  </div>
                ))
              ) : (
                <p>"NO NFT FOUND!!!"</p>
              )}
            </div>
            <div className={styles.cardo}>
              <h3>Staked</h3>
              {isStakedNFTsIsLoading ? (
                <p>Loading....</p>
              ) : stakedERC721Tokens && stakedERC721Tokens.length > 0 ? (
                stakedERC721Tokens[0].map(
                  (stakedNFT: BigNumber, index: number) => (
                    <div key={index} className={styles.grid1}>
                      <StakedNFTCard tokenID={stakedNFT.toNumber()} />
                    </div>
                  )
                )
              ) : (
                <p>No NFTS staked</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

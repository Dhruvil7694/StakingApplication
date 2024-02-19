import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";

type NFTProps = {
    nft: NFT;
}

export default function stakeNFTCard({nft}: NFTProps){

    const address = useAddress();
    
    const{ contract: erc721Contract} = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");
    const{ contract: stakingContract} = useContract(STAKING_CONTRACT_ADDRESS);

    async function stakedNFT(nftID : number[]){
        if (!address) return;
        const isApproved = await erc721Contract?.isApproved(address, STAKING_CONTRACT_ADDRESS);
        if(!isApproved){
            await erc721Contract?.setApprovalForAll( STAKING_CONTRACT_ADDRESS, true);
        }
        await stakingContract?.call("stake", [nftID]);
    };
    
    return(
        <>
            <div className={styles.cardo}>
                <ThirdwebNftMedia
                    metadata={nft.metadata}
                    width="100%"
                    height="auto"
                />
                <div className={styles.stakeNFTCardContainer}>
                    <p className={styles.nfttokenid}>Token ID - {nft.metadata.id}</p>
                    <p className={styles.nftname}>{nft.metadata.name}</p>
                </div>
                <Web3Button
                    contractAddress={STAKING_CONTRACT_ADDRESS}
                    action={() => stakedNFT([parseInt(nft.metadata.id)])}
                    style={{backgroundColor:"#a79af9", width:"100%"}}
                >
                    Stake NFT
                </Web3Button>
            </div>
        </>
    )
}
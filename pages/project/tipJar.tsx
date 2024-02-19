import {
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
} from "@thirdweb-dev/react";
import HeroCard from "../../components/heroCard";
import { TIP_JAR_CONTRACT_ADDRESS } from "../../constants/addresses";
import styles from "../../styles/Home.module.css";
import { ethers } from "ethers";

export default function tipJarProject() {
  const address = useAddress();
  const { contract } = useContract(TIP_JAR_CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);

  const { data: tipJarBalance, isLoading: tipJarBalanceIsLoading } =
    useContractRead(contract, "getBalance");

    const {data: owner , isLoading: ownerIsLoading} = useContractRead(contract, "owner");
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
              <h3>Leave a Tip</h3>
              <p>
                Tip should be in MATIC and the record is stored on the blockhain
              </p>
              <Web3Button
                contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                action={(contract) =>
                  contract.call("tip", [], {
                    value: "1000000000000000",
                  })
                }
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                  backgroundColor: "#a79af9",
                }}
              >
                {"TIP [0.001 MATIC]"}
              </Web3Button>
            </div>
            <div className={styles.cardo}>
              <h3>Tip Jar Balance</h3>
              <p>
                Total Tips:{" "}
                {tipJarBalanceIsLoading
                  ? "Loading..."
                  : `${ethers.utils.formatEther(tipJarBalance)} MATIC`}
              </p>
            </div>
            <div className={styles.cardo}>
              <h3>Your NFTs</h3>
              {ownerIsLoading ? (
                "Loading..."
              ) : (
                owner == address ? (
                    <Web3Button
                        contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                        action={(contract) => contract.call(
                            "withdrawTip"
                        )}
                        onSuccess={() => alert("Tips is added in your wallet")}
                        style={{
                            marginBottom: "0.5rem",
                            fontWeight: "bold",
                            backgroundColor: "#a79af9",
                          }}
                    >
                        Withdraw Balance
                    </Web3Button>
                ) : (
                    <p>Only Owner can withdraw the balance</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

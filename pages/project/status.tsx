import {
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
} from "@thirdweb-dev/react";
import HeroCard from "../../components/heroCard";
import { PROFILE_CONTRACT_ADDRESS } from "../../constants/addresses";
import styles from "../../styles/Home.module.css";
import { Profiler, useState } from "react";

export default function StatusProject() {
  const address = useAddress();

  const { contract } = useContract(PROFILE_CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);

  const { data: profileStatus, isLoading: profileStatusIsLoading } =
    useContractRead(contract, "userStatus", [address]);

  const [status, setStatus] = useState("");

  const updateStatus = async () => {
    if (!profileStatus.exists) {
      await contract?.call("createStatus", [status]);
      setStatus("");
      return;
    }
    await contract?.call("updateStatus", [status]);

    setStatus("");
  };
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
            <div className={styles.cardo} style={{paddingLeft:"1rem"}}>
              <h3>Current Status</h3>
              <p>
                {profileStatusIsLoading ? (
                  "Loading..."
                ) : profileStatus.exists ? (
                  profileStatus.statusMessage
                ) : (
                  <i>"No Status yet"</i>
                )}
              </p>
            </div>
            <div className={styles.cardo} style={{paddingLeft:"1rem"}}>
              <h3>Update your status</h3>
              <div
                style={{
                  display: "flex !important",
                  //   flexDirection: "column !important",
                  alignItems: "flex-start !important",
                  border: "none !important",
                }}
              >
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Update Status Here"
                  style={{
                    color: "white !important",
                    fontSize: "1rem",
                    width: "100% !important",
                    height: "3rem !important",
                    marginBottom: "1rem !important",
                    backgroundColor: "#131313 !important",
                    border: " 1px solid #333 !important",
                    borderRadius: "10px !important",
                    padding: "10px !important",
                  }}
                />
              </div>
                <Web3Button
                  contractAddress={PROFILE_CONTRACT_ADDRESS}
                  action={updateStatus}
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                    backgroundColor: "#a79af9",
                  }}
                >
                  Update
                </Web3Button>
            </div>
            <div className={styles.cardo} style={{paddingLeft:"1rem"}}>
              <h3>Status Exist?</h3>
              <p>
                {profileStatusIsLoading
                  ? "Loading..."
                  : profileStatus.exists
                  ? "True"
                  : "False"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

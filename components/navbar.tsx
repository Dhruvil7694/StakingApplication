import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ConnectWallet, darkTheme, lightTheme } from "@thirdweb-dev/react";


export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <Link href="/" className={styles.navbarLogo}>
        <p className={styles.gradientText1} >Stakewave Portfolio</p>
      </Link>
      <div className={styles.navbarLinks}>
        <Link href= "/project/erc1155" >
          <p>ERC1155</p>
        </Link>
        <Link href={"/project/erc721"}>
          <p>BurnToClaim</p>
        </Link>
        <Link href={"https://opensea.io/"}>
          <p>Marketplace</p>
        </Link>
        <Link href={"/project/staking"}>
          <p>Stake</p>
        </Link>
      </div>

      <ConnectWallet
        className={styles.connectButton}
        theme={darkTheme({
          fontFamily: "Inter, sans-serif",
          colors: {
            modalBg: "#000000",
            accentText: "violet",
          },
        })}
        modalSize="wide"
        welcomeScreen={{
          title: "Portfolio Surge",
          subtitle: "Surfing the NFT Portfolio Revolution",
          img: {
            src: "https://mirror-media.imgix.net/publication-images/ScEiSBMPTy4Zxzqsa7iqk.png?h=600&w=600",
            width: 200,
            height: 200,
          },
        }}
        style={{fontWeight:"bold"}}
        modalTitle="Select your Wallet"
      />
    </div>
  );
}

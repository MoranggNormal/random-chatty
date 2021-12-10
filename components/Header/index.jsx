import Image from "next/image";
import Button from "../Button";
import styles from "./header.module.scss";

const Header = (props) => {
  const openMenu = () => {
    const sideBar = document.querySelector("aside");

    sideBar.style.display = "flex";
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={props.photo} alt={props.name} />
          <h1>Olá, {props.name}</h1>
        </div>

        <Button onClick={openMenu}>
          <Image
            alt="Close"
            src="https://cdn1.iconfinder.com/data/icons/feather-2/24/menu-256.png"
            width={25}
            height={25}
          />
        </Button>
      </header>
    </>
  );
};

export default Header;

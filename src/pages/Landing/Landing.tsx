import { LandingMenu } from "./components";
import styles from "./Landing.module.scss";
import { useModalController } from "../../hooks";

export const Landing = () => {
  const { openModal } = useModalController();
  return (
    <div className={`${styles.landing_container} ${openModal !== '' ? styles.hidden : ''}`}>
      <div className={styles.terminal_header}>
        <div className={styles.button_group}>
          <div className={styles.close_button} />
          <div className={styles.minimize_button} />
          <div className={styles.expand_button} />
        </div>
        <div>nvim</div>
        <div className={styles.terminal_keymap}>⌥⌘1</div>
      </div>
      <pre className={styles.ascii_banner}>
        {`    
  ██╗░░██╗██╗░░░  ██╗██╗███╗░░░███╗  ░░░░░██╗░█████╗░░█████╗░██╗░░██╗
  ██║░░██║██║░░░  ██║╚█║████╗░████║  ░░░░░██║██╔══██╗██╔══██╗██║░██╔╝
  ███████║██║░░░  ██║░╚╝██╔████╔██║  ░░░░░██║███████║██║░░╚═╝█████═╝░
  ██╔══██║██║██╗  ██║░░░██║╚██╔╝██║  ██╗░░██║██╔══██║██║░░██╗██╔═██╗░
  ██║░░██║██║╚█║  ██║░░░██║░╚═╝░██║  ╚█████╔╝██║░░██║╚█████╔╝██║░╚██╗
  ╚═╝░░╚═╝╚═╝░╚╝  ╚═╝░░░╚═╝░░░░░╚═╝  ░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
        `}
      </pre>
      <LandingMenu />
    </div>
  );
};

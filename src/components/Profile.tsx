import styles from "../styles/components/Profile.module.css";
import { ChallengesContexts} from "../contexts/ChallengesContexts";
import {useContext} from "react";

export function Profile() {
  const {level} = useContext(ChallengesContexts);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/EuKaique.png" alt="Kaique Oliveira Santos" />
      <div>
        <strong>Kaique Oliveira Santos</strong>
        <p><img src="icons/level.svg" alt=""/>level {level}</p>
      </div>
    </div>
  );
}

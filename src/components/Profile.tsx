import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/EuKaique.png" alt="Kaique Oliveira Santos" />
      <div>
        <strong>Kaique Oliveira Santos</strong>
        <p><img src="icons/level.svg" alt=""/> Level 1</p>
      </div>
    </div>
  );
}

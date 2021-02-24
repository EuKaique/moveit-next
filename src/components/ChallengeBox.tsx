import styles from "../styles/components/ChallengeBox.module.css"
import {useContext} from 'react'
import { ChallengesContexts } from "../contexts/ChallengesContexts";

export function ChallengeBox(){
    const {activeChallenge, resetChallenge} = useContext(ChallengesContexts)
    //const hasActiveChallenge = true;
    return(
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenge?(
                <div className={styles.ChallengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button className={styles.ChallengeFailedButton} onClick={resetChallenge} >Falhei</button>
                        <button className={styles.ChallengeSuccessButton} >Completei</button>
                    </footer>
                </div>
            ):(
                <div className={styles.ChallengeBoxNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    )
}
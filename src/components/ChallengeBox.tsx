import styles from "../styles/components/ChallengeBox.module.css"
import {useContext} from 'react'
import { ChallengesContexts } from "../contexts/ChallengesContexts";
import { CountDownContext } from "../contexts/CountDownContext";

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContexts);
    const {resetCountDown} = useContext( CountDownContext );
    function handleChallengeSuccess(){
        completeChallenge();
        resetCountDown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountDown();
    }

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
                        <button className={styles.ChallengeFailedButton} onClick={handleChallengeFailed} >Falhei</button>
                        <button className={styles.ChallengeSuccessButton} onClick={handleChallengeSuccess} >Completei</button>
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
import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body'| 'eye',
    description: string,
    amount: Number
}

interface ChallengesContextsData{
    level: Number,
    currentExperience: number,
    challengesCompleted: number,
    startNewChallenge: ()=>void,
    levelUp: ()=>void,
    resetChallenge: ()=>void,
    completeChallenge: ()=>void,
    activeChallenge: Challenge,
    experienceToNextLevel: number
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContexts = createContext({} as ChallengesContextsData)

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  function levelUp() {
    setLevel(level + 1);
  }
  function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge)

      new Audio('/notification.mp3').play();

      if(Notification.permission === 'granted'){
        new Notification('Novo desafio...',{
          body: `Valendo ${challenge.amount}xp!`
        })
      }
  }

  


  function resetChallenge(){
    setActiveChallenge(null)
  }
  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const {amount} = activeChallenge; 
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  return (
    <ChallengesContexts.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        resetChallenge,
        activeChallenge,
        experienceToNextLevel,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContexts.Provider>
  );
}

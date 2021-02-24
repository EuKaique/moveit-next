import { createContext, useState, ReactNode } from "react";
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body'| 'eye',
    description: string,
    amount: Number
}

interface ChallengesContextsData{
    level: Number,
    currentExperience: Number,
    challengesCompleted: Number,
    startNewChallenge: ()=>void,
    levelUp: ()=>void,
    resetChallenge: ()=>void,
    activeChallenge: Challenge,
    experienceToNextLevel: Number
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

  function levelUp() {
    setLevel(level + 1);
  }
  function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex]

      setActiveChallenge(challenge)
  }
  function resetChallenge(){
    setActiveChallenge(null)
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
        experienceToNextLevel
      }}
    >
      {children}
    </ChallengesContexts.Provider>
  );
}

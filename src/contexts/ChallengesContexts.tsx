import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import {LevelUpModal} from '../components/LevelUpModal';

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
    experienceToNextLevel: number,
    closeLevelUpModal: ()=>void
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContexts = createContext({} as ChallengesContextsData)

export function ChallengesProvider({ children, ...rest }) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4 , 2);

  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    
  },[level, currentExperience, challengesCompleted]);


  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
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
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContexts.Provider>
  );
}

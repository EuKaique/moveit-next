import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallengesContexts } from './ChallengesContexts';

interface CountDownContextData{
    minutes: Number,
        seconds: Number,
        hasFinished: boolean,
        isActive: boolean,
        startCountDown: ()=>void,
        resetCountDown: ()=>void;
}
interface CountDownProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData);
let countDownTimeOut: NodeJS.Timeout;

export function CountDownProvider({ children}: CountDownProviderProps){
    const {startNewChallenge}=useContext(ChallengesContexts)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
 
  function startCountDown() {
    setIsActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]);

    return(
    <CountDownContext.Provider value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown
    }}>
        {children}
    </CountDownContext.Provider>
    )
}
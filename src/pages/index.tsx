import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ChallengeBox } from "../components/ChallengeBox";
import  Head  from "next/head";
import styles from "../styles/pages/Home.module.css";
import { CountDownProvider } from "../contexts/CountDownContext";
import {GetServerSideProps} from 'next';
import {ChallengesProvider} from '../contexts/ChallengesContexts'

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>
      <ExperienceBar />

      <CountDownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) =>{
  //Chamada API
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
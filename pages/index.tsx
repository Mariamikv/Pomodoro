import Navbar  from '../components/Navbar';
import Timer from '../components/Timer';
import About from '../components/About';
import Head from 'next/head'
import ModelSettings from '../components/ModelSettings'
import React, { useEffect, useState, useRef } from 'react';
import internal from 'stream';
import Alarm from '../components/Alarm';

//import all components with layout which we didi in ecommerce app

export default function index() {

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const [stage, setStage] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [consumedSeconds, setConsumedSeconds] = useState(0);
  const [istimeUp, setIsTimeUp] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const alarmRef = useRef<any>(null);
	const pomodoroRef = useRef<any>(null);
	const shortBreakRef = useRef<any>(null);
	const longBreakRef = useRef<any>(null);

  const updateTimeDefaultValue = () => {
		setPomodoro(pomodoroRef.current?.value);
		setShortBreak(shortBreakRef.current?.value);
		setLongBreak(longBreakRef.current?.value);
		setOpenSetting(false);
		setSeconds(0);
		setConsumedSeconds(0);
	};

  const switchStage = (index: number) => {
    const isYes = consumedSeconds && stage !== index
     ? confirm("Are you sure you want to switch?")
     : false;
    if(isYes){
      reset();
      setStage(index);
    } else if(!consumedSeconds){
      setStage(index);
    }
  };

  const getTickingTime = () => {
		const timeStage = {
			0: pomodoro,
			1: shortBreak,
			2: longBreak,
		};
		return timeStage[stage as keyof typeof timeStage];
	};
 
  const updateMinute = () => {
    const updateStage = {
			0: setPomodoro,
			1: setShortBreak,
			2: setLongBreak,
		};
    return updateStage[stage as keyof typeof updateStage];
  }

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  const muteAlarm = () => {
    alarmRef.current?.pause();
    alarmRef.current.currentTime  = 0;
  };

  const reset = () => {
		setConsumedSeconds(0);
		setTicking(false);
		setSeconds(0);
		updateTimeDefaultValue();
	};

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    alarmRef.current?.play();
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinute = updateMinute();

    if(minutes === 0 && seconds === 0){
      timeUp();
    } else if(seconds === 0){
      setMinute((minute) => minute-1);
      setSeconds(59);
    }else {
      setSeconds((second) => second-1);
    }
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSeconds ? "Show warning" : null;
    }

    const timer = setInterval(() => {
        if(ticking){
          setConsumedSeconds(value => value+1)
          clockTicking();
        }    
      }, 1000);
      return () => {
        clearInterval(timer);
      };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <div className='bg-red-700 min-h-screen font-inter'>
      <Head>
        <title>Pomodoro</title>
      </Head>
        <div className='max-w-2xl min-h-screen mx-auto'>
          <Navbar setOpenSetting={setOpenSetting} />
          <Timer stage={stage} 
            switchStage={switchStage} 
            getTickingTime={getTickingTime}
            seconds={seconds}
            ticking={ticking}
            startTimer={startTimer}
            muteAlarm={muteAlarm}
            isTimeUp={istimeUp}
            reset={reset}
            />
          <About/>
          <Alarm ref={alarmRef}/>
          <ModelSettings
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            pomodoroRef={pomodoroRef}
            shortBreakRef={shortBreakRef}
            longBreakRef={longBreakRef}
            updateTimeDefaultValue={updateTimeDefaultValue} />
        </div>
    </div>
  );
}

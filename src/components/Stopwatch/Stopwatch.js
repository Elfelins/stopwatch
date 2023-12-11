import {useState, useEffect} from 'react';
import styles from './Stopwatch.module.scss';


const Stopwatch = () => {
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (timerRunning) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [timerRunning, startTime]);

    const startTimer = () => {
        setStartTime(Date.now() - elapsedTime);
        setTimerRunning(true);
    };

    const stopTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setElapsedTime(0);
        setTimerRunning(false);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor(time % 1000);
        return `${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(seconds)}.${millisecondsFormated(milliseconds)}`;
    };

    const leadingZero = (number) => {
        if (number < 10) {
            return `0${number}`;
        }
        return number;
    };
  
    const millisecondsFormated = (number) => {
        if (!timerRunning && number === 0) {
            return '0'; 
        }
        return number;     
    };   

    return (
        <div className={styles.container}>
            <div className={styles.timer}>{formatTime(elapsedTime)}</div>
            <div className={styles.buttons}>
                <button onClick={startTimer}>START</button>
                <button onClick={stopTimer}>STOP</button>
                <button onClick={resetTimer}>RESET</button>
            </div>
        </div>
    );
};

export default Stopwatch;
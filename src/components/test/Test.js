import './test-style.css';
import { useState, useEffect } from 'react';
import SideBar from '../SideBar';

var myinterval;
export default function Test() {

    const [input, setInput] = useState('');
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    let time = 0;
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerHours, setTimerHours] = useState('00');

    const [list, setList] = useState([]);

    const startTimer = () => {
        if (!isTimerOn) {
            setIsTimerOn(true);
            myinterval = setInterval(() => {
                incrementTimer(time + 1);
            }, 1000);
        } else {
            clearInterval(myinterval);
            myinterval = 0;
            setIsTimerOn(false);

            let obj = {
                input: input,
                hours: timerHours,
                minutes: timerMinutes,
                seconds: timerSeconds
            }
            let arr = [...list];
            arr.push(obj);
            setList(arr);
            setTimerHours('00');
            setTimerMinutes('00');
            setTimerSeconds('00');
            setInput('');
            time = 0;
        }
    }

    const incrementTimer = (val) => {
        time = val;
        setTotalTime(time);
    }

    useEffect(() => {
        console.log(totalTime)
        if (totalTime > 0) {
            if (totalTime < 10) {
                setTimerSeconds('0' + totalTime)
            } else if (totalTime >= 10 && totalTime < 60) {
                setTimerSeconds(totalTime);
            } else if (totalTime >= 60 && totalTime < 3600) {
                if (Math.floor(totalTime / 60 < 10)) {
                    setTimerMinutes('0' + Math.floor(totalTime / 60))
                } else {
                    setTimerMinutes(Math.floor(totalTime / 60))
                }
                if (totalTime % 60 < 10) {
                    setTimerSeconds('0' + totalTime % 60);
                } else if (totalTime % 60 >= 10 && totalTime % 60 < 60) {
                    setTimerSeconds(totalTime % 60);
                }
            }
        }
    }, [totalTime])

    return (
        <div className='main'>
            <div className='leftbar'>
                <SideBar />
            </div>
            <div className='wrapper'>
                <input value={input} placeholder='What are you working on?' className='searchbar' onChange={(e) => setInput(e.target.value)} />
                <span className='timer'>{timerHours}:{timerMinutes}:{timerSeconds}</span>
                <span className={!isTimerOn ? 'time-button-start' : 'time-button-stop'} onClick={() => startTimer()}>{!isTimerOn ? 'START' : 'STOP'}</span>
                <br />
                {list.length > 0 && list.map((item, index) => (
                    <div key={'list' + index} className='list'>
                        <input value={item.input} placeholder='What are you working on?' className='searchbar' onChange={(e) => setInput(e.target.value)} />
                        <span className='timer'>{item.hours}:{item.minutes}:{item.seconds}</span>
                        <span className={'time-button-stop'} onClick={() => {
                            let arr = [...list];
                            arr.splice(index);
                            setList(arr);
                        }}>{'DEL'}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
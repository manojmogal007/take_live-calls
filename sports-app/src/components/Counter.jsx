import axios from 'axios';
import {useEffect,useState} from 'react'
import { url } from './url';

export default function Counter({el,event}) {
//   const targetDate = new Date('2023-04-23T15:00:00'); // set your target date and time here
  const targetDate = new Date(`${event.date}T${event.starttime}:00`); // set your target date and time here
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
//   console.log(prop,'here')
const token=localStorage.getItem('token')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  function calculateTimeRemaining() {
    const currentTime = new Date();
    const difference = targetDate.getTime() - currentTime.getTime();

    if (difference <= 0) {
        // handleCountdownFinished()
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  function handleCountdownFinished() {
    // console.log('Countdown finished!');
    axios({
        method:'patch',
        url:`${url}/request/updatereq/${el._id}`,
        headers:{
            Authorization:token
        },
        data:{
            status:'expire'
        }
    })
    .then((res)=>{
        // console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })  }
  return (
    <div>
      {timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? (
        <div>Countdown finished!</div>
      ) : (
        <div>
          <div>{(timeRemaining.days*24)+timeRemaining.hours}: {timeRemaining.minutes}: {timeRemaining.seconds}</div>
          {/* <div>Hours: {timeRemaining.hours}</div>
          <div>Minutes: {timeRemaining.minutes}</div>
          <div>Seconds: {timeRemaining.seconds}</div> */}
          
        </div>
      )}
    </div>
  );
}

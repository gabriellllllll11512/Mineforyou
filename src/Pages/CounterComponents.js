import React, { useState, useEffect } from 'react'

const CounterComponents = (props) => {
    const [CounterValue, setCounterValue] = useState("");
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [day, setDay] = useState(0);
    const setTime = props.endDate;

    useEffect(() => {
        function counter() {
            timeBetweenDates(setTime);
            setCounterValue(CounterValue + 1);
        }

        function timeBetweenDates(toDate) {
            var now = new Date();

            var difference = setTime - parseInt(now.getTime() / 1000);
            if (difference <= 0) {
                // Timer done
                clearInterval();
            } else {
                var seconds = Math.floor(difference);
                var minutes = Math.floor(difference / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);

                hours %= 24;
                minutes %= 60;
                seconds %= 60;

                setSecond(seconds);
                setMinute(minutes);
                setHour(hours);
                setDay(days);
            }
        }
        setTimeout(() => {
            counter();
        }, 1000);
    }, [CounterValue]);


    return (
        <div>
            {!props.isEnded ? (
                <div className="timerdetils">
                    <div>
                        <span>{hour}:</span>
                    </div>
                    <div>
                        <span>{minute}:</span>
                    </div>
                    <div>
                        <span>{second}</span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between">
                </div>
            )}
        </div>
    )
}

export default CounterComponents

import crux_logo from "./assets/crux-logo-bw.png";
import montiko_logo from "./assets/montiko-logo-bw.png";
import wlb_logo from "./assets/wlb-logo-bw.png";
import './App.scss';
import React from 'react';
import {useState, useEffect} from 'react';

import biala_materia_logo from "./assets/biala-materia-logo-bw.png";
import deepspot_logo from "./assets/deepspot-logo-bw.png";
import fly_spot_logo from "./assets/fly-spot-logo-bw.png";
import varapo_logo from "./assets/varapo-logo-bw.png";
import dzast_climb_logo from "./assets/dzast-climb-logo-bw.jpeg";
import red_point_logo from "./assets/red-point-logo-bw.png";
import whiteoak_logo from "./assets/whiteoak-logo-bw.png";
import everberg_logo from "./assets/everberg-logo-bw.png";
import true_logo from "./assets/true-logo-bw.png";

const sponspors = [
  biala_materia_logo,
  deepspot_logo,
  fly_spot_logo,
  varapo_logo,
  dzast_climb_logo,
  red_point_logo,
  whiteoak_logo,
  everberg_logo,
  true_logo
];



function App() {
  const [runs, setRuns] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [initialTime, setInitialTime] = useState(4 *  60 * 1000);
  const [elapsedTime, setElapsedTime] = useState(4 * 60 * 1000);
  const [finish, setFinish] = useState(false);
  const [iniSeconds, setIniSeconds] = useState(Math.floor(initialTime / 1000) % 60);
  const [iniMinutes, setIniMinutes] = useState(Math.floor(initialTime / 1000 / 60));

  function startTimer() {
    setRuns(true);
    setFinish(false);
    setStartTime(Date.now() + elapsedTime - initialTime);
  }

  function stopTimer() {
    setRuns(false);
    setFinish(false);
  }

  function resetTimer() {
    setRuns(false);
    setFinish(false);
    setElapsedTime(initialTime);
  }

  function keyDownHandler(event) {
    switch (event.key) {
      case "s":
        if (!runs && finish) break;
        runs ? stopTimer() : startTimer();
        break;
      case "r":
        if (runs) break;
        resetTimer();
        break;
      case "f":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        break;
      case "1":
        if (runs) break;
        setInitialTime(1 * 60 * 1000);
        setIniMinutes(1);
        setIniSeconds(0);
        break;
      case "4":
        if (runs) break;
        setInitialTime(4 * 60 * 1000);
        setIniMinutes(4);
        setIniSeconds(0);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    resetTimer();
  }, [initialTime]);

  function formatTime(time) {
    let miliseconds = "" + Math.floor(time % 1000 / 10);
    let seconds = "" + Math.floor(time / 1000) % 60;
    let minutes = "" + Math.floor(time / 1000 / 60);
    miliseconds = miliseconds.length < 2 ? "0" + miliseconds : miliseconds;
    seconds = seconds.length < 2 ? "0" + seconds : seconds;
    minutes = minutes.length < 2 ? "0" + minutes : minutes;
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (runs) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = initialTime + startTime - currentTime;
        setElapsedTime(elapsedTime);
        if (elapsedTime <= 0) {
          setRuns(false);
          setFinish(true);
          setElapsedTime(0);
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    setInitialTime(iniMinutes * 60 * 1000 + iniSeconds * 1000);
  }
  , [iniMinutes, iniSeconds]);

  function sponsorWrapper(logo){
    return (
      <div className="logo">
        <img src={logo} className="Sponsor-Logo-img" alt="logo" />
      </div>
    );
  }

  return (
    <div className="app" onKeyDown={keyDownHandler} tabIndex="0">
          <div className="logo crux-logo">
            <img src={crux_logo} className="Crux-Logo-img" alt="logo" />
          </div>
          <div className="logo montiko-logo">
            <img src={montiko_logo} className="Montiko-Logo-img" alt="logo" />
          </div>
          <div className="logo wlb-logo">
            <img src={wlb_logo} className="WLB-Logo-img" alt="logo" />
          </div>
        <div className="timer-container">
          <div className={finish ? "timer-display blink_me" :"timer-display "}>{formatTime(elapsedTime)}</div>
        </div>
        <div className="sponsors">
          {sponspors.map(sponsorWrapper)}
        </div>
    </div>
  );
}

export default App;

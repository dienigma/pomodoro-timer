import React, { Component } from "react";
import { SetTimer } from "./components/SetTimer";
const audio = document.getElementById("beep");

export default class App extends Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    isPlaying: false,
  };
  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }
  handleBreakDecrease = () => {
    const { breakCount } = this.state;
    if (breakCount > 1) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };
  handleBreakIncrease = () => {
    const { breakCount } = this.state;
    if (breakCount < 60) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };

  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount > 0) {
      this.setState({
        sessionCount: sessionCount - 1,
        clockCount: (sessionCount - 1) * 60,
      });
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount < 60) {
      this.setState({
        sessionCount: sessionCount + 1,
        clockCount: (sessionCount + 1) * 60,
      });
    }
  };
  handlePlayPause = () => {
    const { isPlaying, breakCount, sessionCount } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({ isPlaying: false });
    } else {
      this.setState({ isPlaying: true });
      this.loop = setInterval(() => {
        const { clockCount, currentTimer } = this.state;
        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  };
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying,
    } = this.state;
    const breakProps = {
      title: "Break Length",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
      timerID: "break-label",
      incID: "break-increment",
      decID: "break-decrement",
      lenID: "break-length",
    };
    const sessionProps = {
      title: "Session Length",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
      timerID: "session-label",
      incID: "session-increment",
      decID: "session-decrement",
      lenID: "session-length",
    };
    return (
      <div>
        <div className="flex">
          <h1 className="heading">POMODORO</h1>
        </div>
        <div className="flex timer-section">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container timer-section">
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertToTime(clockCount)}</span>

          <div className="flex">
            <button onClick={this.handlePlayPause} id="start_stop">
              <i className={`fa ${!isPlaying ? "fa-play" : "fa-pause"}`} />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i class="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

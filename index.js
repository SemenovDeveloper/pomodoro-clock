class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      remainingTime: 1500,
      sessionType: true,
      timerOn: false,
      audio: new Audio("./src/beep.mp3")
    }
    this.timer = this.timer.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.breakLengthControl = this.breakLengthControl.bind(this);
    this.sessionLengthControl = this.sessionLengthControl.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio () {
    this.state.audio.currentTime = 0;
    this.state.audio.play()
  }

  timer() {
    const remainingTime = this.state.remainingTime;
  if(remainingTime > 0){
    this.setState({
      remainingTime: this.state.remainingTime - 1
    })
   } else {
    this.playAudio();
    this.setState({
      remainingTime: this.state.sessionType ? this.state.breakLength * 60 : this.state.sessionLength * 60,
      sessionType: !this.state.sessionType
    })
   }
  };

  controlTimer() {
    const second = 1000;
    const timerOn = this.state.timerOn;
    if(!timerOn ){
      const startTimer = setInterval(this.timer, second);
      this.setState({
        timerOn: !timerOn 
      })
      localStorage.clear();
      localStorage.setItem('startTimer', startTimer);
    } else {
      const startTimer = localStorage.getItem('startTimer');
      clearInterval(startTimer);
      this.setState({
        timerOn: !timerOn 
      })
    }
  }

  reset() {
    const startTimer = localStorage.getItem('startTimer');
    clearInterval(startTimer);
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      remainingTime: 1500,
      sessionType: true,
      timerOn: false
    })
  }

  breakLengthControl (e) {
    if (this.state.timerOn) {
      return
    } else {
      const breakLength = this.state.breakLength;
      if(e.target.value === "+" && breakLength < 60){
        this.setState({
          breakLength: breakLength + 1,
          remainingTime: !this.state.sessionType ? (breakLength + 1)*60 : this.state.remainingTime 

        })        
      } else if (e.target.value === "-" && breakLength >1) {
        this.setState({
          breakLength: breakLength - 1,
          remainingTime: !this.state.sessionType ? (breakLength - 1)*60 : this.state.remainingTime
        })   
      }
    }
  }

  sessionLengthControl (e) {
    if (this.state.timerOn) {
      return
    } else {
      const sessionLength = this.state.sessionLength;
      if(e.target.value === "+" && sessionLength < 60){
        this.setState({
          sessionLength: sessionLength + 1,
          remainingTime: this.state.sessionType ? (sessionLength + 1)*60 : this.state.remainingTime 
        })    
      } else if (e.target.value === "-" && sessionLength > 1){
        this.setState({
          sessionLength: sessionLength -1,
          remainingTime: this.state.sessionType ? (sessionLength - 1)*60 : this.state.remainingTime 
        })   
      }
    }
  }

  convertTime(value) {
    let seconds = value % 60;
    let minutes = Math.floor(value/60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes <10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds
  }

  render() {
    return (
      <div>
        <h1 className="header">25+5 Clock</h1>
        <h3>{this.state.sessionType ? "Session" : "Break"}</h3>
        <div id="">{this.convertTime(this.state.remainingTime)}</div>
        <button ib="timer-toggler" onClick={this.controlTimer}>
          Play/Stop
        </button>
        <button id="reset" onClick={this.reset}>Reset</button>  
        <Length 
          title={"Break length"}
          id={"break-label"} 
          length={this.state.breakLength}          
          lengthControl={this.breakLengthControl}
          convertTime={this.convertTime}
        />
        <Length 
          title={"Session length"} 
          id={"session-label"} 
          length={this.state.sessionLength}
          lengthControl={this.sessionLengthControl}
        />
      </div>
    )
  }
}

function Length({title, id, length, lengthControl}) {  
  return (
     <div>
      <h2 id={id}>{title}</h2>
      <div>{length < 10 ?  "0" + length + ":" + "00" : length + ":" + "00" }
      </div>
      <button className="decrement" onClick={lengthControl} value="+">+</button>
      <button className="decrement" onClick={lengthControl} value="-">-</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
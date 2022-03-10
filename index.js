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
      <div id="wrapper">
        <h1 className="header">25+5 Clock</h1>
        <div id="timer">                   
            <a>{this.state.sessionType ? "Session" : "Break"}</a>
          <div id="display-time">
            <a id="time-left">{this.convertTime(this.state.remainingTime)}</a>
            <div>
            <button ib="play-stop" className="control-buttons" onClick={this.controlTimer}>
              {this.state.timerOn ? "STOP" : "START"}
            </button>
            <button id="reset" className="control-buttons" onClick={this.reset}>RESET</button>
            </div> 
          </div>
        </div> 
        <div id="length-control">
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
        <div className="footer">
          <a 
            id="footer" 
            target="_blank" 
            href="https://github.com/SemenovDeveloper"
          >
            <i className="fab fa-github-square"></i>
            by SemenovDeveloper
          </a>
        </div>            
      </div>
    )
  }
}

function Length({title, id, length, lengthControl}) {  
  return (
     <div className="length-container">
      <h3 className="length-title">{title}</h3>
      <div className="length-display">
        {length < 10 ?  "0" + length + ":" + "00" : length + ":" + "00" }
      </div>
      <div className="length-buttons-wrapper">
        <button 
          className="increment length-buttons" 
          onClick={lengthControl} 
          value="+"
        >
          +
        </button>
        <button 
          className="decrement length-buttons" 
          onClick={lengthControl} 
          value="-"
        >
          -
        </button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
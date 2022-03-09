class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      remainingTime: 1500,
      timerOn: false
    }
    this.timer = this.timer.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.breakLengthControl = this.breakLengthControl.bind(this);
    this.sessionLengthControl = this.sessionLengthControl.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  timer() {
    this.setState({
      remainingTime: this.state.remainingTime - 1
    })
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
      timerOn: false
    })
  }

  breakLengthControl (e) {
    const breakLength = this.state.breakLength;
    if(e.target.value === "+"){
      this.setState({
        breakLength: breakLength < 30 ? breakLength + 1 : breakLength
      })    
    } else {
      this.setState({
        breakLength: breakLength > 0 ? breakLength -1 : breakLength
      })   
    }
  }

  sessionLengthControl (e) {
    const sessionLength = this.state.sessionLength;
    if(e.target.value === "+"){
      this.setState({
        sessionLength: sessionLength < 99 ? sessionLength + 1 : sessionLength
      })    
    } else {
      this.setState({
        sessionLength: sessionLength > 0 ? sessionLength -1 : sessionLength
      })   
    }
  }


  convertTime(value) {
    const seconds = value % 60;
    const minutes = Math.floor(value/60);
    return minutes + ":" + seconds
  }

  render() {
    return (
      <div>
        <h1 className="header">Pomodoro Clock</h1>
        <div id="timer">{this.state.remainingTime}</div>
        <div>{this.convertTime(this.state.remainingTime)}</div>
        <button ib="timer-toggler" onClick={this.controlTimer}>
          Play/Stop
        </button>
        <button id="reset" onClick={this.reset}>Reset</button>  
        <Length 
          title={"Break length"} 
          length={this.state.breakLength}          
          lengthControl={this.breakLengthControl}
          convertTime={this.convertTime}
        />
        <Length 
          title={"Session length"} 
          length={this.state.sessionLength}
          lengthControl={this.sessionLengthControl}
        />       
      </div>
    )
  }
}

function Length({title, length, lengthControl}) {
  
  return (
     <div>
      <h2>{title}</h2>
      <div>{length < 10 ?  "0" + length + ":" + "00" : length + ":" + "00" }
      </div>
      <button onClick={lengthControl} value="+">+</button>
      <button onClick={lengthControl} value="-">-</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
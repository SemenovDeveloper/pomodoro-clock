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
      sessionLength: 1500,
      breakLength: 300,
      remainingTime: 1500,
      timerOn: false
    })
  }

  breakLengthControl (e) {
    this.setState({
      breakLength: 
        e.target.value === "+"
        ? this.state.breakLength + 1
        : this.state.breakLength - 1
    })
  }

  sessionLengthControl (e) {
    this.setState({
      sessionLength: 
        e.target.value === "+"
        ? this.state.sessionLength + 1
        : this.state.sessionLength - 1
    })
  }

  convertTime (value) {
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
  console.log(length.length)
  return (
     <div>
      <h2>{title}</h2>
      <div>{length < 10 ?  "0" + length + ":" + "00" : length + ":" + "00" }</div>
      <button onClick={lengthControl} value="+">+</button>
      <button onClick={lengthControl} value="-">-</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
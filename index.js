class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sessionLength: 1500,
      breakLength: 300,
      remainingTime: 1500,
      timerOn: false
    }
    this.timer = this.timer.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.reset=this.reset.bind(this);
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
  
  render() {
    return (
      <div>
        <h1 className="header">Pomodoro Clock</h1>
        <div id="timer">{this.state.remainingTime}</div>
        <button ib="timer-toggler" onClick={this.controlTimer}>
          Play/Stop
        </button>
        <button id="reset" onClick={this.reset}>Reset</button>  
        <Length title={"Break length"} length={this.state.breakLength}/>
        <Length title={"Session length"} />
      </div>
    )
  }
}

function Length({title, length}) {
  return (
    <div>{title}</div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
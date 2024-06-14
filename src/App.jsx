import axios from "axios";
import React from "react";

class App extends React.Component {

  state = {advice : ''}

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const advice = response.data.slip.advice
        this.setState({ advice })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  readAdvice = () => {
    const text = this.state.advice
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }

  render() {
    const {advice} = this.state
    return (
      <div className="app">
        <div className="card">
          <h1 className="heading"><q>{advice}</q></h1>

          <button className="button" onClick={this.fetchAdvice}>
            <span>GIVE ME ADVICE!</span>
          </button>

          <button className="button" onClick={this.readAdvice}>
            S
          </button>
        </div>
      </div>
    )
  }
}

export default App
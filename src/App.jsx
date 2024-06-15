import axios from "axios";
import React from "react";
import Speacker from "./assets/Speacker";
import Copy from "./assets/Copy";
import Done from "./assets/Done";

class App extends React.Component {

  state = {advice : '' , copied: false , isLoading: false}

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = async () => {
    this.setState({isLoading: true})
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const advice = response.data.slip.advice;
      this.setState({ advice });
    } catch (error) {
      console.log(error);
    }
  
    this.setState({ copied: false , isLoading: false });
  }

  readAdvice = () => {
    const text = this.state.advice
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }

  copyAdvice = () => {
    navigator.clipboard.writeText(this.state.advice);
    this.setState({ copied : true })
  }

  render() {
    const {advice , copied , isLoading} = this.state
    return (
      <div className="app">

        <div className="card">
          <h1 className="heading">
            {isLoading ? <>Loading...</> : <q>{advice}</q>}
          </h1>

          
          <button className="button" onClick={this.fetchAdvice}>
            <span>GIVE ME ADVICE!</span>
          </button>

          <button style={{display : isLoading && "none"}} className="read_button" onClick={this.readAdvice}>
            <Speacker/>
          </button>

          <button style={{display : isLoading && "none"}} className="copy_button" onClick={this.copyAdvice}>
              {copied ? <Done/> : <Copy/>}
            </button>

        </div>
      </div>
    )
  }
}

export default App
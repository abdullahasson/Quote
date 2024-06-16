import axios from "axios";
import React from "react";
import Loader from "./components/loaders/Loader";
import Speacker from "./assets/Speacker";
import Copy from "./assets/Copy";
import Done from "./assets/Done";
import Save from "./assets/Save"
import Saved from "./assets/Saved"


class App extends React.Component {

  state = {advice : '', adviceID: '' ,  copied: false , isLoading: false , isSaved: false}

  componentDidMount() {
    this.fetchAdvice();
  }

  checkSaved = (parm) => {
    window.localStorage.getItem(parm) ? true : false
  }

  fetchAdvice = async () => {
    this.setState({isLoading: true})
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const advice = response.data.slip.advice;
      const id = response.data.slip.id
      this.setState({ advice , adviceID : id});

      this.checkSaved(id) ? this.setState({ isSaved : true }) : this.setState({ isSaved : false })

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

  saveAdvice = () => {

    const key = this.state.adviceID
    const value = this.state.advice

    this.checkSaved(key) ? 
      this.setState({ isSaved : true}) :
      window.localStorage.setItem(key , value)
      this.setState({ isSaved : true})

  }

  render() {
    const {advice , copied , isLoading , isSaved } = this.state
    return (
      <div className="app">

        <div className="card">
          <h1 className="heading">
            {isLoading ? <Loader/> : <q>{advice}</q>}
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

          <button style={{display : isLoading && "none"}} className="save_button" onClick={this.saveAdvice}>
              {isSaved ? <Saved/> : <Save/>}
          </button>
        </div>
      </div>
    )
  }
}

export default App
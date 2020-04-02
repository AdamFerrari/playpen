import React from 'react';
import './App.css';

class Message extends React.Component {
  render() {
    return (
      <div className="Message">
          <p> Message {this.props.did}: {this.props.content}! </p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages:[]}
  }

  componentDidMount() {
    fetch("http://localhost:3002/messages",
       { headers: { 'Content-Type': 'application/json'} }
    )
    .then(response => response.json())
    .then(
      (data) => {
        this.setState({ messages: data });
        },
      (error) => {
          this.setState({ error });
        }
     )
  }

  render() {
    if(this.state.messages) {
      return this.state.messages.map( (message) => (
        <Message key={message.did} did={message.did} content={message.content}/>
      ) );
    }
  }
}

export default App;

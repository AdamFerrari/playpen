import React from 'react';
import './App.css';

class Message extends React.Component {
  render() {
    return (
      <div className="Message">
          <p> Message {this.props.did}: {this.props.content}</p>
      </div>
    );
  }
}

class CreateMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    /* alert('A message was submitted: ' + this.state.value); */
    if(this.state.value) {
      let content = this.state.value;
      let user_id = 'adam';
      let body = { user_id: user_id, content: content };
      fetch("http://localhost:3002/messages/create",
       { 
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(body)
       }
      )
      .then(response => response.text())
      .then(
        (data) => {
          this.setState({ value: '' });
          },
        (error) => {
          this.setState({ error });
        }
      )
      event.preventDefault();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New Message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
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
      return (
        <div className="App">
          <CreateMessageForm />
          { this.state.messages.map( (message) => (<Message key={message.did} did={message.did} content={message.content}/>) ) }
        </div>
      );
    }
  }
}

export default App;

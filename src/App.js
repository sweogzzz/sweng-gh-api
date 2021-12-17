import React from 'react';
import axios from 'axios';

class App extends React.Component {
  submitHandle(e) {
    e.preventDefault();

    // github personal token
    const token = '';

    this.setState({
      repo:'',
      lans:'',
      cons:'',
      coms:''
    })

    var q = e.target.query.value;
    if(!(/[a-zA-Z0-9]*\/[a-zA-Z0-9]*/.test(q))) return;
    
    axios.get('https://api.github.com/repos/'+q,
    {headers:{'Authorization':`token ${token}`}})
    .then(response => this.setState({repo:response.data}))
    .catch((err) => {console.log(err)});
  }
  componentDidMount() {
    document.title = "Metrics"
  }
  constructor(args) {
    super(args);
    this.state = {
      repo:'',
      lans:'',
      cons:'',
      coms:''
    }
    this.submitHandle = this.submitHandle.bind(this);
  }
  render() {
    return (
      <div>
        <h1>GitHub Metrics</h1>
        <form onSubmit={this.submitHandle}>
          <label>
            <input
              name="query"
              type="text"
              placeholder="user/repo"
              required
            />
          </label>
          <br></br>
          <input
            type="submit"
            value="Fetch"
          />
        </form>
      </div>
    )
  }
}

export default App;

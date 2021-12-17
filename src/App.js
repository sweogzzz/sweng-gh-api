import React from 'react';
import axios from 'axios';

class App extends React.Component {
  submitHandle(e) {
    e.preventDefault();

    // github personal token
    const token = process.env.REACT_APP_SECRET;

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

    axios.get('https://api.github.com/repos/'+q+'/languages',
    {headers:{'Authorization':`token ${token}`}})
    .then(response => this.setState({lans:response.data}))
    .catch((err) => {console.log(err)});

    axios.get('https://api.github.com/repos/'+q+'/contributors',
    {headers:{'Authorization':`token ${token}`}})
    .then(response => this.setState({cons:response.data}))
    .catch((err) => {console.log(err)});

    axios.get('https://api.github.com/repos/'+q+'/commits',
    {headers:{'Authorization':`token ${token}`}})
    .then(response => this.setState({coms:response.data}))
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
    var coms1 = [];
    var coms2 = [];
    for (i in this.state.coms) {
      a = this.state.coms[i].commit.author.date;
      b = new Date(a.substring(0,10));
      coms1.push(b.getTime());
    }
    for (i in coms1) {
      if (coms2[i]) coms2[i] += 1;
      else coms2[i] = 1;
    }
    coms1 = [...new Set(coms1)].sort()
    var coms3 = coms1.map(a => coms2[a]);
    var coms4 = coms3.map((a => b => a+=b)(0));
    var comsf = {
      labels: coms1,
      datasets: [{
        label: 'total commits',
        data: coms3,
        borderWidth: 1
      },{
        label: 'new commits',
        data: coms4,
        borderWidth: 1
      }]
    }
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
        <h2>{ 
          this.state.repo?
          this.state.repo.name : ''
        }</h2>
        <h3>{ 
          this.state.repo?
          this.state.repo.owner.login : ''
        }</h3>
      </div>
    )
  }
}

export default App;

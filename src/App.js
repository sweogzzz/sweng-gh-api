import React from 'react';
import axios from 'axios';

class App extends React.Component {
  submitHandle(e) {
    e.preventDefault();

    // github personal token
    const token = process.env.REACT_APP_SECRET;

    this.setState({
      repo: '',
      lans: '',
      cons: '',
      coms: ''
    })

    var q = e.target.query.value;
    if (!(/[a-zA-Z0-9]*\/[a-zA-Z0-9]*/.test(q))) return;

    axios.get('https://api.github.com/repos/' + q,
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ repo: response.data }))
      .catch((err) => { console.log(err) });

    axios.get('https://api.github.com/repos/' + q + '/languages',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ lans: response.data }))
      .catch((err) => { console.log(err) });

    axios.get('https://api.github.com/repos/' + q + '/contributors',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ cons: response.data }))
      .catch((err) => { console.log(err) });

    axios.get('https://api.github.com/repos/' + q + '/commits',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ coms: response.data }))
      .catch((err) => { console.log(err) });
  }
  componentDidMount() {
    document.title = "Metrics"
  }
  constructor(args) {
    super(args);
    this.state = {
      repo: '',
      lans: '',
      cons: '',
      coms: ''
    }
    this.submitHandle = this.submitHandle.bind(this);
  }
  render() {
    var coms1 = [];
    var coms2 = [];
    for (i in this.state.coms) {
      a = this.state.coms[i].commit.author.date;
      b = new Date(a.substring(0, 10));
      coms1.push(b.getTime());
    }
    for (i in coms1) {
      if (coms2[i]) coms2[i] += 1;
      else coms2[i] = 1;
    }
    coms1 = [...new Set(coms1)].sort()
    var coms3 = coms1.map(a => coms2[a]);
    var coms4 = coms3.map((a => b => a += b)(0));
    var comsf = {
      labels: coms1,
      datasets: [{
        label: 'total commits',
        data: coms3,
        borderWidth: 1
      }, {
        label: 'new commits',
        data: coms4,
        borderWidth: 1
      }]
    }
    var lans1 = Object.keys(this.state.lans);
    var lans2 = Object.values(this.state.lans);
    lans1.length = lans1.length > 10 ? 10 : lans1.length;
    lans2.length = lans2.length > 10 ? 10 : lans2.length;
    lans2 = lans2.map(a => parseInt(a));
    var lansf = {
      labels: lans1,
      datasets: [{
        label: '% of code',
        data: lans2.map(a => a * 100 / (lans2.reduce((a, b) => a + b, 0))),
        backgroundColor: ['#f72585', '#b5179e', '#7209b7', '#560bad',
          '#480ca8', '3a0ca3', '#3f37c9', '#3f37c9', '#4361ee', '#4cc9f0']
      }]
    }
    var cons1 = [];
    var cons2 = [];
    var cons3 = 0;
    for (i in this.state.cons) {
      cons1.push(this.state.cons[i].login);
      cons2.push(this.state.cons[i].contributions);
      if (cons3++ >= 10) break;
    }
    cons2 = cons2.map(a => parseInt(a));
    var consf = {
      labels: cons1,
      data: cons2.map(a => a * 100 / (cons2.reduce((a, b) => a + b, 0))),
      borderWidth: 1,
      backgroundColor: ['#001219', '#005f73', '#0a9396', '#94d2bd',
        '#e9d8a6', 'ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']
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
          this.state.repo ?
            this.state.repo.name : ''
        }</h2>
        <h3>{
          this.state.repo ?
            this.state.repo.owner.login : ''
        }</h3>
      </div>
    )
  }
}

export default App;

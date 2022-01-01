import React, { Component } from 'react';
import GitHub from 'github-api';
import {Octokit} from '@octokit/rest';
import axios from 'axios';
import 'date-fns';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  TimeScale
} from 'chart.js';
import { Doughnut, Line, Radar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  TimeScale
);

class App extends Component {
  submitHandler(e) {
    e.preventDefault();
    const token = process.env.REACT_APP_SECRET;

    const gh = new GitHub({
      token: token
    });

    const ok = new Octokit({
      auth: token
    })

    this.setState({
      repo: '',
      lans: '',
      cons: '',
      coms: '',
      comsh: '',
      name: '',
      commitAuthors: [],
      commits: [],
      datesUsed: false
    });

    var date1 = e.target.date1.value;
    var date2 = e.target.date2.value;

    var q = e.target.query.value;
    if (!(/[a-zA-Z0-9][a-zA-Z0-9-]{0,38}[a-zA-Z0-9]\/[a-zA-Z0-9-_]{0,100}/.test(q))) {
      console.log(toString(q).match(/[a-zA-Z0-9][a-zA-Z0-9-]{0,38}[a-zA-Z0-9]\/[a-zA-Z0-9-_]{0,100}/));
      return;
    }
    //this.setState({name:q.split('/')[0]})

    let test = this;

    var qarr = q.split('/');

    gh.getUser(qarr[0])
    .getProfile(function(err,out) {
      test.setState({name:out['name']})
    })

    axios.get('https://api.github.com/repos/' + q,
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ repo: response.data }))
      .catch((err) => { console.log(err) });

    /*axios.get('https://api.github.com/repos/' + q + '/languages',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ lans: response.data }))
      .catch((err) => { console.log(err) });
    axios.get('https://api.github.com/repos/' + q + '/contributors',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ cons: response.data }))
      .catch((err) => { console.log(err) });*/

    /*axios.get('https://api.github.com/repos/' + q + '/commits',
      { headers: { 'Authorization': `token ${token}` } })
      .then(response => this.setState({ coms: response.data,
        comsh: response.headers }))
      .catch((err) => { console.log(err) });*/

    /*gh.getRepo(qarr[0],qarr[1])
    .getContributors(function(err,out) {
      test.setState({cons:out})
    })
    var therepo = gh.getRepo(qarr[0],qarr[1]);
    therepo.getContributors(function(err,out) {
      test.setState({cons:out})
    })
    therepo.listCommits({state:'all',since:'1/1/2000',until:'1/1/2021'},function(err,out) {
      test.setState({coms:out})
    })*/

    ok.rest.repos.listCommits({
      owner: qarr[0],
      repo: qarr[1],
      per_page: 100,
      page: 2
    }).then(response => this.setState({coms:response.data}))
    if (!(date1 === '' || date2 === '')) {
      this.setState({datesUsed:true})
      ok.paginate('GET /repos/{owner}/{repo}/commits',
        {owner:qarr[0],repo:qarr[1],per_page:100,since:date1,until:date2},
        (response) => response.data.map((commit) => [commit.commit.author.name, commit.commit.author.date])
      ).then((commitAuthors) => {
        this.setState({commitAuthors:commitAuthors});
      })
    } else {
      this.setState({datesUsed:false})
      ok.request('GET /repos/{owner}/{repo}/commits',
        {owner:qarr[0],repo:qarr[1],per_page:100}
      ).then((response) => {
        this.setState({commitAuthors:response.data.map((commit) => [commit.commit.author.name, commit.commit.author.date])});
      })
    }
    /*ok.paginate('GET /repos/{owner}/{repo}/commits', {
      owner: qarr[0],
      repo: qarr[1],
      per_page: 100
    }).then((commits) => {
      console.log(commits)
    })*/
    /*ok.paginate('GET /repos/{owner}/{repo}/commits',
      { owner: qarr[0], repo: qarr[1], per_page: 100},
      (response) => response.data.map((commit) => commit.author)
    ).then((commitAuthors) => {
      console.log(commitAuthors);
    })*/
    /*ok.request('GET /repos/{owner}/{repo}/commits',
      { owner: qarr[0], repo: qarr[1], per_page: 100}
    ).then((commits) => {
      var commits2 = [];
      for (var c2wh of commits) {
        commits2.push([commits[c2wh]['commit']['author']['date'],c2wh]);
      }
      this.setState({commits:commits2})
    })*/
    ok.rest.repos.listLanguages({
      owner: qarr[0],
      repo: qarr[1]
    }).then(response => this.setState({lans:response.data}))
    ok.rest.repos.listContributors({
      owner: qarr[0],
      repo: qarr[1],
      per_page: 100,
      page: 1
    }).then(response => this.setState({cons:response.data}))
  }
  componentDidMount() {
    document.title = "Metrics"
  }
  constructor(props) {
    super(props);
    this.state = {
      repo: '',
      lans: '',
      cons: '',
      coms: '',
      name: ''
    }
    this.submitHandler = this.submitHandler.bind(this);
  }
  render() {

    var forks = parseInt(this.state.repo.forks);
    forks = forks > 100 ? 5 : forks > 50 ? 4 : forks > 25 ? 3 : forks > 10 ? 2 : forks > 5 ? 1 : 1;
    var issues = parseInt(this.state.repo.open_issues);
    issues = issues > 100 ? 5 : issues > 10 ? 4 : issues > 5 ? 3 : issues > 2 ? 2 : issues > 1 ? 1 : 1;
    var watching = parseInt(this.state.repo.watchers);
    watching = watching > 10 ? 5 : watching > 5 ? 4 : watching > 3 ? 2 : watching > 1 ? 1 : 1
    var size = parseInt(this.state.repo.size);
    size = size > 100000 ? 5 : size > 40000 ? 4 : size > 4000 ? 3 : size > 300 ? 2 : size > 100 ? 1 : 1;

    var comsd = [];
    var comsn = {};
    for (var i in this.state.commitAuthors) {
      comsd.push((new Date(this.state.commitAuthors[i][1])).getTime());
    }
    comsd.sort();
    for (let e of comsd) {
      if (comsn[e]) comsn[e] += 1
      else comsn[e] = 1;
    }
    comsd = [...new Set(comsd)];
    var comsv = comsd.map(a => comsn[a]);
    var comsv2 = comsv.map((a => b => a += b)(0));
    var comsdata = {
      labels: comsd,
      datasets: [{
        label: '',
        data: comsv2,
        fill: true,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
        tension:0.6
      }]
    }

    var langsnm = Object.keys(this.state.lans);
    var langspop = Object.values(this.state.lans);
    langspop = langspop.map(a => parseInt(a));
    langsnm.length = langsnm.length > 10 ? 10 : langsnm.length;
    langspop.length = langspop.length > 10 ? 10 : langspop.length;
    if (langsnm.length === 0) {
      langsnm = ['unidentified']
      langspop = [100]
    }
    var langsdata = {
      labels: langsnm,
      datasets: [{
        label: '% of code',
        data: langspop.map(a => a * 100 / (langspop.reduce((a, b) => a + b, 0))),
        backgroundColor: ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '3a0ca3', '#3f37c9', '#3f37c9', '#4361ee', '#4cc9f0']
      }]
    }

    var teammems = [];
    var teamctrb = [];
    var teamcnt = 0;
    for (i in this.state.cons) {
      teammems.push(this.state.cons[i].login);
      teamctrb.push(this.state.cons[i].contributions);
      teamcnt++;
      if (teamcnt >= 10) break;
    }
    teamctrb = teamctrb.map(a => parseInt(a));
    if (teamcnt === 0) {
      teamctrb = [100]
      teammems = [this.state.name]
    }
    var teamdata = {
      labels: teammems,
      datasets: [{
        label: '% contrib',
        data: teamctrb.map(a => a * 100 / (teamctrb.reduce((a, b) => a + b, 0))),
        borderWidth: 1,
        backgroundColor: ['#001219', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', 'ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']
      }]
    }

    var teamctrb2 = teamctrb.reduce((a, b) => a + b, 0);
    teamctrb2 = teamctrb2 > 200 ? 5 : teamctrb2 > 150 ? 4 : teamctrb2 > 100 ? 3 : teamctrb2 > 10 ? 2 : teamctrb2 > 0 ? 1 : 1

    var rdata = {
      labels: ['forks', 'issues', 'watching', 'size', 'commits'],
      datasets: [{
        label: 'this repo',
        data: [forks, issues, watching, size, teamctrb2],
        backgroundColor: 'red',
        borderColor: 'red'
      }]
    }

    var dc = []
    for (var dac in this.state.commitAuthors) {
      dc.push([])
    }
    var dcd = [...new Set(dc)].sort()
    var dco = dcd.map(d => 0)
    for (var dcjg in dc) {
      for (var dck in dcd) {
        if (dcd[dck] === dc[dcjg]) {
          dco[dck] += 1;
        }
      }
    }
    for (var dcwh in dcd) {
      dcd[dcwh] = new Date(dcd[dck]).getTime();
    }

    var dcdata = {
      labels: dcd,
      datasets: [{
        label: '',
        data: dco,
        fill: true,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
        tension:0.6
      }]
    }

    var ud = this.state.datesUsed;

    return (
      <div>
        <h1>GitHub API</h1>
        <br></br>

        <form onSubmit={this.submitHandler}>
          <label>
            <label>Repo : </label>
            <input
              name="query"
              type="text"
              placeholder="user/repo"
              required
            />
          </label>
          <br></br>
          <br></br>
          <p id="frame">
            Beware loading times when inputting range.
          </p>
          <br></br>
          <label>
            <label>Since : </label>
            <input
              name="date1"
              type="datetime-local"
            />
          </label>
          <br></br>
          <label>
            <label>Until : </label>
            <input
              name="date2"
              type="datetime-local"
            />
          </label>
          <br></br>
          <br></br>
          <div>
            <input
              type="submit"
              value="Fetch"
            />
          </div>
        </form>
        <br></br>
        <h4>Owner: {this.state.repo?this.state.name:'n/a'}</h4>
        <img width="100" src={this.state.repo ? this.state.repo.owner.avatar_url : null} alt="avatar.png" />
        <div>
          <h5>
            Repository stats
          </h5>
          <p>
            Rates various attributes
          </p>
          <div id="frame">
            {this.state.repo? <Radar
              data={rdata}
              options={{
                maintainAspectRatio: false,
                reponsive: false,
                plugins: {
                  title: {
                    display: false
                  },
                  legend: {
                    display: false
                  }
                },
                scale: {
                  ticks: {
                    stepSize: 1
                  },
                  min:0,
                  max:5
                }
              }}
              height={200}
            /> : 'Stats not found' }
          </div>
          <h5>
            {ud?'Commits':'Recent commits'}
          </h5>
          <div id="frame">
            {this.state.commitAuthors? <Line
              data={comsdata}
              options={{
                elements: {
                  point: {
                    radius: 0
                  }
                },
                plugins: {
                  title: {
                    display: false
                  },
                  legend: {
                    display: false
                  }
                },
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: {
                    title: {
                      display:true
                    },
                    type: 'time',
                    time: {
                      unit: ''
                    }
                  },
                  y: {
                    title: {
                      display: true
                    }
                  }
                }
              }}
            /> : 'No commits found'}
          </div>
          <h5>
            Commits daily
          </h5>
          <div id="frame">
            {this.state.commitAuthors? <Line
              data={dcdata}
              options={{
                elements: {
                  point: {
                    radius: 0
                  }
                },
                plugins: {
                  title: {
                    display: false
                  },
                  legend: {
                    display: false
                  }
                },
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: {
                    title: {
                      display:true
                    },
                    type: 'time',
                    time: {
                      unit: ''
                    }
                  },
                  y: {
                    title: {
                      display: true
                    }
                  }
                }
              }}
            /> : 'No commits found'}
          </div>
          <h5>
            Contributors to repo
          </h5>
          <p>
            Distribution of commits by user
          </p>
          <div id="frame">
            {this.state.cons? <Doughnut
              data={teamdata}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: { display: false },
                  legend: { display: true, position: 'bottom' }
                },
                elements: {
                  arc: {
                    borderWidth: 0
                  }
                }
              }}
              height={240}
            /> : 'No contributions found'}
          </div>
          <h5>
            Languages used in repo
          </h5>
          <div id="frame">
            {this.state.lans? <Doughnut
              data={langsdata}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: { display: false },
                  legend: { display: true, position: 'bottom' }
                },
                elements: {
                  arc: {
                    borderWidth: 0
                  }
                }
              }}
              height={240}
            /> : 'No languages identified'}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
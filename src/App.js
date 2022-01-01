import React, { Component } from 'react';
import {Octokit} from '@octokit/rest';
//import GitHub from 'github-api';
//import axios from 'axios'
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
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
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

    const ok = new Octokit({
      auth: token
    })

    /*const gh = new GitHub({
      username: un
      password: pw/token
      /token: token
    })

    var me = gh.getUser();
    var owen = gh.getUser('sweogzzz');

    var repo = gh.getRepo(user, repo)
    .listCommits(function(err,repo) {
      this.setState({repo:repo})
    })
    */

    /*
    axios.get('api.github.com/users/{user}')
    .then(function (response) {
      this.setState({repo:response.data})
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
      console.log('thunderbirds')
      console.log('are go')
    })
    */

    this.setState({
      repo: '',
      lans: '',
      cons: '',
      coms: '',
      comsh: '',
      name: '',
      commitAuthors: '',
      commits: '',
      datesUsed: false,
      issues: '',
      activity: '',
      following: ''
    });

    var date1 = e.target.date1.value;
    var date2 = e.target.date2.value;

    var q = e.target.query.value;
    if (!(/[a-zA-Z0-9][a-zA-Z0-9-]{0,38}[a-zA-Z0-9]\/[a-zA-Z0-9-_]{0,100}/.test(q))) {
      console.log(toString(q).match(/[a-zA-Z0-9][a-zA-Z0-9-]{0,38}[a-zA-Z0-9]\/[a-zA-Z0-9-_]{0,100}/));
      return;
    }

    var qarr = q.split('/');

    ok.request('GET /users/{username}',
      {username:qarr[0]}
    ).then(response => this.setState({name:response.data.name}))

    ok.rest.repos.get({
      owner: qarr[0],
      repo: qarr[1]
    }).then(response => this.setState({repo:response.data}))

    ok.rest.repos.listCommits({
      owner: qarr[0],
      repo: qarr[1],
      per_page: 100,
      page: 2
    }).then(response => this.setState({coms:response.data}))

    /*var countall = function(list) {
      var counts = { open:0, closed:0}
      for (var num of list) {
        if (num === 'open') counts['open'] = counts['open'] + 1;
        else counts['closed'] = counts['closed'] + 1;
      }
      return counts
    }*/

    if (!(date1 === '' && date2 === '')) {
      this.setState({datesUsed:true})
      ok.paginate('GET /repos/{owner}/{repo}/commits',
        {owner:qarr[0],repo:qarr[1],per_page:100,since:date1,until:date2},
        (response) => response.data.map((commit) => [commit.commit.author.name, commit.commit.author.date])
      ).then((commitAuthors) => {
        this.setState({commitAuthors:commitAuthors});
      })
      /*ok.paginate('GET /repos/{owner}/{repo}/issues',
        {owner:qarr[0],repo:qarr[1],per_page:100,state:'all',since:date1},
        (response) => response.data.map(a=>a.state)
      ).then((issues) => this.setState({issues: countall(issues)}))*/
    } else if (!(date1 === '')) {
      this.setState({datesUsed:true})
      ok.paginate('GET /repos/{owner}/{repo}/commits',
        {owner:qarr[0],repo:qarr[1],per_page:100},
        (response) => response.data.map((commit) => [commit.commit.author.name, commit.commit.author.date])
      ).then((commitAuthors) => {
        this.setState({commitAuthors:commitAuthors});
      })
      /*ok.paginate('GET /repos/{owner}/{repo}/issues',
        {owner:qarr[0],repo:qarr[1],per_page:100,state:'all',since:date1},
        (response) => response.data.map(a=>a.state)
      ).then((issues) => this.setState({issues: countall(issues)}))*/
    } else {
      this.setState({datesUsed:false})
      ok.request('GET /repos/{owner}/{repo}/commits',
        {owner:qarr[0],repo:qarr[1],per_page:100}
      ).then((response) => {
        this.setState({commitAuthors:response.data.map((commit) => [commit.commit.author.name, commit.commit.author.date])});
      })
      /*ok.paginate('GET /repos/{owner}/{repo}/issues',
        {owner:qarr[0],repo:qarr[1],per_page:100,state:'all'},
        (response) => response.data.map(a => a.state)
      ).then((issues) => this.setState({issues: countall(issues)}))*/
    }

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

    ok.rest.repos.getContributorsStats({
      owner:qarr[0],
      repo:qarr[1]
    }).then(response => response.data?this.setState({activity:response.data.filter(a => a['author']['login'].toLowerCase()===e.target.queryu.value.toLowerCase())[0]}):{})

    /*ok.paginate('GET /users/{username}/following',
      {username:e.target.queryu.value,per_page:100},
      (response) => response.data.map(a=>[a.login,a.avatar_url])
    ).then((follows) => this.setState({following:follows}));*/

    ok.rest.search.issuesAndPullRequests({
      q:`type:issue+state:open+repo:${qarr[0]}/${qarr[1]}`
    }).then(response => {
      var oldis = this.state.issues;
      if (oldis === '') oldis = {}
      oldis['open'] = response.data.total_count
      this.setState({issues:{open:response.data.total_count}})
    })
    ok.search.issuesAndPullRequests({
      q:`type:issue+state:closed+repo:${qarr[0]}/${qarr[1]}`
    }).then(response => {
      var oldis = this.state.issues;
      if (oldis === '') oldis = {}
      oldis['closed'] = response.data.total_count
      this.setState({issues:oldis})
    })
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
      name: '',
      comsh: '',
      commitAuthors: '',
      commits: '',
      datesUsed: false,
      issues: '',
      activity: '',
      following: ''
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
        borderWidth: 4,
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
        backgroundColor: ['#f72585', '#b5179e', '#7209b7']
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
        backgroundColor: ['#001219', '#005f73', '#0a9396']
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

    var isd = {
      labels: ['open','closed'],
      datasets: [
        {
          data: [this.state.issues['open'],this.state.issues['closed']],
          backgroundColor: ['blue','red']
        }
      ]
    }

    var ud = this.state.datesUsed;

    var aaa = []
    var ddd = []
    var aadd = []
    if (this.state.activity) {
      //aaa = this.state.activity.weeks.map(a=>parseInt(a.a))
      //ddd = this.state.activity.weeks.map(a=>-parseInt(a.d))
      for (var iaadd in this.state.activity.weeks) {
        //aadd.push(iaadd);
        var yadaddd = this.state.activity.weeks[iaadd]
        if (yadaddd.a > 0 || yadaddd.d < 0) {
          aaa.push(yadaddd.a);
          ddd.push(-yadaddd.d);
          aadd.push(parseInt(iaadd)+1)
        }
      }
    }
    var addd = {
      labels: aadd,
      datasets: [
        {
          label: 'Additions',
          data: aaa,
          backgroundColor: 'green'
        },
        {
          label: 'Deletions',
          data: ddd,
          backgroundColor: 'red'
        }
      ]
    }

    var aaa2 = []
    var ddd2 = []
    var aadd2 = []
    if (this.state.activity) {
      //aaa = this.state.activity.weeks.map(a=>parseInt(a.a))
      //ddd = this.state.activity.weeks.map(a=>-parseInt(a.d))
      for (var iaadd2 in this.state.activity.weeks) {
        //aadd.push(iaadd);
        var yadaddd2 = this.state.activity.weeks[iaadd2]
        if (yadaddd2.a > 500 || yadaddd2.d < -500) {
          aaa2.push(yadaddd2.a);
          ddd2.push(-yadaddd2.d);
          aadd2.push(parseInt(iaadd2)+1)
        }
      }
    }
    var addd2 = {
      labels: aadd2,
      datasets: [
        {
          label: 'Additions',
          data: aaa2,
          backgroundColor: 'green'
        },
        {
          label: 'Deletions',
          data: ddd2,
          backgroundColor: 'red'
        }
      ]
    }

    var csbs = {}
    if (this.state.commitAuthors) {
      for (var cbbs in this.state.commitAuthors) {
        var v = this.state.commitAuthors[cbbs][1].split('T')[0]
        if (Object.keys(csbs).includes(v)) {
          csbs[v] = csbs[v] + 1
        } else {
          csbs[v] = 0
        }
      }
    }
    
    var csdata = {
      labels: Object.keys(csbs).sort(),
      datasets:[{
        label: '',
        data: Object.keys(csbs).sort().map(a=>csbs[a]),
        fill: true,
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 4,
        cubicInterpolationMode: 'monotone',
        tension:0.6
      }]
    }

    /*var tab = document.getElementById('table');
    if (tab) {
      for (var x in this.state.following) {
        var tr = document.createElement('tr');
        var th1 = document.createElement('th')
        th1.style="text-align:left"
        th1.innerHTML=(`${this.state.following[x][0]}`)
        var th2 = document.createElement('th')
        th2.style="text-align:left"
        var img = document.createElement('img')
        img.src=this.state.following[x][1]
        img.width=20
        img.height=20
        th2.appendChild(img)
        tr.appendChild(th1);
        tr.appendChild(th2)
        tab.appendChild(tr)
      }
    }*/

    return (
      <div>
        <h1>GitHub API</h1>
        <br></br>

        <form id="form" onSubmit={this.submitHandler}>
          <p id="frame">
            Required input
          </p>
          <br></br>
          <label>
            <label>Repo : </label>
            <input
              name="query"
              type="text"
              placeholder="user/repo"
              defaultValue={'teamnewpipe/newpipe'}
              required
            />
          </label>
          <br></br>
          <br></br>
          <p id="frame">
            User stats for a repo
          </p>
          <br></br>
          <label>
            <label>User : </label>
            <input
              name="queryu"
              type="text"
              placeholder="user"
              defaultValue={'tobigr'}
            />
          </label>
          <br></br>
          <br></br>
          <p id="frame">
            Larger date range = longer wait time
          </p>
          <br></br>
          <label>
            <label>Since : </label>
            <input
              name="date1"
              type="datetime-local"
              defaultValue="2021-01-01T00:00:00.00"
            />
          </label>
          <br></br>
          <label>
            <label>Until : </label>
            <input
              name="date2"
              type="datetime-local"
              defaultValue="2022-01-01T00:00:00.00"
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
        <h4>User: {this.state.activity?this.state.activity['author']['login']:'n/a'}</h4>
        <p id="frame">Might take a second to load</p><br></br>
        <img width="100" src={this.state.activity ? this.state.activity.author.avatar_url : null} alt="avatar.png" />
        <br></br>
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
            Weekly changes by user
          </h5>
          <p id="frame">
            (If user provided)
          </p>
          <br></br>
          <div id="frame">
            {this.state.activity? <Bar
              options={{
                legend:{
                  display:false
                }
              }}
              data={addd}
            /> : 'No user/changes found'}
          </div>
          <h5>
            Weekly changes ({'>'}500 LOC)
          </h5>
          <p id="frame">
            (If user provided)
          </p>
          <br></br>
          <div id="frame">
            {this.state.activity? <Bar
              options={{
                legend:{
                  display:false
                }
              }}
              data={addd2}
            /> : 'No user/changes found'}
          </div>
          <h5>
            {ud?'Commits':'Recent commits'}
          </h5>
          <p id="frame">
            Accumulation of commits
            <br></br>
            (In time interval if dates provided)
          </p>
          <br></br>
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
            { this.state.commitAuthors? <Line
              data={csdata}
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
            /> : "No commits found"}
          </div>
          <h5>
            Issues in repo
          </h5>
          <p id="frame">
            Recent issues in the repo
            <br></br>
            (Issues created since a date if provided)
          </p>
          <br></br>
          <div id="frame">
            {this.state.issues? <Bar
              data={isd}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: false
                  }
                }
              }}
            /> : 'No issues found'}
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
                  legend: { display: false, position: 'bottom' }
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
                  legend: { display: false, position: 'bottom' }
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
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default App;
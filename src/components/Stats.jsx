import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    PointElement,
    RadialLinearScale
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    LineElement,
    PointElement,
    RadialLinearScale
)

function Stats (props) {
    var forks = parseInt(props.data.repo.forks);
    forks = forks > 100 ? 5 : forks > 50 ? 4 : forks > 25 ? 3 : forks > 10 ? 2 : forks > 5 ? 1 : 1;
    var issues = parseInt(props.data.repo.open_issues);
    issues = issues > 100 ? 5 : issues > 10 ? 4 : issues > 5 ? 3 : issues > 2 ? 2 : issues > 1 ? 1 : 1;
    var watching = parseInt(props.data.repo.watchers);
    watching = watching > 10 ? 5 : watching > 5 ? 4 : watching > 3 ? 2 : watching > 1 ? 1 : 1
    var size = parseInt(props.data.repo.size);
    size = size > 100000 ? 5 : size > 40000 ? 4 : size > 4000 ? 3 : size > 300 ? 2 : size > 100 ? 1 : 1;
    var teammems = [];
    var teamctrb = [];
    var teamcnt = 0;
    for (var i in props.data.cons) {
      teammems.push(props.data.cons[i].login);
      teamctrb.push(props.data.cons[i].contributions);
      teamcnt++;
      if (teamcnt >= 10) break;
    }
    teamctrb = teamctrb.map(a => parseInt(a));
    if (teamcnt === 0) {
      teamctrb = [100]
      teammems = [props.data.name]
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
    return (
        <div>
            <h5>
            Repository stats
          </h5>
          <p>
            Rates various attributes
          </p>
          <div id="frame">
            {props.data.repo? <Radar
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
        </div>
    )
}
export default Stats;
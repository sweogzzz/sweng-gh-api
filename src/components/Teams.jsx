import React from 'react';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    TimeScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    TimeScale
)

function Teams (props) {
    var langsnm = Object.keys(props.data.lans);
    var langspop = Object.values(props.data.lans);
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
    var teamdata = {
      labels: teammems,
      datasets: [{
        label: '% contrib',
        data: teamctrb.map(a => a * 100 / (teamctrb.reduce((a, b) => a + b, 0))),
        borderWidth: 1,
        backgroundColor: ['#001219', '#005f73', '#0a9396']
      }]
    }
    return (
        <div>
            <h5>
            Contributors to repo
          </h5>
          <p>
            Distribution of commits by user
          </p>
          <div id="frame">
            {props.data.cons? <Doughnut
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
            {props.data.lans? <Doughnut
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
        <br></br>
        <br></br>
        </div>
    )
}
export default Teams;
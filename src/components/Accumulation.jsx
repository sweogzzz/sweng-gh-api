import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    TimeScale
)

function Accumulation (props) {
    var ud = props.data.datesUsed;
    var comsd = [];
    var comsn = {};
    for (var i in props.data.commitAuthors) {
      comsd.push((new Date(props.data.commitAuthors[i][1])).getTime());
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
    var csbs = {}
    if (props.data.commitAuthors) {
      for (var cbbs in props.data.commitAuthors) {
        var v = props.data.commitAuthors[cbbs][1].split('T')[0]
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
    return (
        <div>
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
            {props.data.commitAuthors? <Line
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
            { props.data.commitAuthors? <Line
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
        </div>
    )
}
export default Accumulation;
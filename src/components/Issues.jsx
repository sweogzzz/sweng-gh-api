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
import { Bar } from 'react-chartjs-2';
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

function Issues (props) {
    var isd = {
        labels: ['open','closed'],
        datasets: [
          {
            data: [props.data.issues['open'],props.data.issues['closed']],
            backgroundColor: ['blue','red']
          }
        ]
      }
    return (
        <div>
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
            {props.data.issues? <Bar
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
        </div>
    )
}
export default Issues;
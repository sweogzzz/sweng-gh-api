import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale
)

function WeeklyChanges (props) {

    var aaa = []
    var ddd = []
    var aadd = []
    if (props.data.activity) {
      //aaa = props.data.activity.weeks.map(a=>parseInt(a.a))
      //ddd = props.data.activity.weeks.map(a=>-parseInt(a.d))
      for (var iaadd in props.data.activity.weeks) {
        //aadd.push(iaadd);
        var yadaddd = props.data.activity.weeks[iaadd]
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
    if (props.data.activity) {
      //aaa = props.data.activity.weeks.map(a=>parseInt(a.a))
      //ddd = props.data.activity.weeks.map(a=>-parseInt(a.d))
      for (var iaadd2 in props.data.activity.weeks) {
        //aadd.push(iaadd);
        var yadaddd2 = props.data.activity.weeks[iaadd2]
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

    return (
        <div>
            <h5>
            Weekly changes by user
          </h5>
          <p id="frame">
            (If user provided)
          </p>
          <br></br>
          <div id="frame">
            {props.data.activity? <Bar
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
            {props.data.activity? <Bar
              options={{
                legend:{
                  display:false
                }
              }}
              data={addd2}
            /> : 'No user/changes found'}
          </div>
        </div>
    )
}
export default WeeklyChanges;
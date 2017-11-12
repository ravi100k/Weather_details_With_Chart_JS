import React, {Component} from 'react';


const styles={
  display_card:{
      "width": '20rem',
      'float':'left',
  },
  graph:{
    'float':'right',
    'position': 'relative',
    'height':'40vh',
    'width':'60vw',
  }
}

export default class Show_weather extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true
    }
    this.d3Graph = this.d3Graph.bind(this);
};

componentDidMount() {
    // this.d3Graph()
 }
 componentDidUpdate() {
    // this.d3Graph()
 }
  d3Graph(){
    console.log(this.props.data.main.temp);
    var temp = this.props.data.main.temp;
    var humidity = this.props.data.main.humidity;
    var pressure = this.props.data.main.pressure;
    var sea_level = this.props.data.main.sea_level;
    var wind_speed = this.props.data.wind.speed;

    var weather_description = this.props.data.weather[0].description;
    console.log(weather_description);
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ["Temp", "Humidity","Wind Speed"],
            datasets: [{
                label: ['Temperateur','humidity','wind speed'],
                data: [temp,humidity,wind_speed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    this.setState({loading:false})
  }


  render() {

    return (
      <div>
      <div className="card" style={styles.display_card} onMouseOver={this.d3Graph}>
        <div className="card-body">
          <h4 className="card-title">The temperateur is {this.props.data.main.temp}</h4>
          <h4 className="card-subtitle mb-2 text-muted">The Sky will have {this.props.data.weather[0].description}</h4>
          <h6 className="card-subtitle mb-2 text-muted">The Air Pressure of the day {this.props.data.main.pressure}</h6>
          </div>
      </div>

      <div className="chart-container" style={styles.graph}>
        <canvas id="myChart" width="200" height="200" ></canvas>
      </div>


        </div>
    );
  }
}

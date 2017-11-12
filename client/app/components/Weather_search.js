import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardActions,CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import openWeatherMap from '../API/openWeatherMap';
import Show_weather from './Show_weather';

import axios from 'axios'


const styles={
  searchButton:{
    'paddingTop':30
  },
  textBox:{
    'paddingTop':30,
    'paddingBottom':30,

  },
  textBox2:{
    'paddingRight':50,
    'float':'right'
  },
  display_card:{
      "width": '20rem',
  }
}
export default class Weather_Search extends Component {
  constructor(props){
    super(props);
    this.state={
      country :[],
      cities:[],
      Country_Name:'',
      Country_Code:'',
      lat:'',
      lng:'',
      api_data:{
        list:[]
      },
      city_name:'',
    }
    this.handleUpdateInput_country = this.handleUpdateInput_country.bind(this);
    this.handleUpdateInput_city = this.handleUpdateInput_city.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
};

componentWillMount(){

}

  handleUpdateInput_country(value){
    var country_list=[]
    var Country_Name=''
    var Country_Code=''
    axios.get('/country/',{}).then((response) => {
      var jsonData = response.data
      jsonData.map((data) => {
      country_list.push(data.name)
      })
        // console.log('country list',response);
        // console.log(value);
        function search(value){
          jsonData.map((data) =>{
            if (data.name==value){
              Country_Name=data.name
              Country_Code=data.code
              // console.log(data.code);
            }
          })
        }
        search(value)
        this.setState({
          country:country_list,
          Country_Name:Country_Name,
          Country_Code:Country_Code
        });
        // console.log(this.state.Country_Name,this.state.Country_Code);
      }).catch(function (error) {
        console.log(error);
      });
  };


  handleUpdateInput_city(value){
    var cities_list = [];
    var lat = ''
    var lng = ''
    // console.log("calling city api with city code ",this.state.Country_Code);
    axios.get('/cities/'+this.state.Country_Code,{}).then((response) => {
      var responseData = response.data

      responseData.map((data) => {
        cities_list.push(data.name)
      })
      function search(value){
        responseData.map((data) =>{
          if (data.name==value){
            lat=data.lat
            lng=data.lng
          }
        })
      }
      search(value)
      this.setState({
        cities:cities_list,
        city_name:value,
        lat:lat,
        lng:lng
      })
      // console.log('cities list',response,this.state.cities);
    }).catch((error) =>{
      console.log(error);
    })
    // console.log(value);
  }

handleSearch(){
  console.log(this.state.city_name,this.state.Country_Code);
  var that = this
  openWeatherMap.getTemp(this.state.city_name,this.state.Country_Code).then(function(data) {
    console.log(data);
    that.setState(
        {
          api_data: data,
        }
      );
    // console.log(data.list[0].main.temp);
      });
}
// check(){
//   console.log('a',this.state.api_data.list);
//   console.log('b',typeof(this.state.api_data.list[0].dt));
// }

  render() {
    // var that = this;

    return (
      <div>
      <Card>
        <CardActions style={styles.textBox}>
          <span>Country Name :</span><AutoComplete
              hintText="Country Name"
              dataSource={this.state.country}
              onUpdateInput={this.handleUpdateInput_country}
              floatingLabelText="Search Country"
              filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            />

            <div style={styles.textBox2}>
          <span>City Name : </span><AutoComplete
                hintText="Search City"
                dataSource={this.state.cities}
                onUpdateInput={this.handleUpdateInput_city}
                floatingLabelText="Search City"
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
              />
            </div><br/>
              <div style={styles.searchButton}>
              <RaisedButton label="Search" primary={true} fullWidth={true} onClick={this.handleSearch}/>
              </div>
                <CardText>
                Country Code : {this.state.Country_Code}&nbsp;&nbsp;&nbsp;&nbsp; Latitude :{this.state.lat} Longitude : {this.state.lng}
                </CardText>
          </CardActions>
          </Card>
          {this.state.api_data.list.map((data,index) => (<Show_weather key={index} data={data} />))}
            </div>
    );
  }
}

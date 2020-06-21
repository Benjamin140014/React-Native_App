import React from 'react';
import {View, Text, StyleSheet, Dimensions , ScrollView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import Slider from './slider' ;
import ButtonSwitch from './switch';
import Gauge from './gauge' ;
import ChartKit from './chartkit' ; 

var dataValue = 0;
setInterval(() => {
  dataValue += 100 - Math.random() * 100;
}, 1000);
var dataY = [];
var dataX = [];

export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jsonData: 0 ,
      data: {
        labels: ['Tem'],
        datasets: [
          {
            data: [100],
          },
        ],
      },
    };
  }
  componentDidMount() {
    this.GetData();
  }
  GetData = () => {

  setInterval(() => {
      fetch('http://192.168.1.100:3000/api/get/random', {
      method: 'GET'
    })
      .then(response => response.json() )
      .then(json => {
          this.setState({
            jsonData: json.value
          });  
      })
      .catch(error => {
       console.log(error) ; 
      });
    },1000);

    setInterval(() => {
      var x = getTime(new Date()).time;
      dataX.push(x);
      dataY.push(this.state.jsonData);
      if (dataX.length >= 10) {
        dataX.shift();
      }
      if (dataY.length >= 10) {
        dataY.shift();
      }
      this.setState({
        isLoading: false,
        data: {
          labels: dataX,
          datasets: [
            {
              data: dataY,
            },
          ],
        },
      });
    }, 2000);
  };

  render() {
    // since we're now referencing this.state.data, its value
    // will be updated directly when we update the state

    return (
      <View style={styles.container}>
        
        <Text>Chart</Text>
        <LineChart
          data={this.state.data}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
         < Gauge />
        < Slider />
        {/*  < ButtonSwitch /> */}
      </View>
    );
  }
}

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
});

function getTime(data){
  let today = data;
  let date = today.getFullYear() + "-" +  (today.getMonth() + 1) + "-" + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return {dateTime: date + " " + time , date: date , time: time};
}
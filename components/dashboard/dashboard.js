import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import io from 'socket.io-client';
import Speedometer from 'react-native-speedometer-chart';
const {width: WIDTH} = Dimensions.get('window');

var dataX = {T1: [], T2: [], T3: []};
var dataY = {T1: [], T2: [], T3: []};
export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataT1: {
        labels: ['T1'],
        datasets: [
          {
            data: [0],
          },
        ],
      },
      dataT2: {
        labels: ['T2'],
        datasets: [
          {
            data: [0],
          },
        ],
      },
      dataT3: {
        labels: ['T3'],
        datasets: [
          {
            data: [0],
          },
        ],
      },
      valueT1: 0,
      valueT2: 0,
      valueT3: 0,

      valueDO: 0,
      valuePH: 0,
      valueFlow_1: 0,
      valueFlow_2: 0,
    };
  }

  Run = () => {
    this.socket = io('http://180.214.236.174:4000');
    this.socket.on('changeEachVariable', data => {
      this.setState({valueT1: Math.round(data.T1.value * 100) / 100});
      this.setState({valueT2: Math.round(data.T2.value * 100) / 100});
      this.setState({valueT3: Math.round(data.T3.value * 100) / 100});
      this.setState({valueDO: Math.round(data.DO.value * 100) / 100});
      this.setState({valuePH: Math.round(data.PH.value * 100) / 100});
      this.setState({valueFlow_1: Math.round(data.Flow1.value * 100) / 100});
      this.setState({valueFlow_2: Math.round(data.Flow2.value * 100) / 100});

      var x = getTime(new Date()).time;
      dataX.T1.push(x);
      dataX.T2.push(x);
      dataX.T3.push(x);
      dataY.T1.push(Math.round(data.T1.value * 100) / 100);
      dataY.T2.push(Math.round(data.T2.value * 100) / 100);
      dataY.T3.push(Math.round(data.T3.value * 100) / 100);
      if (dataX.T1.length >= 6) {
        dataX.T1.shift();
      }
      if (dataY.T1.length >= 6) {
        dataY.T1.shift();
      }
      if (dataX.T2.length >= 6) {
        dataX.T2.shift();
      }
      if (dataY.T2.length >= 6) {
        dataY.T2.shift();
      }

      if (dataX.T3.length >= 6) {
        dataX.T3.shift();
      }
      if (dataY.T3.length >= 6) {
        dataY.T3.shift();
      }

      // push all array
      this.setState({
        isLoading: false,
        dataT1: {
          labels: dataX.T1,
          datasets: [
            {
              data: dataY.T1,
            },
          ],
        },
        dataT2: {
          labels: dataX.T2,
          datasets: [
            {
              data: dataY.T2,
            },
          ],
        },
        dataT3: {
          labels: dataX.T3,
          datasets: [
            {
              data: dataY.T3,
            },
          ],
        },
      });
    });
  };
  componentDidMount() {
    this.Run();
  }
  render() {
    return (
      <View style={styles.scrollViews}>
        <ScrollView>
          <Text style={styles.textNabar}> Dashboard </Text>

          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.lefttitle}>Nhiệt Độ T1</Text>
              <Text style={styles.lefttitle}>
                Giá trị :{this.state.valueT1} ℃
              </Text>
              <Text style={styles.lefttitle}>
                Thời gian : {getTime(new Date()).time}
              </Text>
            </View>
            <LineChart
              data={this.state.dataT1}
              width={Dimensions.get('window').width} // from react-native
              height={160}
              yAxisLabel={'℃ '}
              chartConfig={chartConfigT1}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={styles.title}>
              <Text style={styles.lefttitle}>Nhiệt Độ T2</Text>
              <Text style={styles.lefttitle}>
                Giá trị :{this.state.valueT2} ℃
              </Text>
              <Text style={styles.lefttitle}>
                Thời gian : {getTime(new Date()).time}
              </Text>
            </View>
            <LineChart
              data={this.state.dataT2}
              width={Dimensions.get('window').width} // from react-native
              height={160}
              yAxisLabel={'℃ '}
              chartConfig={chartConfigT2}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={styles.title}>
              <Text style={styles.lefttitle}>Nhiệt Độ T3</Text>
              <Text style={styles.lefttitle}>
                Giá trị :{this.state.valueT3} ℃
              </Text>
              <Text style={styles.lefttitle}>
                Thời gian : {getTime(new Date()).time}
              </Text>
            </View>
            <LineChart
              data={this.state.dataT3}
              width={Dimensions.get('window').width} // from react-native
              height={160}
              yAxisLabel={'℃ '}
              chartConfig={chartConfigT3}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />

            <View style={styles.containerDOPH}>
              {/* chart DO */}
              <View style={styles.container1}>
                <View style={styles.title}>
                  <Text style={styles.lefttitle}>DO</Text>
                </View>
                <Speedometer
                  value={this.state.valueDO}
                  totalValue={10}
                  size={WIDTH / 2 - 5}
                  outerColor="#d3d3d3"
                  internalColor="royalblue"
                  showText
                  text={this.state.valueDO + ' mg/l'}
                  textStyle={{color: 'black', fontWeight: 'bold', fontSize: 16}}
                  showLabels
                  labelStyle={{color: 'blue'}}
                  labelFormatter={number => `${number}`}
                  showIndicator
                  percentStyle={{color: 'red'}}
                />
              </View>

              {/* chart PH */}
              <View style={styles.container1}>
                <View style={styles.title}>
                  <Text style={styles.lefttitle}>PH</Text>
                </View>
                <Speedometer
                  value={this.state.valuePH}
                  totalValue={14}
                  size={WIDTH / 2 - 5}
                  outerColor="#d3d3d3"
                  internalColor="steelblue"
                  showText
                  text={this.state.valuePH + ''}
                  textStyle={{color: 'black', fontWeight: 'bold', fontSize: 16}}
                  showLabels
                  labelStyle={{color: 'blue'}}
                  labelFormatter={number => `${number}`}
                  showIndicator
                  percentStyle={{color: 'red'}}
                />
              </View>
            </View>

            <View style={styles.containerFlow}>
              {/* chart Flow 1 */}
              <View style={styles.container1}>
                <View style={styles.title}>
                  <Text style={styles.lefttitle}>Flow 1</Text>
                </View>
                <Speedometer
                  value={this.state.valueFlow_1}
                  totalValue={100}
                  size={WIDTH / 2 - 5}
                  outerColor="#d3d3d3"
                  internalColor="steelblue"
                  showText
                  text={this.state.valueFlow_1 + ''}
                  textStyle={{color: 'black', fontWeight: 'bold', fontSize: 16}}
                  showLabels
                  labelStyle={{color: 'blue'}}
                  labelFormatter={number => `${number}`}
                  showIndicator
                  percentStyle={{color: 'red'}}
                />
              </View>

              {/* chart flow 2 */}
              <View style={styles.container1}>
                <View style={styles.title}>
                  <Text style={styles.lefttitle}>Flow 2</Text>
                </View>
                <Speedometer
                  value={this.state.valueFlow_2}
                  totalValue={100}
                  size={WIDTH / 2 - 5}
                  outerColor="#d3d3d3"
                  internalColor="darkslategrey"
                  showText
                  text={this.state.valueFlow_2 + ''}
                  textStyle={{color: 'black', fontWeight: 'bold', fontSize: 16}}
                  showLabels
                  labelStyle={{color: 'blue'}}
                  labelFormatter={number => `${number}`}
                  showIndicator
                  percentStyle={{color: 'red'}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const chartConfigT1 = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
const chartConfigT2 = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
const chartConfigT3 = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
const styles = StyleSheet.create({
  scrollViews: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkgray',
  },
  textNabar: {
    backgroundColor: 'steelblue',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: WIDTH - 2,
    marginTop: 80,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lefttitle: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  containerDOPH: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFlow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lefttitle: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
});

function getTime(data) {
  let today = data;
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return {dateTime: date + ' ' + time, date: date, time: time};
}

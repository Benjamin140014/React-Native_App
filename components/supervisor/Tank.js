import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
const {width: WIDTH} = Dimensions.get('window');
import io from 'socket.io-client';

export default class Tank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      dataHeightHoChua: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightCanbang: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightHcl: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightNaoh: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightTrungHoa: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightKK: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightHK: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightTemp: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      dataHeightBeLang: {
        labels: [0, ''],
        datasets: [
          {
            data: [0, 0],
          },
        ],
      },
      height_KK: 0,
      height_HK: 0,
      height_Lang: 0,
      height_CB: 0,
      height_HoChua: 0,
      height_HCL: 0,
      height_NAOH: 0,
      height_Temp: 0,
      Heigth_TH: 0,
    };
  }
  componentDidMount() {
    this.socket = io('http://180.214.236.174:4000');
    this.socket.on('loadDataControl', (data)=> {
      this.setState({
        dataHeightHoChua: {
          labels: [Math.round(data[39].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[39].value *100)/100, 0],
            },
          ],
        },
        dataHeightCanbang: {
          labels: [Math.round(data[40].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[40].value *100)/100, 0],
            },
          ],
        },
        dataHeightHcl: {
          labels: [Math.round(data[42].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[42].value *100)/100, 0],
            },
          ],
        },
        dataHeightNaoh: {
          labels: [Math.round(data[41].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[41].value *100)/100, 0],
            },
          ],
        },
        dataHeightTrungHoa: {
          labels: [ Math.round(data[43].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [ Math.round(data[43].value *100)/100, 0],
            },
          ],
        },
        dataHeightKK: {
          labels: [Math.round(data[36].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[36].value *100)/100 , 0],
            },
          ],
        },
        dataHeightHK: {
          labels: [Math.round(data[37].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[37].value *100)/100, 0],
            },
          ],
        },
        dataHeightTemp: {
          labels: [Math.round(data[44].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[44].value *100)/100, 0],
            },
          ],
        },
        dataHeightBeLang: {
          labels: [Math.round(data[38].value *100)/100 + ' m', ''],
          datasets: [
            {
              data: [Math.round(data[38].value *100)/100, 0],
            },
          ],
        },
    });
    });
  }
  render() {
    return (
      <View style={styles.scrollViews}>
        <ScrollView>
          <Text style={styles.textNabar}> Superrvisor Tank </Text>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.lefttitle}>Bể Chứa</Text>
              <Text style={styles.lefttitle}>Bể Cân Bằng </Text>
            </View>
            <View style={styles.title}>
              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightHoChua}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>

              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightCanbang}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>
            </View>

            <View style={styles.title}>
              <Text style={styles.lefttitle}>Bể NAOH</Text>
              <Text style={styles.lefttitle}>Bể HCL </Text>
            </View>
            <View style={styles.title}>
              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightNaoh}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfigNaOH}
                  verticalLabelRotation={0}
                />
              </View>

              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightHcl}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfigHCL}
                  verticalLabelRotation={0}
                />
              </View>
            </View>
            <View style={styles.title}>
              <Text style={styles.lefttitle}>Bể Trung Hòa</Text>
              <Text style={styles.lefttitle}>Bể Kị Khí </Text>
            </View>
            <View style={styles.title}>
              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightTrungHoa}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>

              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightKK}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>
            </View>

            <View style={styles.title}>
              <Text style={styles.lefttitle}>Bể Tạm</Text>
              <Text style={styles.lefttitle}>Bể Hiếu khí</Text>
            </View>
            <View style={styles.title}>
              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightTemp}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>

              <View style={styles.container1}>
                <BarChart
                  data={this.state.dataHeightHK}
                  width={115}
                  height={250}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                />
              </View>
            </View>

            <View style={styles.title}>
              <Text style={styles.lefttitle}>Bể Lắng</Text>
            </View>
            <View style={styles.containerLast}>
              <BarChart
                data={this.state.dataHeightBeLang}
                width={115}
                height={250}
                yAxisLabel=""
                chartConfig={chartConfigLang}
                verticalLabelRotation={0}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const chartConfig = {
  backgroundColor: 'azure',
  backgroundGradientFrom: 'gray',
  backgroundGradientTo: 'royalblue',
  decimalPlaces: 4, // optional, defaults to 2dp
  color: (opacity = 1) => `green`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
    fontSize: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
const chartConfigNaOH = {
  backgroundColor: 'azure',
  backgroundGradientFrom: 'gray',
  backgroundGradientTo: 'cornflowerblue',
  decimalPlaces: 4, // optional, defaults to 2dp
  color: (opacity = 1) => `green`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
    fontSize: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
const chartConfigHCL = {
  backgroundColor: 'azure',
  backgroundGradientFrom: 'gray',
  backgroundGradientTo: 'darkcyan',
  decimalPlaces: 4, // optional, defaults to 2dp
  color: (opacity = 1) => `green`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
    fontSize: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
const chartConfigLang = {
  backgroundColor: 'azure',
  backgroundGradientFrom: 'gray',
  backgroundGradientTo: 'darkslategrey',
  decimalPlaces: 4, // optional, defaults to 2dp
  color: (opacity = 1) => `green`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
    fontSize: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
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
    marginTop: 60,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
    flexDirection: 'column',
    margin: 2,
    borderRadius: 5,
  },
  containerLast: {
    flex: 1,
    width: WIDTH - WIDTH / 2,
    backgroundColor: 'lightslategrey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5,
  },
  reload:{
    position: 'absolute',
    left: 17, top: 10
  } ,
  spinnerTextStyle: {
    color: '#FFF'
  }
});

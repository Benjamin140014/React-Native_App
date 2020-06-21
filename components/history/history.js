import * as React from 'react';
import { Text, View, StatusBar , StyleSheet , TouchableOpacity, Alert , TextInput} from 'react-native';


var value = { count: 0 }  ; 
setInterval(() => {
  value.count = 100 - 100*Math.random() ; 
}, 1000);



export default class history extends React.Component {
  constructor(props){
   super(props) ;
   this.state = {
     jsonData: '', 
     inputText: ''
   }
  }
 
  componentDidMount() {
    // setInterval(() => {
    //   fetch('http://52.231.152.23:5000/api/data', {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({
    //       jsonData: json.data,
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // }, 1000);
  }

  changeData =()=>{
    fetch('http://52.231.152.23:5000/api', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: this.state.inputText
    }),
   })
  .then((responseJson) => {
    Alert.alert(`Status ` ,JSON.stringify(responseJson.status) ) ;
  })
  .catch((error) => {
   console.log(error)
  })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.state.jsonData} </Text>
       <TextInput style={styles.inputContainer} value= {this.state.inputText} onChangeText={(text)=>{this.setState({inputText: text })}} />
       <Text> {this.state.inputText}</Text>
       <TouchableOpacity style = {styles.Click} onPress= {this.changeData} >
         <Text>Write Data</Text>
       </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  Click:{
    backgroundColor: "blue",
    padding: 10
  },
  inputContainer:{
  marginTop: 20 ,
   borderWidth: 1 ,
   borderColor: 'gray',
   width: 200 ,
   height: 50 ,
   fontSize: 25 ,
   padding: 10
  }
});


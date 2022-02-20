import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      f_name: '',
      l_name: '',
      no_user: 0,
      data: [],
      pre_data:0
    };
  }

  componentDidMount() {
    // var x = 5
    // axios.get('https://randomuser.me/api?results='+x).then((x) => {
    //   console.log(x.data.results);
    //   var data = x.data.results
    // for (var i in data){
    //   // console.log(data[i].name.first)
    // }
    //   // this.setState({userData:x.data.results[0]})
    //   this.setState({data:x.data.results})
    // });
  }

// componentdidUpdate(nextProps, nextState) {
//   console.log(nextState); //will show the new state
//   console.log(this.state); //will show the previous state
// }

  display = () => {
    var x = this.state.no_user;
    axios.get('https://randomuser.me/api?results=' + x).then((x) => {
      console.log(x.data.results);
      var data = x.data.results;
      for (var i in data) {
        // console.log(data[i].name.first)
      }
      // this.setState({userData:x.data.results[0]})
      this.setState({ data: x.data.results });
    });

    //  axios.get('https://randomuser.me/api?results=5').then((x) => {
    //       // console.log(x.data.results[0]);
    //       this.setState({userData:x.data.results[0]})
    //     });

    // this.setState({
    //   f_name:this.state.userData.name.first,
    //   l_name:this.state.userData.name.last
    // })
  };

  displayPre=()=>{
    this.setState({pre_data:this.state.no_user})
    console.log(this.state.pre_data)
  }

  render() {
    const list = this.state.data;
    var users = [];

    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Text style={styles.header}> USER LIST</Text>
        <TextInput
        style={{textAlign:"center", margin:10,borderRadius:5,borderWidth:1,padding:3}}
          placeholder="no. of users"
          onChangeText={(x) => {
            this.setState({ no_user: x });
          }}
        />
        <Button
          title="submit"
          onPress={() => {
            this.display();
          }}
        />
         <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={{flexDirection:"row"}}>
            <Image source={{uri:"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}} style={{width:40,height:40, borderRadius:25}}
            />
            <Text style={{fontSize:24, margin:15}}>
              {item.name.first} {item.name.first}
            </Text>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Button
        title="last fetched"
        onPress={()=>{
          this.displayPre()
        }}
        />
        <Text style={styles.paragraph}>Number of users fetched previously: {this.state.pre_data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'pink',
    flex: 0.04,
    fontSize:35,

  },
});

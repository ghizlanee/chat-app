//import liraries
import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity,Button } from 'react-native';
import firebase from 'react-native-firebase';
import {List,ListItem} from 'react-native-elements';
import {  TabNavigator} from 'react-navigation';
import Profile from './Profile';
// create a component
class Users extends Component {

    static navigationOptions={
        header:null,
    }

  constructor(props){
    super(props)
    this.state={
      store:[]
    }
  }

   componentDidMount(){

    var user = firebase.auth().currentUser;
        var database = firebase.database();

        firebase.auth().onAuthStateChanged(user => {
          if (user){
            console.log(user)
        this.getUsers();
      }})

  }

  getUsers(){
    //made ref to current user and database folder
    var userR = firebase.database().ref('Friends/');
     var user = firebase.auth().currentUser;

// here i stored all the users data inside an array for later users

     userR.on('value', (snap) =>{

       var mid =[];

       snap.forEach((child)=>{
           if(child.val().uid != user.uid) //here i checked that list contains all users but not current user

           {
          // console.log(child)
         //var childData = childSnapshot.val();
         mid.push({
           name: child.val().name,
           email: child.val().email,
           id: child.val().uid,
           image: child.val().image,
         })
}
else {
   console.log('not one of us')
}
         //console.log(mid)
         //console.log(this.state.store)

       });
       this.setState({store:mid}) //here i finnaly stored that array to state for use


   });

  }


/*/  <Button title="Logout" onPress={()=>this.logout()} />
  <Button title="My Profile" onPress={()=>this.props.navigation.navigate('profile')} />*/
    render() {
        return (
        <View>

<List>
                <FlatList
                style={{marginTop:0}}
              keyExtractor={(item, index) => index.toString()} //javascript helper function..
              data={this.state.store}
              renderItem={({ item }) =>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('chat',{uname:item.name,uid:item.id,email:item.email,image:item.image})}

              style={{marginVertical:3,marginHorizontal:2}}>
              <ListItem
              roundAvatar
              avatar={{uri:item.image}}
              title={`${item.name}`}
              />
              </TouchableOpacity>
            }
              />
  </List>
            </View>
        );
    }

}
// define your styles
class Logout extends Component{
  logout(){
    const {navigate} = this.props.navigation
    firebase.auth().signOut().then(function() {
    alert('you are Signed Out')
    navigate('login')
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  }
  render(){
    return(
      <View style={{backgroundColor:'white',width:'100%',height:'100%'}}>
       <TouchableOpacity  onPress={()=>this.logout()} style={{borderWidth:3,marginTop:250,width:'50%',marginLeft:100,height:70,backgroundColor:'white',borderColor:'green',borderRadius:15}} >
       <Text style={{color:'black',alignSelf:'center',alignItems:'center',fontSize:30}}>Log out</Text>
       </TouchableOpacity>
       </View>
    );
  }
}

//make this component available to the app
//export default Users;
export default TabNavigator ({
users:{screen:Users},
  profile:{screen:Profile},
  logout:{screen:Logout},
},{
  tabBarOptions : {
    style: {
      backgroundColor: 'green',
    }
  }
});

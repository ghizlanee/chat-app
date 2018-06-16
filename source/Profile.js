
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  image,
  Platform

} from 'react-native';
import firebase from 'react-native-firebase';
import UserAvatar from 'react-native-user-avatar';
import ImagePicker from 'react-native-image-crop-picker';

class Profile extends Component {

constructor(props){
  super(props);
    this.state={
      link:'',
      uname:'',
      uemail:''
    }

}



  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user)

        var database = firebase.database();

        database.ref('Friends/'+user.uid).on('value',(snap) => {
            var imageLink = snap.val().image
            var name = snap.val().name
            var email = snap.val().email

            console.log(imageLink)
            this.setState({link:imageLink})
            this.setState({uname:name})
            this.setState({uemail:email})

        });
      }
    })
  }


  updateImage(){
    ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
}).then(image => {
  console.log(image);
  this.setState({uri:image.path})
  this.setState({forupload:image.path})

  var mime = 'image/jpeg'


  var user = firebase.auth().currentUser;
  const imageRef = firebase.storage().ref(`/Images/${user.uid}`) //created a ref to firebase storage where user picture will be
   const uploadUri = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path // in case this app runs on ios too


   return imageRef.putFile(uploadUri,{ contentType: mime}).then(() => {
                 return imageRef.getDownloadURL();
                  //stored on firebase and get a link for image
                  }).then((url) => {
                      console.log(url)
                    var database = firebase.database(); //made a ref to db
                    database.ref('Friends/'+user.uid).update({
                        image : url
                      });

                      alert('image uploaded')
                    console.log(url)
                  })
                  //done uploading image to user profile ..ok ok
});
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={()=>this.updateImage()}>
          <UserAvatar size="200" name="App User" src= {this.state.link}/>
          </TouchableOpacity>
          <View style={{marginVertical:20,alignItems:'center'}}>
          <Text style={{color:'#2C2D33',fontWeight:"bold",fontSize:29}}>{this.state.uname}</Text>
          <Text style={{color:'#3B3C43',fontSize:16}}>{this.state.uemail}</Text>

          </View>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBFBFD',
  },
  image:{
        width:400,
        height:500,
        position:'absolute'
    },
});


export default Profile;

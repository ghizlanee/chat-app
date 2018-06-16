//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,Alert } from 'react-native';
import firebase from 'react-native-firebase';
// create a component
class Forget extends Component {

constructor(props){
  super(props)

  this.state={
    email:''
  }
}


  send(){
    const{navigate} = this.props.navigation;
    const {email} = this.state;

    var auth = firebase.auth();
    var emailAddress = this.state.email;
    if(this.state.email!=''){

       auth.sendPasswordResetEmail(emailAddress).then(function() {
 Alert.alert('Success.','Password reset email has been sent.')
 navigate('login')
}).catch(function(error) {
   Alert.alert('Ops we are sorry','The recovery link could not be sent to this email, please try again.')
 // An error happened.
});

}
else {
   alert('Please enter a valid email address.')
}
  }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30,fontWeight:'bold',alignSelf:'center',marginTop:90}}>Enter your email.</Text>

                <View style={{marginHorizontal:10,alignItems:'center'}}>

                <TextInput
                    style={styles.input}
                    selectionColor={'#3d1767'}
                    onChangeText={(email) => this.setState({email})}
                    multiline={false}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#bdc3c7"

                />

                </View>
                  <View style={{alignSelf:'flex-end',bottom:0,top:30}}>
                <Button title="Send Email" onPress={()=>this.send()} />
                  </View>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white',
    },
    input:{
        top:40,
        marginVertical:4,
        paddingHorizontal:9,
        color:'white',
        fontSize:15,
        height:48,
        width:'100%',
        backgroundColor:'green'

    }
});

//make this component available to the app
export default Forget;

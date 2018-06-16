//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase'

class Register extends Component {

  static navigationOptions={
      header:null
  }

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            username:'',
            confirmpass:''
        }
    }


    register(){


      const { navigate,pop } = this.props.navigation;

               var db = firebase.database().ref(); //made a reference to the database here. for later use

               const { email, password,confirmpass } = this.state;

if(this.state.password==this.state.confirmpass){

                var reg = /^[a-zA-Z0-9._%+-]+\@ocpgroup+\.ma$/;
                if(reg.test(this.state.email) == true){
                  console.log('valid')




                  firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                  //we need info / user id from firebase that we just created
                  var user = firebase.auth().currentUser;

                  //lets store his name/details inside database
                  firebase.database().ref().child('Friends').child(user.uid).set({
                    email: this.state.email,
                    uid: user.uid,
                    name: this.state.username,
                    image:"https://firebasestorage.googleapis.com/v0/b/unichatio-f63db.appspot.com/o/user.png?alt=media&token=644dcea8-1c60-4615-998c-8e29627b1f8b", //thi is just thumbnail
 })
                   alert('user created!')


      }).


      catch(function(error) {
        //its for error handling..
   var showErr = JSON.stringify(error.message)
   Alert.alert('Ohh Snapp..',showErr)

   });
 }
            else{
                  alert('sorry you are not member of ocp,the email must have user@ocpgroup.ma')
                }
              }
              else {
                alert("the password is incorrect")
              }






     }


    render() {
        return (
          <LinearGradient colors={['#31bb88','#18ac26']}
          style={{width:'100%',height:'100%'}}
          >
                <Text style={{fontSize:30,fontWeight:'bold',alignSelf:'center',color:'white',marginTop:120}}>-Register-</Text>


            <View style={{top:40,marginHorizontal:10,alignItems:'center'}}>

            <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(username) => this.setState({username})}
                multiline={false}
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={(event) => {
                    this.refs.next.focus();
                }}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"

            />




            <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}
                ref='next'

                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                defaultValue='@ocpgroup.ma'
                returnKeyType="next"
                onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus();
                }}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"

            />

            <TextInput
        style={styles.input}
        selectionColor={'#3d1767'}
        ref='SecondInput'
        onChangeText={(password) => this.setState({password})}
        multiline={false}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={(event) => {
            this.refs.third.focus();
        }}
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"

/>



<TextInput
        style={styles.input}
        selectionColor={'#3d1767'}
        ref='third'
        onChangeText={(confirmpass) => this.setState({confirmpass})}
        multiline={false}
        placeholder="Confirm password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"

/>




<TouchableOpacity activeOpacity={0.8} onPress={()=>this.register()} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.5)',marginTop:50}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#2c3e50'}}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.pop()} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,borderWidth:2,borderColor:'rgba(0, 22, 0, 0.5)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#2c3e50'}}>LOGIN</Text>
            </TouchableOpacity>



            </View>

            </LinearGradient>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        //alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#00b894',
    },
    input:{
      marginVertical:4,
        paddingHorizontal:9,
        color:'black',
        fontSize:15,
        height:48,
        width:'100%',
        backgroundColor:'white'

    }
});

//make this component available to the app
export default Register;

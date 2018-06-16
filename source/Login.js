//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome'
// create a component
class Login extends Component {

  static navigationOptions={
      header:null
  }

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

componentDidMount(){

  firebase.auth().onAuthStateChanged( user => {

            if(user){

              return this.props.navigation.navigate('users')
            }
            else {
              console.log('not signed in')
            }
})
}

    login(){
      const { navigate } = this.props.navigation;
      const {email,password} = this.state;

        if(email.length != 0){
        firebase.auth().signInWithEmailAndPassword(email, password).then( function() {

                navigate('users');
                   })
                   .catch(function(error){

                  var errorCode = error.code;
                  var errorMessage = JSON.stringify(error.message);
                  Alert.alert('Something went wrong',errorMessage)
                  // ...
                })
              }
              else {
                alert('enter a valid email')
              }

    }

//  <Icon name="at" size={20} color="black"  style={{position:'absolute',marginTop:120}}/>
    render() {
        return (

    <LinearGradient colors={['#31bb88','#18ac26']}
    style={{width:'100%',height:'100%'}}
    >



                <Text style={{fontSize:30,alignSelf:'center',fontWeight:'bold',color:'white',marginTop:150}}>-Login-</Text>


            <View style={{top:40,marginHorizontal:10,alignItems:'center'}}>


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
              
                onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus();
                }}
                underlineColorAndroid="transparent"
                placeholderTextColor="gray"

            >

            <Text>@ocpgroup.ma</Text>
            </TextInput>

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
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"

/>

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.login()} style={{backgroundColor:'white',borderRadius:19,width:'80%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,borderWidth:2,borderColor:'rgba(0, 22, 0, 0.5)',marginTop:50}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#2c3e50'}}>LOGIN</Text>
            </TouchableOpacity>

<TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('register')} style={{backgroundColor:'white',borderRadius:19,width:'80%',height:40,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.5)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#2c3e50'}}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('forget')} style={{marginTop:60}} >
                            <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'white'}}>FORGOT YOUR PASSWORD ? </Text>
                        </TouchableOpacity>



            </View>

            </LinearGradient>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
       //flex: 1,

        alignItems:'center',
       justifyContent:'center',
      //  backgroundColor: '#00b894',

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


export default Login;

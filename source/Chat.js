import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat,Actions } from "react-native-gifted-chat";
import firebase from "react-native-firebase";
import md5 from './md5';
//import md5 from './lib/md5';
//import LinearGradient from 'react-native-linear-gradient';
//import Spinner from 'react-native-loading-spinner-overlay';

// create a component
class Chat extends Component {

    constructor(props){
        super(props)

        this.state = {
            messages:[],
            typing:false

          };
        this.user = firebase.auth().currentUser
        this._isAlright = null;

        this.chatRef = firebase.database().ref().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }


    static navigationOptions=({ navigation })=>({
        title: `${navigation.state.params.uname}`,
        headerTintColor: '#2a0845',
        headerStyle:{
            backgroundColor:'#F2F9FF'

        },
        headerTitleStyle:{
            color:'#2a0845'
        }
    })




     renderFooter() {
       const {params} = this.props.navigation.state;
      var typingS = firebase.database().ref().child('TypingStatus')
      typingS.on('value',(snap)=>{
        var store=[]
        snap.forEach((child)=>{

          store.push({
            name:child.who,
            isT:child.isTyping
          })
            if(store.name != params.uname){
              return <View style={{marginHorizontal:4}}>
                 <Text style={{color:'green'}}>
                 {JSON.stringify(store.name)} is typing
                  </Text>
               </View>
            }
            else {
              console.log('not typ')
            }
          })

        })

      }



          /*  if(this.state.typing == true){
            return <View style={{marginHorizontal:4}}>
               <Text>
               User is typing
                </Text>
             </View>
           }
           else {
             console.log('not typ')
           }*/



    listenForItems(chatRef) {
        const { params } = this.props.navigation.state;
        var user = firebase.auth().currentUser;
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
            var avatar = 'https://www.gravatar.com/avatar/' + ( child.val().uid == user.uid? md5(user.email) : md5(params.email))
              var username = params.uname
                var imagelink = params.image
                console.log(username)
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    name: JSON.stringify(username),
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        //aded
                        _id: child.val().uid,
                        name: username,
                        avatar: imagelink,

                    }
                });
            });

            this.setState({
                messages: items,
            })
        });
        }


    generateChatId() {
        const { params } = this.props.navigation.state;

        var user = firebase.auth().currentUser;
        //console.log(user.uid)
        //console.log(params.goid)
        if(user.uid > params.uid)
        return `${user.uid}-${params.uid}`
    else
        return `${params.uid}-${user.uid}`

    }

    toggle(props){
      const { params } = this.props.navigation.state;

          if(props.length > 0){
         firebase.database().ref().child('TypingStatus').set({isTyping:true,who:params.uname})
            //this.setState({typing:true})
    }
  }


    componentDidMount(){
        this.listenForItems(this.chatRefData);

    }

    componentWillMount() {

      }

      componentWillUnmount(){
          this.chatRefData.off()
      }


      onSend(messages = []) {
        var user = firebase.auth().currentUser;

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
              Istyping:false,
                _id: now,
                text: message.text,
                createdAt: now,
                uid: user.uid,
                order: -1 * now
            })
        })

    }







    render() {
        return (
            <View style={styles.container}>

            <GiftedChat
                messages={this.state.messages}
                placeholder="Type a message.."
                onSend={this.onSend.bind(this)}
                user={{
                    _id: this.user.uid,
                    name: this.state.userName
                }}
              renderFooter={() => this.renderFooter()}
               onInputTextChanged={(text) => this.toggle(text)}

                />
      </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F2F9FF'

    },
});

//make this component available to the app
export default Chat;

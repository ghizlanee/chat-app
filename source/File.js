import React,{Component} from 'react';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import {
  View,
  Text,
  Button
}from 'react-native';
import firebase from 'react-native-firebase';

class File extends Component{
openPicker(){
  DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
      this.setState({uri:res.uri})

      var mime = res.type


      const imageRef = firebase.storage().ref(`/FileTest/}`) //created a ref to firebase storage where user doc will be stored
       const uploadUri = res.uri // in case this app runs on ios too

       return imageRef.putFile(uploadUri).then(() => {
                     return imageRef.getDownloadURL();
                      //stored on firebase and get a link for image
                      }).then((url) => {
                          console.log(url)
                      {/*  var database = firebase.database(); //made a ref to db
                        database.ref('Friends/'+user.uid).update({
                            image : url
                          });*/}

                        console.log('file uploaded')
                      })
                      //done uploading image to user profile ..ok ok
    });








  }
//cool ?yes  it's all ?now it opened file picker for us , we pick file and  it returns important data about file

  render(){
    return(
      <View>
       <Button onPress={()=>this.openPicker()} title="Open Picker" />
      </View>
    );
  }
}
export default File;

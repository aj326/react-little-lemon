import { Text,TextInput ,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from "react";
//trouble getting data from asyncstorage
export default function Profile(){
    // const [data,setData]=useState({})
    // useEffect(getData)
    // const getData =  ()=>{ 
        
    //     let dataFromAsync = AsyncStorage.multiGet(['name','email']).then(response =>{
    //         console.warn(response[0][0],response[0][1])
            
    //     })
    // }

    // // AsyncStorage.clear()
    // console.log(data)
    // console.log(userdata)
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1,paddingTop:50,backgroundColor:'#dee3e9'}}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <Text>Profile</Text>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
    
}
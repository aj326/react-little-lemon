import { Text,TextInput ,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
     View} from "react-native";
import  Header from "./Header";
import Body from "./Body";

export default function OnBoarding(){
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1,paddingTop:40,backgroundColor:'#dee3e9'}}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <Header style={{flex:0.2}}/>
            <Body/>
            </>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
    
}
import {
    Text, TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    View, 
    Pressable
} from "react-native";
import validator from "validator";
import { useState } from "react"
import { Header } from "./Header";
import { defaultStyles } from "./defaultStyles";



export default function OnBoarding({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [name, setName] = useState("");
    const { setUserData} = route.params;


    //not very functional, can be improved
    function validateAndSetEmail(string) {
        let isValid = validator.isEmail(string)
        if (isValid) {
            setEmail(string)
        }
        setEmailValid(isValid)
    }
    function validateAndSetUser(string) {
        if (string) {
            let isValid = validator.isAlpha(string)
            if (isValid) {
                setName(string)
            }
            setNameValid(isValid)


        }
    }
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={defaultStyles.rootContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <Header style={{ flex: 0.2 }}/>
                    <View style={defaultStyles.bodyContainer}>
                        <View style={defaultStyles.inner}>
                            <Text style={defaultStyles.header}>
                                Let us get to know you
                            </Text>
                            <TextInput placeholder="First Name" style={defaultStyles.textInput} onChangeText={value => validateAndSetUser(value.trim())} />
                            {!nameValid && name != "" && <Text style={defaultStyles.textError}>Name is invalid</Text>}
                            <TextInput placeholder="Email" style={defaultStyles.textInput} keyboardType="email-address" onChangeText={value => validateAndSetEmail(value.trim())} />
                            {!emailValid && email != "" && <Text style={defaultStyles.textError}>Email is invalid</Text>}
                        </View>
                        <View style={defaultStyles.btnArea}>



                            {nameValid && emailValid &&
                                <Pressable style={defaultStyles.button} onPress={
                                    ()=>
                                    setUserData({name,email})
                                }>
                                    <Text style={defaultStyles.buttonText}>Next</Text>
                                </Pressable>


                            }
                        </View>
                    </View>
                </>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )

}


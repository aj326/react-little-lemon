import {
    Text, TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    View, StyleSheet, Image,
    Pressable
} from "react-native";
import Body from "./Body";
import logo from '../../img/LittleLemonLogo.png'
import validator from "validator";
import { useState } from "react"


function Header() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="center" />
            <Text style={styles.text}>Little Lemon</Text>
        </View>
    )
}


export default function OnBoarding() {
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [name, setName] = useState("");

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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, paddingTop: 40, backgroundColor: '#dee3e9' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <Header style={{ flex: 0.2 }} />
                    <View style={styles.bodyContainer}>
                        <View style={styles.inner}>
                            <Text style={styles.header}>
                                Let us get to know you
                            </Text>
                            <TextInput placeholder="First Name" style={styles.textInput} onChangeText={value => validateAndSetUser(value.trim())} />
                            {!nameValid && name != "" && <Text style={styles.textError}>Name is invalid</Text>}
                            <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" onChangeText={value => validateAndSetEmail(value.trim())} />
                            {!emailValid && email != "" && <Text style={styles.textError}>Email is invalid</Text>}
                        </View>
                        <View style={styles.btnArea}>



                            {nameValid && emailValid &&
                                <Pressable style={styles.button} onPress={() => null}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </Pressable>


                            }
                        </View>
                    </View>
                </>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    bodyContainer:{
        flex:1

    },
    container: {
        // flex: 1,
        backgroundColor: '#dee3e9',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //   display:''
    },
    logo: {
        height: 100,
        width: 100
    },
    text: {
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 20,
        fontSize: 20,
        color: '#43504d',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 5
    }, inner: {
        padding: 24,
        flex: 0.8,
        justifyContent: 'space-around',
        backgroundColor: "#cbd2d9",
        marginTop: 10

    },
    footerContainer: {
        flex: 0.2,
        backgroundColor: 'green'

    },
    header: {
        fontSize: 30,
        marginBottom: 48,
        color: '#314551'
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#314551',
        marginBottom: 36,
    },
    btnArea: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingEnd: 50,
        alignItems: "flex-end",
        backgroundColor: '#f1f4f7'
    },
    textError: {
        color: "#ec644b",
        fontWeight: "bold"
    },
    button: {
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#cbd2d9',
        backgroundColor: '#cbd2d9',
        borderRadius: 10,
    },
    buttonText: {
        color: '#667884'
    }
});
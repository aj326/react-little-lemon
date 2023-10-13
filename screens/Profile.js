import {
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    View,
    Image,
    StyleSheet
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Avatar } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import validator from "validator";

//trouble getting data from asyncstorage
export default function Profile({ navigation, route }) {
    const [isChecked_01, setChecked_01] = useState(false);
    const [isChecked_02, setChecked_02] = useState(false);
    const [isChecked_03, setChecked_03] = useState(false);
    const [isChecked_04, setChecked_04] = useState(false);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [lastnameValid, setLastnameValid] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [phoneValid, setPhoneValid] = useState(false)
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const userData = route.params.userData;
    const [image, setImage] = useState(null);

    function validateField(string, field, flag) {
        let isValid = false;
        switch (field) {
            case setEmail: {
                isValid = validator.isEmail(string);
                console.log("setEmail", string, field, flag)
                break
            }
            case setPhone: { console.log(string.replace(/\D/g, '')); isValid = validator.isMobilePhone(string.replace(/\D/g, ''), 'en-US'); console.log(isValid); break }
            case setName:  isValid = validator.isAlpha(string);
            case setLastname: isValid = validator.isAlpha(string);
        }
        if (isValid) {
            field(string)
            console.log("field()", string, field, flag, isValid)
        }
        flag(isValid)
        console.log("flag()", isValid, string, field, flag, email, phone, name, lastname)


    }
    // useEffect(() => getData,[])
    const getData = async () => {
        console.log("getting data")
        if (!loaded) {
            console.log("calling multi get")
            AsyncStorage.multiGet(['lastname', 'phone', 'image']).then(response => {
                setLastname(response[0][1])
                setPhone(response[1][1])
                setImage(response[2][1])
            }).catch(e => console.error("error getting lastname and phone from async: ", e))

            console.log("concluded multi get", lastname, phone, image)
            console.log("getting from name and email from props")
            setName(userData.name)
            setNameValid(true)
            setEmail(userData.email)
            setEmailValid(true)
            setLoaded(true)
        }
    }
    const storeData = async () => {
        console.log(email, phone, name, lastname)
        if(
            email !=null&&
            phone !=null&&
            name !=null&&
            lastname !=null
        ){
            console.log("all not null ... proceeding")
        }

        // await AsyncStorage.multiSet([
        //     ['name',name],
        //     ['email'],email,
        //     ['lastname', lastname],
        //     ['phone',phone]
        // ]).catch(e =>console.error(`error storing data to async: ${e}. name: ${name}, email: ${email}, lastname: ${lastname}, phone: ${phone}`))
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            try {
                await AsyncStorage.setItem('image', result.assets[0].uri)
            }
            catch (e) {
                console.error("error storing image", e)
            }
        }
    };
    // TODO
    // Back button (INACTIVE)
    // Profile image (NEED to retrieve image)
    // Pressist Changes
    // Logout
    // console.log(!lastnameValid && (lastname != "" ))
    console.log("logic ops",phone!=null&&(!phoneValid && (phone != "")),phone)
    getData()
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View >
                    <Text style={styles.headerText}>Personal Information</Text>
                    <Text style={styles.subText}>Avatar</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {
                            image == null
                                ?
                                <Avatar size={96} rounded title={name[0]} containerStyle={{ backgroundColor: "#495e57" }} />
                                :
                                <Image resizeMode="center" source={{ uri: image }} style={styles.image} />
                        }
                        <Pressable style={styles.changeButton} onPress={pickImage}>

                            <Text style={styles.buttonText}>Change</Text>

                        </Pressable>
                        <Pressable style={styles.removeButton}>
                            <Text style={styles.buttonText}>Remove </Text>
                        </Pressable>

                    </View>
                    <View style={styles.textInputFieldsContainer}>

                        <Text style={styles.fieldText}>First Name</Text>
                        <TextInput style={styles.textInput} defaultValue={name} keyboardType="default" onChangeText={val => validateField(val, setName, setNameValid)} />
                        {!nameValid && name != "" && <Text style={styles.textError}>First Name is invalid</Text>}

                        <Text style={styles.fieldText}>Last Name</Text>
                        <TextInput style={styles.textInput} keyboardType="default" onChangeText={val => validateField(val, setLastname, setLastnameValid)} />
                        {lastname!=null && (!lastnameValid && (lastname != "")) && <Text style={styles.textError}>Last Name is invalid</Text>}



                        <Text style={styles.fieldText} >Email</Text>
                        <TextInput style={styles.textInput} keyboardType="email-address" defaultValue={email} onChangeText={val => validateField(val, setEmail, setEmailValid)} />
                        {!emailValid && email != "" && <Text style={styles.textError}>Email is invalid</Text>}

                        <Text style={styles.fieldText}>Phone Number</Text>
                        <MaskedTextInput style={styles.textInput}
                            mask="(999) 999-9999"
                            keyboardType="phone-pad" onChangeText={val => validateField(val, setPhone, setPhoneValid)} />
                        {(phone!=null&&(!phoneValid && (phone != ""))) && <Text style={styles.textError}>Phone is invalid</Text>}


                    </View>

                    <Text style={styles.headerText}>Email notifications</Text>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked_01}
                            onValueChange={setChecked_01}
                            color={isChecked_01 ? '#495e57' : undefined}
                        />
                        <Text>Order Statuses</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked_02}
                            onValueChange={setChecked_02}
                            color={isChecked_02 ? '#495e57' : undefined}
                        />
                        <Text>Password changes</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked_03}
                            onValueChange={setChecked_03}
                            color={isChecked_03 ? '#495e57' : undefined}
                        />
                        <Text>Special offers</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked_04}
                            onValueChange={setChecked_04}
                            color={isChecked_04 ? '#495e57' : undefined}
                        />
                        <Text>Newsletter</Text>
                    </View>
                    <Pressable style={styles.logoutButton} onPress>

                        <Text style={styles.buttonTextLogout}>Logout</Text>

                    </Pressable>
                    
                    {(email !=null&&phone !=null&&name !=null&&lastname !=null)&&<View style={{
                        flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, marginHorizontal: 25
                    }}>

                        <Pressable style={styles.discardChangesButton} onPress>

                            <Text style={styles.buttonText}>Discard Changes</Text>

                        </Pressable>
                        
            <Pressable style={styles.saveChangesButton} onPress={storeData}>
                            <Text style={styles.buttonText}>Save Changes </Text>
                        </Pressable>

                    </View>}

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 96,
        height: 96,
        borderRadius: 200
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    textInputFieldsContainer: {
        paddingTop: 30,

    },
    textError: {
        color: "#ec644b",
        fontWeight: "bold",
        marginBottom: 1,
        marginTop: -5
    },
    checkboxContainer:
        { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#314551',
        marginBottom: 16,
        marginLeft: 3,
        paddingLeft: 10,
        borderRadius: 10
    },
    headerText: {
        fontWeight: "500",
        marginVertical: 10,

    },
    checkbox: {
        marginVertical: 4,
        marginHorizontal: 16
    },
    subText: {
        color: '#acaebd',
        fontWeight: '600',
        marginBottom: 5,
        fontSize: 12
    },
    changeButton: {
        height: 50,
        marginTop: 26,
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#495e57',
        backgroundColor: '#495e57',
        borderRadius: 10,
    },
    saveChangesButton: {
        // height: 50,
        marginTop: 10,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#495e57',
        borderRadius: 10,
    },
    discardChangesButton: {
        // height: 50,
        marginTop: 10,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#495e57',
        backgroundColor: '#495e57',
        borderRadius: 10,
    },
    logoutButton: {
        // height: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#e3b633',
        backgroundColor: '#f4ce14',
        borderRadius: 10,
    },
    removeButton: {
        height: 50,
        marginTop: 26,
        marginRight: 5,
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#495e57',
        borderRadius: 10,
    },
    buttonText: {
        color: '#a8b1ae',
        fontWeight: 'bold'
    },
    buttonTextLogout: {
        color: 'black',
        fontWeight: 'bold'
    },
    fieldText: {
        paddingBottom: 5,
        fontWeight: '400',

    }

})
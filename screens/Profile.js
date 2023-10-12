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
import { Avatar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
//trouble getting data from asyncstorage
export default function Profile({ navigation, route }) {
    const userData = route.params.userData;
    const [image, setImage] = useState(null);
    console.log(userData)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    // TODO
    // Valid phone number
    // Back button (INACTIVE)
    // Profile image
    // Checkboxes (INACTIVE)
    // Pressist Changes
    // Logout

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View >
                    <Text style={styles.headerText}>Personal Information</Text>
                    <Text style={styles.subText}>Avatar</Text>


                    {/* make the group below horizontal */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {
                            image == null
                                ?
                                <Avatar size={96} rounded title={userData.name[0]} containerStyle={{ backgroundColor: "#495e57" }} />
                                :
                                <Image resizeMode="center" source={{ uri: image }} style={{ width: 96, height: 96, borderRadius: 200 }} />
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
                        <TextInput style={styles.textInput} placeholder={userData.name} keyboardType="default" />

                        <Text style={styles.fieldText}>Last Name</Text>
                        <TextInput style={styles.textInput} keyboardType="default" />
                        <Text style={styles.fieldText} >Email</Text>
                        <TextInput style={styles.textInput} keyboardType="email-address" placeholder={userData.email} />
                        <Text style={styles.fieldText}>Phone Number</Text>
                        <TextInput style={styles.textInput} keyboardType="phone-pad" />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 50,
        // paddingStart:15,
        paddingHorizontal: 20
    },
    textInputFieldsContainer: {
        paddingTop: 30,


    },
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
        marginBottom: 10,

    },
    subText: {
        color: '#acaebd',
        fontWeight: '600',
        marginBottom: 5
    },
    changeButton: {
        height: 50,
        marginTop: 26,
        // flexBasis:'auto',
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#495e57',
        backgroundColor: '#495e57',
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
        // backgroundColor: '#495e57',
        borderRadius: 10,
    },
    buttonText: {
        color: '#a8b1ae',
        fontWeight: 'bold'
    },
    fieldText: {
        paddingBottom: 5,
        fontWeight: '400',

    }

})
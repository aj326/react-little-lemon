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
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
//trouble getting data from asyncstorage
export default function Profile({ navigation, route }) {
    const [isChecked_01, setChecked_01] = useState(false);
    const [isChecked_02, setChecked_02] = useState(false);
    const [isChecked_03, setChecked_03] = useState(false);
    const [isChecked_04, setChecked_04] = useState(false);
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
    // Profile image (NEED to store image)
    // Checkboxes (INACTIVE) DONE
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
                        <TextInput style={styles.textInput} placeholder={userData.name} keyboardType="default" />

                        <Text style={styles.fieldText}>Last Name</Text>
                        <TextInput style={styles.textInput} keyboardType="default" />
                        <Text style={styles.fieldText} >Email</Text>
                        <TextInput style={styles.textInput} keyboardType="email-address" placeholder={userData.email} />
                        <Text style={styles.fieldText}>Phone Number</Text>
                        <TextInput style={styles.textInput} keyboardType="phone-pad" />
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
                    <Pressable style={styles.logoutButton} onPress={pickImage}>

                        <Text style={styles.buttonTextLogout}>Logout</Text>

                    </Pressable>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginVertical:10,marginHorizontal:25
                     }}>
                        
                        <Pressable style={styles.discardChangesButton} onPress={pickImage}>

                            <Text style={styles.buttonText}>Discard Changes</Text>

                        </Pressable>
                        <Pressable style={styles.saveChangesButton}>
                            <Text style={styles.buttonText}>Save Changes </Text>
                        </Pressable>

                    </View>

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
        marginBottom: 10,

    },
    checkbox: {
        marginVertical: 4,
        marginHorizontal:16
    },
    subText: {
        color: '#acaebd',
        fontWeight: '600',
        marginBottom: 5
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
    saveChangesButton:{
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
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
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
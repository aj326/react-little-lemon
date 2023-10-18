import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import logo from '../img/LittleLemonLogo.png';
import { defaultStyles } from "./defaultStyles";
import { Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';



export function Header({ avatar, name }) {
        const navigation = useNavigation();
    function LittleLemonHeaderLogoAndText() {
        return (
            <View style={{ flexDirection: "row", marginHorizontal: 25, }}>
                <Image source={logo} style={styles.logo} resizeMode="center" />
                <Text style={styles.text}>Little Lemon</Text>
            </View>
        )
    }
    return (

        <View style={avatar != null ? styles.headerContainer : defaultStyles.container}>
            {avatar != null ?
                <>
                    <LittleLemonHeaderLogoAndText />
                    <Pressable onPress={() => navigation.navigate('Profile')}>
                        <Image resizeMode="center" source={{ uri: avatar }} style={styles.profileAvatarImage} />
                    </Pressable>
                </>
                :
                <>
                    <LittleLemonHeaderLogoAndText />
                    <Pressable onPress={() => navigation.navigate('Profile')}>
                        <Avatar size={64} rounded title={`${name[0]}`} containerStyle={{ backgroundColor: "#495e57" }} />
                    </Pressable>
                </>
            }
        </View>
    );
}
const styles = StyleSheet.create(
    {
        headerContainer: {
            // flex: 1,
            // backgroundColor: '#dee3e9',
            alignItems: "center",
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 7,
            marginTop: 5
            // alignContent:"space-evenly"
            //   display:''
        },
        text: {
            paddingVertical: 25,
            paddingHorizontal: 10,
            fontSize: 10,
            color: '#43504d',
            justifyContent: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: 5
        },
        logo: {
            height: 64,
            width: 64
        },
        profileAvatarImage: {
            width: 64,
            height: 64,
            borderRadius: 200
        },
    }

)
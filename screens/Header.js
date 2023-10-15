import { Text, View, Image, StyleSheet } from "react-native";
import logo from '../img/LittleLemonLogo.png';
import { defaultStyles } from "./defaultStyles";


export function Header({ avatar }) {
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
                    <Image resizeMode="center" source={{ uri: avatar }} style={styles.profileAvatarImage} />
                </>
                :
                <LittleLemonHeaderLogoAndText />
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
            paddingHorizontal: 15
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
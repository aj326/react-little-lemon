import { StyleSheet,Image,View,Text } from "react-native";
import logo from '../../img/LittleLemonLogo.png'

export default function Header(){
    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="center"/>
            <Text style={styles.text}>Little Lemon</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#dee3e9',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    //   display:''
    },
    logo:{
        height:100,
        width:100
    },
    text:{
    paddingTop: 30,
      paddingBottom:20,
      paddingLeft:20,
      fontSize: 20,
      color: '#43504d',
      justifyContent: 'center',
      textTransform:'uppercase',
      fontWeight:'bold',
      letterSpacing:5
    }
  });
import { View, Text, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { Header } from "./Header";
import { defaultStyles } from "./defaultStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import hero from "../img/HeroImage.jpg";
import placholder from "../img/Placeholder_view_vector.png"
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';



export default function Home({ route }) {
    const [dataFromAPI, setDataFromAPI] = useState(null)
    const baseUrl = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    let [avatarImage, setAvatarImage] = useState(null)
    let avatarImageCall = async () => await AsyncStorage.getItem('image').then(response => setAvatarImage(response))
    avatarImageCall()

    const getDataFromAPI = () => {
        console.log("calling axios")
        axios
            .get(baseUrl)
            .then(
                response => setDataFromAPI(response.data.menu.map((x) =>
                    ({ ...x, image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${x.image}?raw=true` }))))
            .catch(e => console.error("Error while grabbing data from API", e))
            .finally(response => console.log(response))

    }
    useEffect(() => { getDataFromAPI(); }, [])
    console.log("finished calling axios", dataFromAPI)


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const Item = ({ title, image, description, price }) => {
        // console.log("image",image)
        return (
            <View >
                <Text style={styles.itemTitleText}>{title}</Text>
                <View style={styles.itemDetailsContainer}>
                    <View style={{ 
                        flex:0.9,
                        flexDirection: "column",
                     justifyContent: "space-between", marginBottom: 5
                      }}>
                        <Text numberOfLines={2} style={styles.descriptionText}>{description}</Text>
                        <Text style={styles.priceText}>${price}</Text>
                    </View>
                    <Image alt={title} source={{uri: image}} defaultSource={placholder} style={styles.image} resizeMode="cover" />
                </View></View>
        );
    }
    function MenuCategories() {
        return (
            <View>
                <Text style={styles.sectionText}>order for delivery!</Text>
                <View style={styles.menuCategories}>
                    <Pressable style={styles.categoryBtn}>
                        <Text style={styles.categoryBtnText}>Starters</Text>
                    </Pressable>
                    <Pressable style={styles.categoryBtn}>
                        <Text style={styles.categoryBtnText}>Mains</Text>
                    </Pressable>
                    <Pressable style={styles.categoryBtn}>
                        <Text style={styles.categoryBtnText}>Desserts</Text>
                    </Pressable>
                    <Pressable style={styles.categoryBtn}>
                        <Text style={styles.categoryBtnText}>Drinks</Text>
                    </Pressable>

                </View>
            </View>
        )
    }

    function HeroCardWithSearch() {
        return (
            <View style={styles.heroContainer}>
                <Text style={styles.titleText}>Little Lemon</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                    <View style={{ flexDirection: "column", flex: 0.75 }}>
                        <Text style={styles.subTitleText}>Chicago</Text>
                        <Text style={styles.copyText}>We are a family owned restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <Image source={hero} style={styles.heroImage} resizeMode="cover" />
                </View>

                <Ionicons name="search-circle" size={64} color="#edefee" />

            </View>
        )
    }

    // console.log(avatarImage)
    return (
        <View style={defaultStyles.rootContainer}>
            <Header style={defaultStyles.header} avatar={avatarImage} />
            <HeroCardWithSearch />
            <MenuCategories />
            {/* <MenuItems/> */}
            <FlatList
                data={dataFromAPI}
                renderItem={({ item }) => <Item title={item.name} image={item.image} description={item.description} price={item.price} />}
                keyExtractor={item => item.name}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    descriptionText:{
color:"#495e57"
    },
    priceText:{
        color:"#495e57",
        fontWeight:"600"

            },

    itemTitleText: {
        fontWeight: '700',
        letterSpacing: 1,
        paddingStart:10,
        marginBottom:5,
        paddingTop:10
    },
    itemDetailsContainer: {
        // flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal:15,
        // marginBottom:15,
        borderBottomWidth:0.2,
        borderColor:"grey"
    },
    heroContainer: {
        marginTop: 5,
        backgroundColor: '#495e57',
        padding: 15,

    },
    menuCategories: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    titleText: {
        color: "#f4ce14",
        fontWeight: "bold",
        fontSize: 30
    },
    subTitleText: {
        color: "#edefee",
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 25
    },
    copyText: {
        color: "#edefee",
        // fontWeight: "bold",
        fontSize: 14,
        flexWrap: 'wrap',
    },
    heroImage: {
        height: 150,
        width: 150,
        alignSelf: "flex-end",
        borderRadius: 10
    },
    categoryBtn: {
        borderRadius: 15,
        backgroundColor: "#edefee",
        padding: 10,
    },
    categoryBtnText: {
        color: "#495e57",
        fontWeight: "bold"
    },
    sectionText: {
        paddingTop: 30,
        paddingBottom: 10,
        // paddingLeft: 20,
        fontSize: 20,
        color: '#000000',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 2
    },
    image:
    {
        height: 96,
        width: 96,
        alignSelf: "flex-end"
    }

})
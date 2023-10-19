import { View, SafeAreaView, Text, StyleSheet, Image, Pressable, FlatList, ScrollView ,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView} from "react-native";
import { Header } from "./Header";
import { defaultStyles } from "./defaultStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect,useRef ,useCallback,useMemo} from "react";
import hero from "../img/HeroImage.jpg";
import placholder from "../img/Placeholder_view_vector.png"
import { Ionicons } from '@expo/vector-icons';
import Splash from "./Splash";
import { Alert } from "react-native";
import { storeDataToDB, createTable, dropTable, getDataFromDB,filterByQueryAndCategories } from "../database";
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';



function HeroCardWithSearch({...rest}) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.heroContainer}>

            <Text style={styles.titleText}>Little Lemon</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                <View style={{ flexDirection: "column", flex: 0.75 }}>
                    <Text style={styles.subTitleText}>Chicago</Text>
                    <Text style={styles.copyText}>We are a family owned restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <Image source={hero} style={styles.heroImage} resizeMode="cover" />
            </View>
            <Searchbar
    {...rest}
    placeholder="Search"
    placeholderTextColor="#495e57"
    
    style={styles.searchBar}
    iconColor="#495e57"
    inputStyle={{ color: '#495e57' }}
    elevation={0}
  />

            </View>
            </TouchableWithoutFeedback>

</KeyboardAvoidingView>

    )
}



export default function Home({ route }) {
    const [data, setData] = useState(null)
    const [categories,setCategories]=useState([])
    // const [selectedCategories,setSelectedCategories]=useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [initLoad,setInitLoad]=useState(false)
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    const [avatarImage, setAvatarImage] = useState(null)
    const userData = route.params.userData;
    const [filterSelections, setFilterSelections] = useState(null)
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const avatarImageCall = async () => await AsyncStorage.getItem('image').then(response => setAvatarImage(response))

    avatarImageCall()

    function useUpdateEffect(effect, dependencies = []) {
        const isInitialMount = useRef(true);

        useEffect(() => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                return effect();
            }
        }, dependencies);
    }
    const handleFiltersChange = async (item) => {
        const arrayCopy = {...filterSelections};
        arrayCopy[item] = !filterSelections[item];
        setFilterSelections(arrayCopy);
      };

    useEffect(() => {
        (async () => {
            try {
                // await dropTable()

                // 1. Create table if it does not exist
                await createTable();
                // 2. Check if data was already stored
                let menuItems = await getDataFromDB();
                // console.log(menuItems, menuItems.length, "after getDataFromDB")

                if (!menuItems.length) {
                    // console.log("fetching")
                    // Fetching menu from URL
                    const response = await fetch(API_URL);
                    menuItems = await response.json();
                    menuItems = menuItems.menu
                    console.log(menuItems, "after fetch")

                    // Storing into database
                    storeDataToDB(menuItems);

                }
                console.log("setting variables")

                setData(menuItems);
                setCategories([... new Set(menuItems.map(x=>x.category))])
                // setFilterSelections()
                // console.log([...new Set(menuItems.map(x=>x.category))],categories)
                const filters = categories.reduce((o, key) => ({ ...o, [key]: false}), {})
                setFilterSelections(filters)
                setIsLoading(false)
                setInitLoad(true)
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, [isLoading]);

    useUpdateEffect(() => {
        (async () => {

          const activeCategories = categories.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (categories.every((item) => filterSelections[item] === false)) {
            // console.log("all false, returning true")
              return true;
            }
            // console.log("returning filterSelections[categories[i]]",filterSelections[categories[i]])

            return filterSelections[categories[i]];
          });
          console.log(activeCategories,"activeCategories")
          try {
            const filteredItems = await filterByQueryAndCategories(
              query,
              activeCategories
            );
            // console.log(filteredItems,"menuitems after filter")
            setData(filteredItems);
          } catch (e) {
            console.log("odd error ... correct sql but still promise returns callback error",e.message)
          }
        })();
      }, [filterSelections, query]);
    
      const lookup = useCallback((q) => {
        setQuery(q);
      }, []);
      const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

      const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };
    

    const Item = ({ title, image, description, price, category }) => {
        // console.log("category",category)
        return (
            <View>
                <Text style={styles.itemTitleText}>{title}</Text>
                <View style={styles.itemDetailsContainer}>
                    <View style={{
                        flex: 0.9,
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginBottom: 5
                    }}>
                        <Text numberOfLines={2} style={styles.descriptionText}>{description}</Text>
                        <Text style={styles.priceText}>${price}</Text>
                    </View>
                    <Image alt={title} source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }} defaultSource={placholder} style={styles.image} resizeMode="cover" />
                </View></View>
        );
    }

    function capitalizeText(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
   
    function MenuCategories() {
        return (
            <View>
                <Text style={styles.sectionText}>order for delivery!</Text>

                <ScrollView contentContainerStyle={styles.menuCategories} horizontal={true}>
                    {            categories.map(item=>    
                                <Pressable style={filterSelections[item]?styles.categoryBtnSelected:styles.categoryBtnNotSelected} onPress={()=>handleFiltersChange(item)}>
                        <Text style={styles.categoryBtnText}>{capitalizeText(item)}</Text>
                    </Pressable>
                    )}
                    { console.log("filterSelections",filterSelections)}
                    {/* <Pressable style={styles.categoryBtn}>
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
                    </Pressable> */}

                    
                </ScrollView>
            </View>

        )
    }


    if (!initLoad) {
        return (<Splash />)
    }
    // console.log(new Set(data.map(x=>x.category))) 
    return (
        <SafeAreaView style={defaultStyles.rootContainer}>
            <Header style={defaultStyles.header} avatar={avatarImage} name={userData.name} />
            <HeroCardWithSearch 
            onChangeText={handleSearchChange}
            value={searchBarText} />
            <MenuCategories />
            {/* <MenuItems/> */}
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item.name} image={item.image} description={item.description} price={item.price} category={item.category} />}
                keyExtractor={item => item.name}
                refreshing={isLoading}
                onRefresh={()=>setIsLoading(true)}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    descriptionText: {
        color: "#495e57"
    },
    priceText: {
        color: "#495e57",
        fontWeight: "600"

    },

    itemTitleText: {
        fontWeight: '700',
        letterSpacing: 1,
        paddingStart: 10,
        marginBottom: 5,
        paddingTop: 10
    },
    itemDetailsContainer: {
        // flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 15,
        // marginBottom:15,
        borderBottomWidth: 0.2,
        borderColor: "grey"
    },
    heroContainer: {
        paddingTop: 5,
        backgroundColor: '#495e57',
        padding: 15,

    },
    menuCategories: {
        // flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-evenly",
        // paddingBottom: 8,
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
    categoryBtnSelected: {
        borderRadius: 15,
        backgroundColor: "#f4ce14",
        padding: 10,
        marginHorizontal:10
    },  
    searchBar: {
        backgroundColor: '#edefee',
        shadowRadius: 0,
        shadowOpacity: 0,

        
      },
    categoryBtnNotSelected: {
        borderRadius: 15,
        backgroundColor: "#edefee",
        padding: 10,
        marginHorizontal:10
    },
    categoryBtnText: {
        color: "#495e57",
        fontWeight: "bold"
    },
    sectionText: {
        paddingVertical: 12,
        paddingLeft: 10,
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
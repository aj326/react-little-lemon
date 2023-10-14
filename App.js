import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import OnBoarding from './screens/OnBoarding';
import Splash from './screens/Splash'
import Profile from './screens/Profile';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(null);
  const [fromStorage, setFromStorage] = React.useState(false)
  const getData = async () => {
    if (userData) {
      console.log(userData, "<<< userData available")
      console.log(fromStorage, "<<<< fromstorage ... we dont need to store again if value is true")
      if (!fromStorage) {
        try {
          await AsyncStorage.multiSet([
            ['name', userData.name],
            ['email', userData.email]
          ]);
          console.log("stored")
          // setUserData({name,email})
        } catch (e) {
          console.error("error in storing data to async", e)
        }
      }
    }
    else {
      console.log(userData, "<<< null ... will check storage")

      let data = null;
      let email;
      let name;
      try {
        //hmmm
        email = await AsyncStorage.getItem('email');
        name = await AsyncStorage.getItem('name');
        console.log("got it from storage ... user data", email, name)
      } catch (e) {
        console.error("error in getting data from async", e)
      }
      finally {
        if (email && name) { setFromStorage(true); setUserData({ name, email }); }

      }
    }
    setIsLoading(false)
  }



  React.useEffect(() => {
    getData();
  }, [userData]);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }

  console.log("before retrun", userData)

  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
    headerShown: false
  }}>
        {userData == null ? (
          // No token found, user isn't signed in

          <Stack.Screen
            name="Onboarding"
            component={OnBoarding}
            options={{
              title: 'OnBoarding',
            }}
            initialParams={{ setUserData }}
          />

        ) : (
          // User is signed in
          //passing userdata for now, ideally would pass an id for a db access
          <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Profile" component={Profile} initialParams={{userData,setUserData}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

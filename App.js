import react,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/homescreen';
import LoadingScreen from './src/screens/loadingscreen';
import PassengerScreen from './src/screens/passengerScreens';
import { renderInitialScreen } from './src/utils/helpers';
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
const {Navigator , Screen}=createNativeStackNavigator()

export default function App() {
  const [loading,setLoading]=useState(true)
  const [initialScreen,setInitialScreen]=useState('LoadingScreen')
  const loadRessource=async()=>{
    try{
      const result=await Promise.all([
         Font.loadAsync({
          'Poppins':require('./assets/fonts/Poppins-Regular.ttf'),
          'LeckerliOne':require('./assets/fonts/LeckerliOne-Regular.ttf')
        }),
         renderInitialScreen(),
        Permissions.askAsync(Permissions.LOCATION)
      ])
      const route=result[1]
      const status=result[2].status

      if(status==="granted"){
        setInitialScreen(route)
        setLoading(false)
      }
    }catch(e){
      console.error('cannot load ressources',e)
    }
  }

  useEffect(()=>{
    loadRessource()
  },[])

  if(loading){
    return(
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Navigator initialRouteName={initialScreen} screenOptions={{headerShown:false}}>
        <Screen name="LoadingScreen" component={LoadingScreen} />
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Passenger" component={PassengerScreen} />
      </Navigator>
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

import { Platform, AsyncStorage } from "react-native";
import * as Google from 'expo-google-app-auth'
import polyline from "@mapbox/polyline";
import axios from 'axios'
export const prefix = Platform.OS === 'ios' ? 'ios' : 'md'
export const config = {
    iosClientId: `696014237424-c2ktd6poskna4u4nupnee9gcqqav9ni1.apps.googleusercontent.com`,
    androidClientId: `696014237424-vcgq81d80f0a55p7kbqm8vanp3ukn1rc.apps.googleusercontent.com`,
    iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
};

export const auth = async () => {
    try {
        const { user, type } = await Google.logInAsync(config)
        //console.log('result',result)
        if (type == 'success') {
            //stocker dans database`

            //stocker internal memory

            const { name, photoUrl, email } = user
            await AsyncStorage.setItem('user', JSON.stringify({
                name,
                photoUrl,
                email
            }))

            //naviguer vers ecran home

            console.log('naviguer vers ecran home')
        }
    } catch (e) {
        console.error('Error Auth', e)
    }
}

export const renderInitialScreen = async () => {
    try {
        const user = AsyncStorage.getItem('user')
        JSON.parse(user)
        return user ? 'Home' : 'LoadingScreen'
    } catch (e) {
        console.error('Error render initial screen', e)
    }
}

export const API_KEY="AIzaSyA5Y3uFtTByKtnx7WiR9WUeDdeERjvUsKk"
export const BASE_URL="https://maps.googleapis.com/maps/api"
export const getRoute=async(url)=>{
    try{
        const {data:{routes}}=await axios.get(url)
        const point=routes[0].overview_polyline.points
       return point
    }catch(error){
        console.log(error)
    }
}

export const decodePoint=point=>{
    const fixPoint=polyline.decode(point)
    //console.log('fixpoint',fixPoint)
    const route=fixPoint.map(fixpoint=>{
        return {
            latitude:fixPoint[0],
            longitude:fixpoint[1]
        }
    })

    console.log('route',route)
    return route
}
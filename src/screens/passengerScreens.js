import react, { useState, useEffect } from 'react'
import MapView,{Polyline} from 'react-native-maps'
import * as Location from 'expo-location'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import Constants from 'expo-constants'
import PlaceInput from '../components/placeinput'
import { API_KEY, BASE_URL ,getRoute,decodePoint } from '../utils/helpers'
import polyline from '@mapbox/polyline'
const initialState = { latitude: null, longitude: null, coordinates:[] ,destinationCoords:null}
const PassengerScreen = (props) => {
    const { container, map } = styles
    const [state, setState] = useState(initialState)
    const { latitude, longitude ,coordinates,destinationCoords } = state
    const getUserLocation = async () => {
        try {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
            setState(prevState => ({
                ...prevState,
                latitude,
                longitude
            }))

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getUserLocation()
    }, [])

    if (!latitude && !longitude) {
        return (
            <View style={container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    const handlePredictionPress=async(place_id)=>{
        try{
            const url=`${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`
            const point=await getRoute(url)
            //console.log(point)
            decodePoint(point)
            //console.log('url 11',url)
            setState(prevState=>({
                ...prevState,
                coordinates,
                destinationCoords:coordinates[coordinates.length-1]
            }))
        }catch(error){
            console.error(error)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={container}>
                <MapView style={map} showsUserLocation followsUserLocation region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.121
                }} >
                    {true && (
                        <Polyline coordinates={coordinates}  strokeColor="#000" lineDashPattern={[1]} />
                    )}
                </MapView>
                <PlaceInput latitude={latitude} longitude={longitude} onPredictionPress={handlePredictionPress}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default PassengerScreen
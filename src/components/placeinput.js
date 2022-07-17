import react,{useState} from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    ActivityIndicator
}from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { prefix , BASE_URL , API_KEY } from '../utils/helpers'
import axios from 'axios';
import Predictions from './predictions';
const {width}=Dimensions.get('window')

const initialState={
    place:"",
    predictions:[],
    loading:false
}
const PlaceInput=({latitude,longitude,onPredictionPress})=>{
    const [state,setState]=useState(initialState)
    const {container,ico,input,inputContainer}=styles
    const {place,loading,predictions}=state
    const Search=async(url)=>{
        try{
           const {data:{predictions}} = await axios.get(url)
        setState(prevState=>({
            ...prevState,
            predictions,
            loading:false
        }))
        }catch(e){
            console.error(e)
        }
    }

    const renderPrediction=()=>{
        return predictions.map(prediction=>{
            const {structured_formatting,id,place_id}=prediction
            return(
                <Predictions main_text={structured_formatting.main_text} 
                secondary_text={structured_formatting.secondary_text}
                key={id}
                onPress={()=>{
                    onPredictionPress(place_id)
                    setState(prevState=>({
                        ...prevState,
                        predictions:[],
                        place:structured_formatting.main_text
                    }))
                }}
                />
            )
        })
    }
    

    const handleChangeText=value=>{
        setState(prevState=>({
            ...prevState,
            place:value
        }))

        const url=`${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&location=${latitude},${longitude}&radius=2000&language=fr`
        console.log('url',url)

        Search(url)

    }

    return(
        <View style={container}>
            <View style={inputContainer}>
                <TextInput style={input} value={state.place}  onChangeText={handleChangeText} />
                {
                    !loading && <Ionicons style={ico} name={`${prefix}-search`} />
                }
                {
                    loading && <ActivityIndicator  />
                }
                
            </View>
            {
                !loading && predictions.length>0 && renderPrediction()
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
       
        position:'absolute',
        width:width-50,
        backgroundColor:'#fff',
        top:20,
        borderRadius:8,
        paddingHorizontal:10, 
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    ico:{
        fontSize:25,
        color:'#d6d6d6'
    },
    input:{
        fontSize:16,
        color:'#303030',
        maxWidth:'70%',
        minWidth:'30%',
        fontFamily:'Poppins'
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:15
    }
})

export default PlaceInput
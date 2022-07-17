import react from 'react'
import {View,Text,StyleSheet} from 'react-native'

const Title=({content,size})=>{
    const {container,title,small,medium}=styles
    const getSizeTitle=()=>{
        switch(size){
            case 'big':
                return title
            case 'small':
                return small
            case 'medium':{
                return medium
            }
        }
    }
    return (
        <View style={container}>
            <Text style={getSizeTitle()}>{content}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        color:'#fff',
        fontWeight:'bold',
        fontFamily:'LeckerliOne'
    },
    small:{
        color:'rgba(0,0,0,0.6)',
        fontFamily:'Poppins',
        fontSize:20,
        fontWeight:'700',
        lineHeight:28
    },
    medium:{
        fontFamily:'Poppins',
        fontSize:24,
        fontWeight:'bold',
        lineHeight:28

    }
})

export default Title
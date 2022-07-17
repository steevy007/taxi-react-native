import react from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import Logo from '../../assets/images/google.png'
import Title from './title'
const {width}=Dimensions.get('window')
const LoginBtn=({onPress})=>{
    const {container,logo}=styles
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Title size='small' content='Google Connexion' />
                <Image style={logo}  source={Logo} />
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:width-80,
        alignItems:'center',
        height:55,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
        borderColor:'#fff',
        borderRadius:10
    },
    logo:{
        width:40,
        height:40
    }
})

export default LoginBtn
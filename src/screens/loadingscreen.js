import react from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { prefix } from '../utils/helpers'
import Block from '../components/block'
import Title from '../components/title'
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginBtn from '../components/loginBtn'
import { auth } from '../utils/helpers'
const { width } = Dimensions.get('window')
const LoadingScreen = (props) => {


    const { container, icon, container_2 ,titleContainer} = styles
    const handleLogin=()=>{
        auth()
        props.navigation.push('Home')
    }
    return (
        <View style={container}>
            <Block>
                <Ionicons style={icon} name={`${prefix}-car`} />
                <Title content="TAXI APP" size="big" />
            </Block>
            <View style={container_2}>
                <View style={titleContainer}>
                    <Title content="Authentification" size="small" />
                    <Title content="Google Connexion" size="medium" />
                </View>
                <LoginBtn onPress={handleLogin}/>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    container_2: {
        flexGrow: 1,
        width: width,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icon: {
        fontSize: 80,
        color: '#fff'
    },
    titleContainer:{
        width:width-80,
        height:50,
        borderColor:'#000',
        justifyContent:'center',
        alignItems:'flex-start'
    }
})

export default LoadingScreen
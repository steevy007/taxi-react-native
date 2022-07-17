import react from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { prefix } from '../utils/helpers'
import Block from '../components/block'
import Title from '../components/title'
import Ionicons from '@expo/vector-icons/Ionicons';
import RoundBtn from '../components/RoundBtn'

const { width } = Dimensions.get('window')

const HomeScreen = (props) => {


    const { container, icon, container_2, titleContainer,roundBtnContainer } = styles
    const goTo=route=>props.navigation.push(route)

   

    return (
        <View style={container}>
            <Block>
                <Ionicons style={icon} name={`${prefix}-car`} />
                <Title content="TAXI APP" size="big" />
            </Block>
            <View style={container_2}>
                <View style={titleContainer}>
                    <Title content="Bienvenue" size="small" />
                    <Title content="Rechercher un" size="medium" />
                </View>
                <View style={roundBtnContainer}>
                    <RoundBtn iconName={`${prefix}-car`} onPress={()=>goTo("Passenger")}/>
                    <RoundBtn iconName={`${prefix}-person`} />
                </View>

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
    titleContainer: {
        width: width - 80,
        height: 50,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    roundBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:width-80,
        alignItems:'center'
    }
})

export default HomeScreen
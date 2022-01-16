import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const Header = ()=>{
    const image = require('../resources/bg.jpg');
    
    return(
        <View>
            <ImageBackground source={image} style={styles.headerImage}>
                <View style={styles.coverView}>
                    <Text style={styles.headerText}>Lista de Tarefas</Text>
                </View>
            </ImageBackground>
        </View>
    );    

}

const styles = StyleSheet.create({
    headerImage:{
      width: '100%',
      height: 100,
      resizeMode: 'cover',
    },
    coverView:{
      width: '100%',
      height: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderBottomWidth:1,
      borderBottomColor: '#000'
    },
    headerText:{
      textAlign: 'center',
      color: '#fff',
      fontSize: 35,
      marginTop: 29,
      fontFamily: 'Ubuntu_400Regular'
    },
})  


export default Header;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

const Sobre = (props) => {
    const { navigation } = props
    const { route } = props





    useEffect(
        () => {

        }, []
    )




    return (
        <View style={styles.container}>
            <Image source={require('.//img/inovacao.png')}/> 
           <View style={styles.header}>
            <View margin={10}>
              <Text><FontAwesome name="code" size={16} color={vars.cor1} /> Desenvolvido por: Daniel Lins Maciel - 07/2020</Text>
              <Text><FontAwesome name="comment" size={16} color={vars.cor1} /> Suporte: daniel.maciel@medabil.com.br</Text>
            </View>
          </View>
          <View style={styles.header}>
            <View margin={10}>
              <Text>Tecnologias utilizadas:</Text>
              <Text><FontAwesome name="windows" size={16} color={vars.cor1} /> Microsoft .Net Core 2.1 para as APIs</Text>
              <Text><FontAwesome name="database" size={16} color={vars.cor1} /> Oracle MySQL para o banco de dados</Text>
              <Text><FontAwesome name="mobile" size={16} color={vars.cor1} /> React Native With Expo - https://expo.io/</Text>
            </View>
          </View>
          <View style={styles.header}>
            <View margin={10}>
              <Text>Estrutura de Pastas:</Text>
              <Text><FontAwesome name="folder" size={16} color={vars.cor1} /> /src/screen - Telas</Text>
              <Text><FontAwesome name="folder" size={16} color={vars.cor1} /> /src/screen/img - Imagens</Text>
              <Text><FontAwesome name="folder" size={16} color={vars.cor1} /> /src/service - conexões com a API [CRUD]</Text>
            </View>
          </View>

          <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="home" onPress={() => { navigation.replace('Home') }}> Voltar</FontAwesome.Button>
            </View>
        </View>
    );
}
export default Sobre


const styles = StyleSheet.create({
    botao: {
        backgroundColor: vars.cor1,
        textAlign: "right"
    },
    container: {
        flex: 1,
        margin: 10,
    },
    caixaTexto: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginTop: 5,
        textAlign: "right"
    },
    header: {
        margin:5,
        borderWidth: 2,
        borderColor: vars.cor1,
    },

});
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

const FAQ = (props) => {
    const { navigation } = props
    const { route } = props





    useEffect(
        () => {

        }, []
    )




    return (
        <View style={styles.container}>
            <Image source={require('.//img/inovacao.png')} />
            <View style={styles.header}>
                <View margin={10}>
                    <Text><FontAwesome name="question-circle-o" size={16} color={vars.cor1} /> Como faço para criar uma tarefa?</Text>
                    <Text><FontAwesome name="arrow-circle-o-right" size={16} color={vars.cor1} /> Vá até a aba Home, clique em Adicionar tarefa.</Text>
                </View>
                <View margin={10}>
                    <Text><FontAwesome name="question-circle-o" size={16} color={vars.cor1} /> Como faço para selecionar uma Obra?</Text>
                    <Text><FontAwesome name="arrow-circle-o-right" size={16} color={vars.cor1} /> Navegue pelo mapa, clique no ícone da obra desejada. Ao abrir a caixa de descrição da obra, clique na caixa.</Text>
                </View>
                <View margin={10}>
                    <Text><FontAwesome name="question-circle-o" size={16} color={vars.cor1} /> Como faço para apontar/editar uma tarefa?</Text>
                    <Text><FontAwesome name="arrow-circle-o-right" size={16} color={vars.cor1} /> Expanda a tarefa desejada, clique no botão apontar. Não é possível alterar as datas previstas. Delete a tarefa e crie uma nova.</Text>
                </View>
            </View>

            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="home" onPress={() => { navigation.replace('Home') }}> Voltar</FontAwesome.Button>
            </View>
        </View>
    );
}
export default FAQ


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
        margin: 5,
        borderWidth: 2,
        borderColor: vars.cor1,
    },

});
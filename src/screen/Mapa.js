import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Dimensions, Button, Alert, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import { ListItem, Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Cell, Section } from 'react-native-tableview-simple';

const Mapa = (props) => {
    const { navigation } = props
    const [carregado, setCarregado] = useState(false)

    const [lista, setLista] = useState([])
    const [loading, setLoading] = useState(false)
    const [origem, setOrigem] = useState({
        /**-15.489463, -49.900664*/
        latitude: -15.489463,
        longitude: -49.900664,
        latitudeDelta: 35,
        longitudeDelta: 35,
    })




    const getCadastros = () => {
        conexoes.getPedidos()
            .then(retorno => {
                console.log("Retornou!")
                console.log(retorno)
                setCarregado(true)
                if (retorno.Status === "OK") {
                    setLista(retorno.Valores)
                    setLoading(true)

                }
                else {
                    alert(retorno.Status)

                    console.log(retorno.Status);
                }
            })
            .catch(erro => {
                alert(erro)
                console.log(erro);
            }
            )
        setLoading(false);
    }


    useEffect(() => {
        getCadastros()



    }, [])



    return carregado == true ?
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>

                <MapView ref={map => { this.map = map }}
                    style={styles.mapStyle}
                    initialRegion={origem}
                    region={origem}
                >
                    {
                        lista.map((item, key) => <MapView.Marker
                            key={key}
                            coordinate={{
                                latitude: parseFloat(item.latitude === "" ? 0 : item.latitude),
                                longitude: parseFloat(item.longitude === "" ? 0 : item.longitude),
                                latitudeDelta: 10,
                                longitudeDelta: 10,
                            }}

                            onCalloutPress={() => {
                                navigation.navigate('AdicionarTarefa', { item })
                            }}
                        >
                            <Image source={require('./img/build.png')} />
                            <MapView.Callout tooltip style={{ backgroundColor: 'white', minWidth: 200, maxWidth: 300 }}>
                                <View margin={10}>
                                    <Text><FontAwesome name="home" color="black" size={24} borderWidth={2} borderColor="black" /> {item.pedido} {item.nome}</Text>
                                </View>

                            </MapView.Callout>

                        </MapView.Marker>
                        )
                    }






                </MapView>

            </SafeAreaView>
            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="home" onPress={() => { navigation.replace('Home') }}> Voltar</FontAwesome.Button>
            </View>
        </View>
        : null;
}
export default Mapa

const styles = StyleSheet.create({
    caixaBotao: {
        flexDirection: 'row'
    },
    caixaTexto: {
        width: "95%",
        marginBottom: 10,
        marginTop: 25,
        marginLeft: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    container: {
        flex: 1,
    }, mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    botao: {
        backgroundColor: vars.cor1,
    },

});

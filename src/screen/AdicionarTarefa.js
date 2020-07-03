import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { Cell, Section } from 'react-native-tableview-simple';

const AdicionarTarefa = (props) => {
    const { navigation } = props
    const { route } = props
    const { item } = route.params

    const [inicio, setInicio] = useState(new Date());
    const [inicioStr, setInicioStr] = useState(Moment(new Date()).format('MM/DD/YYYY'));
    const [dataVisivielInicio, setdataVisivelInicio] = useState(false);

    const [fim, setFim] = useState(new Date());
    const [fimstr, setFimStr] = useState(Moment(new Date()).format('MM/DD/YYYY'));
    const [datavisivelFim, setDataVisivelFim] = useState(false);


    const [pedido, setPedido] = useState(item.pedido);
    const [nometarefa, setNomeTarefa] = useState("30A");
    const [descricaotarefa, setDescricaoTarefa] = useState("Detalhamento da estrutura principal");
    const [descricao, setDescricao] = useState("");
    const [horas, setHoras] = useState("9");
    const [obra, setObra] = useState(item.nome);
    const [etapa, setEtapa] = useState("001");


    const updateDTinicio = (event, dataSelecionadaInicio) => {
        const dataSelecionada = dataSelecionadaInicio || new Date();
        setdataVisivelInicio(Platform.OS === 'ios');
        setInicio(dataSelecionada);
        setInicioStr(Moment(dataSelecionada).format('DD/MM/YYYY'));
    };

    const updateDTFim = (event, dataSelecionadaFim) => {
        const dataSelecionada = dataSelecionadaFim || new Date();
        setDataVisivelFim(Platform.OS === 'ios');
        setFim(dataSelecionada);
        setFimStr(Moment(dataSelecionada).format('DD/MM/YYYY'));
    };

    const visaoDataInicio = currentMode => {
        setdataVisivelInicio(true);
    };
    const mostrarSelecaoInicio = () => {
        visaoDataInicio('date');
    };

    const visaoDataFim = currentMode => {
        setDataVisivelFim(true);
    };

    const mostrarSelecaoFim = () => {
        visaoDataFim('date');
    };

    const gravar = () => {
        if (pedido.length != 13) {
            Alert.alert("Ajuste os valores", "Campo Pedido deve conter 13 caracteres.");
            return;
        }
        if (etapa.length != 3) {
            Alert.alert("Ajuste os valores", "Campo etapa deve conter 3 caracteres.");
            return;
        }
        if (nometarefa.length != 3) {
            Alert.alert("Ajuste os valores", "Campo PEP deve conter 3 caracteres.");
            return;
        }
        if (descricao.length === 0) {
            Alert.alert("Ajuste os valores", "Prencha o campo descrição. Não pode ficar em branco");
            return;
        }
        Alert.alert(
            "Adcionar Tarefa",
            "Adicionar tarefa?.",
            [
                {
                    text: "Não",
                    onPress: () => {

                    }
                    ,
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                        conexoes.gravar_tarefas(
                            {
                                ma: vars.usuario.ma,
                                s: vars.usuario.s,
                                Banco: vars.db,
                                Tabela: "pme_tarefas",
                                Valores:
                                {
                                    id_recurso: vars.usuario.id_user,
                                    obra: obra,
                                    pedido: pedido,
                                    nometarefa: nometarefa,
                                    descricaotarefa: descricaotarefa,
                                    descricao: descricao,
                                    inicio: inicioStr,
                                    fim: fimstr,
                                    horas: horas,
                                    etapa: etapa,
                                }
                            }

                        )
                            .then(retorno => {
                                if (retorno.Status === "OK") {
                                    Alert.alert(
                                        "Adicionar Tarefa",
                                        "Tarefa Adicionada! Quer adicionar mais?",
                                        [
                                            {
                                                text: "Não",
                                                onPress: () => {
                                                    navigation.replace('Home')
                                                }
                                                ,
                                                style: "cancel"
                                            },
                                            {
                                                text: "Sim", onPress: () => {
                                                    Alert.alert(
                                                        "Adicionar Tarefa",
                                                        "Quer Selecionar outra Obra?",
                                                        [
                                                            {
                                                                text: "Não",
                                                                onPress: () => {
                                                                }
                                                                ,
                                                                style: "cancel"
                                                            },
                                                            {
                                                                text: "Sim", onPress: () => {
                                                                    navigation.navigate('Mapa')

                                                                }
                                                            }
                                                        ],
                                                        { cancelable: false }
                                                    );

                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                                else {
                                    Alert.alert(retorno.Status)
                                }
                            })
                            .catch(erro => {
                                Alert.alert(erro)
                                console.log(erro);
                            }
                            )
                    }
                }
            ],
            { cancelable: false }
        );

    }




    useEffect(
        () => {

        }, []
    )




    return (
        <View style={styles.container}>

            <View margin={5}>
                <Text>Nome da Obra:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={obra}
                    onChangeText={texto => {
                        setObra(texto)
                    }
                    }
                    maxLength={50}

                />

                <Text>Pedido:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={pedido}
                    onChangeText={texto => {
                        setPedido(texto)
                    }
                    }
                    maxLength={13}

                />
                <View margin={5}>
                    <FontAwesome.Button style={styles.botao} name="building-o" onPress={() => { navigation.navigate('Mapa') }}> Selecionar Outra Obra...</FontAwesome.Button>
                </View>
                <Text>Etapa:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={etapa}
                    onChangeText={texto => {
                        setEtapa(texto)
                    }
                    }
                    keyboardType={'numeric'}
                    maxLength={3}
                />
                <Text>PEP:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={nometarefa}
                    onChangeText={texto => {
                        setNomeTarefa(texto)
                    }
                    }
                    maxLength={3}
                />
                <Text>Descrição:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={descricao}
                    onChangeText={texto => {
                        setDescricao(texto)
                    }
                    }
                />
                <Text>Horas/dia:</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={horas}
                    onChangeText={texto => {
                        setHoras(texto)
                    }
                    }
                    keyboardType={'numeric'}
                    maxLength={2}

                />
                <Text margin={5}>Inicio:</Text>
                <View>
                    <View>
                        <FontAwesome.Button style={styles.botao} name="calendar-plus-o" onPress={mostrarSelecaoInicio}>{inicioStr}</FontAwesome.Button>
                    </View>
                    {dataVisivielInicio && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={inicio}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={updateDTinicio}
                        />
                    )}
                </View>

                <Text>Fim:</Text>
                <View>
                    <View>
                        <FontAwesome.Button style={styles.botao} name="calendar-check-o" onPress={mostrarSelecaoFim}>{fimstr}</FontAwesome.Button>
                    </View>
                    {datavisivelFim && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={fim}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={updateDTFim}
                        />
                    )}
                </View>
            </View>




            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="check" onPress={gravar}>Criar Tarefa</FontAwesome.Button>
            </View>
            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="home" onPress={() => { navigation.replace('Home') }}> Voltar</FontAwesome.Button>
            </View>
        </View>
    );
}
export default AdicionarTarefa


const styles = StyleSheet.create({
    botao: {
        backgroundColor: vars.cor1,
        textAlign: "right"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    caixaTexto: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginTop: 5,
        textAlign: "right"
    },
    mensagemErro: {
        color: "red",
        marginLeft: 20
    },

});
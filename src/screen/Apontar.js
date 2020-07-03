import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

const Apontar = (props) => {
    const { navigation } = props
    const { route } = props
    const { item: tarefa } = route.params
    const [iniciado_em, setInicio] = useState(new Date());
    const [inicioStr, setInicioStr] = useState(tarefa.iniciado_em);
    const [dataVisivielInicio, setdataVisivelInicio] = useState(false);
    const [finalizado_em, setFim] = useState(new Date());
    const [fimstr, setFimStr] = useState(tarefa.finalizado_em);
    const [datavisivelFim, setDataVisivelFim] = useState(false);
    const [pedido, setPedido] = useState(tarefa.pedido);
    const [nometarefa, setNomeTarefa] = useState(tarefa.nometarefa);
    const [descricaotarefa, setDescricaoTarefa] = useState(tarefa.descricaotarefa);
    const [descricao, setDescricao] = useState(tarefa.descricao);
    const [horas, setHoras] = useState(tarefa.horas);
    const [obra, setObra] = useState(tarefa.obra);
    const [etapa, setEtapa] = useState(tarefa.etapa);

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

    const atualizar = () => {
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
            "Atualizar tarefa?.",
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
                        conexoes.atualizar_tarefas(
                            {
                                ma: vars.usuario.ma,
                                s: vars.usuario.s,
                                Banco: vars.db,
                                Tabela: "pme_tarefas",
                                Valores:
                                {

                                    iniciado_em: inicioStr,
                                    finalizado_em: fimstr,
                                    horas: horas,
                                    etapa: etapa,

                                    obra: obra,
                                    pedido: pedido,
                                    nometarefa: nometarefa,
                                    descricaotarefa: descricaotarefa,
                                    descricao: descricao,
                                    horas: horas,
                                    etapa: etapa,
                                },
                                Filtros:
                                {
                                    id: tarefa.id,
                                }
                            }
                        )
                            .then(retorno => {
                                if (retorno.Status === "OK") {
                                    Alert.alert("Atualizada", "Tarefa Atualizada!");
                                    navigation.replace('Home')
                                }
                                else {
                                    alert(retorno.Status)
                                }
                            })
                            .catch(erro => {
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
            <View style={styles.centralizar}>
            </View>

            <View style={styles.header}>
                <View margin={10}>
                    <Text><FontAwesome name="flag" size={16} color={vars.cor1} /> Iniciar Em:  {tarefa.inicio}</Text>
                    <Text><FontAwesome name="flag" size={16} color={vars.cor1} /> Finalizar Em: {tarefa.fim} </Text>
                </View>
            </View>
            <Text>Nome da Obra:</Text>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Nome da Obra"
                value={obra}
                onChangeText={texto => {
                    setObra(texto)
                }
                }
            />
            <Text>Pedido:</Text>
            <TextInput
                maxLength={13}
                style={styles.caixaTexto}
                placeholder="Pedido"
                value={pedido}
                onChangeText={texto => {
                    setPedido(texto)
                }
                }
            />
            <Text>Etapa:</Text>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Etapa"
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
                placeholder="PEP"
                maxLength={3}
                value={nometarefa}
                onChangeText={texto => {
                    setNomeTarefa(texto)
                }
                }
            />
            <Text>Descrição:</Text>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Descrição"
                value={descricao}
                onChangeText={texto => {
                    setDescricao(texto)
                }
                }
            />
            <Text>Horas:</Text>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Horas"
                value={horas}
                onChangeText={texto => {
                    setHoras(texto)
                }
                }
                maxLength={2}
                keyboardType={'numeric'}
            />
            <Text>Iniciado em: </Text>
            <View margin={5}>
                <View>
                    <View>
                        <FontAwesome.Button style={styles.botao} name="calendar-plus-o" onPress={mostrarSelecaoInicio}>{inicioStr}</FontAwesome.Button>
                    </View>
                    {dataVisivielInicio && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={iniciado_em}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={updateDTinicio}
                        />
                    )}
                </View>
            </View>
            <Text>Finalizado em:</Text>
            <View margin={5}>
                <View>
                    <View>
                        <FontAwesome.Button style={styles.botao} name="calendar-check-o" onPress={mostrarSelecaoFim}>{fimstr}</FontAwesome.Button>
                    </View>
                    {datavisivelFim && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={finalizado_em}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={updateDTFim}
                        />
                    )}
                </View>
            </View>
            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="check" onPress={atualizar}>Atualizar Tarefa</FontAwesome.Button>
            </View>
            <View margin={5}>
                <FontAwesome.Button style={styles.botao} name="home" onPress={ () => { navigation.replace('Home')} }> Voltar</FontAwesome.Button>
            </View>
        </View>
    );
}
export default Apontar


const styles = StyleSheet.create({
    botao: {
        backgroundColor: vars.cor1,
        textAlign: "right"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
    },
    caixaTexto: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginTop: 5,
        textAlign: "right"
    },
    header: {


        borderWidth: 2,
        borderColor: vars.cor1,
        backgroundColor: 'white',
    },

});
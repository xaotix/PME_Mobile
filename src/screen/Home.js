import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as conexoes from '../service/conexoes'
import * as vars from '../service/propriedades'
import { Tab, Tabs, TabHeading, Icon, Container } from 'native-base';
import { List } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Cell, Section } from 'react-native-tableview-simple';



const Home = (props) => {
  const { navigation } = props
  const [tf_icon, set_tf_icon] = useState("star")
  const [tfi_icon, set_tfi_icon] = useState("clock-o")
  const [tff_icon, set_tff_icon] = useState("check")
  const [todastarefas, setTodasTarefas] = useState([])
  const [tarefas, setTarefas] = useState([])
  const [tarefasiniciadas, setTarefasiniciadas] = useState([])
  const [tarefasfinalizadas, setTarefafinalizadas] = useState([])
  const [item_selecionado, set_item_selecionado] = useState()
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = React.useState(false);

  useEffect(
    () => {
      getTarefas()
    }, []
  )

  const getTarefas = () => {
    setLoading(true)
    conexoes.get_tarefas()
      .then(retorno => {
        console.log("Retornou!")

        if (retorno.Status === "OK") {
          var tar1 = [];
          var tar2 = [];
          var tar3 = [];
          console.log("Status passou!")

          setTodasTarefas(retorno.Valores)

          var arrayLength = retorno.Valores.length;
          for (var i = 0; i < arrayLength; i++) {
            var s = retorno.Valores[i];
            if (s.iniciado_em === "" && s.finalizado_em === "") {
              tar1.push(s);
            }
            else if (s.finalizado_em === "" && s.iniciado_em != "") {
              tar2.push(s);
            }
            else {
              tar3.push(s);
            }
          }

          setTarefas(tar1);
          setTarefasiniciadas(tar2);
          setTarefafinalizadas(tar3);

          console.log("Mapeou tarefas!");


          //Do something

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
  const apagar = (selecao) => {
    Alert.alert(
      "Excluir Tarefa",
      "Tem certeza que deseja excluir? Não é possível desfazer.",
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

            setLoading(true)
            console.log("Apagar")
            conexoes.apagar_tarefa(selecao)
              .then(retorno => {
                console.log("Retornou!")

                if (retorno.Status === "OK") {
                  console.log("A tarefa foi apagada!")
                  console.log(retorno.Status);
                  getTarefas()
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
            setLoading(false)
          }
        }
      ],
      { cancelable: false }
    );




  }

  useEffect(() => {
    getTarefas()

  }, [])

  const handlePress = () => setExpanded(!expanded);
  return (
    <View flex={1}>
      <Tabs initialPage={0} >
        <Tab heading={<TabHeading style={styles.tabHeader}><FontAwesome name="home" size={24} color="white" /></TabHeading>}>
          <View style={styles.header}>
            <View margin={10}>
              <Text>Bem vindo {vars.usuario.nome}</Text>
              <Text><FontAwesome name="envelope-o" size={16} color={vars.cor1} /> {vars.usuario.email}</Text>
              <Text><FontAwesome name="user" size={16} color={vars.cor1} /> {vars.usuario.ma}</Text>
              <Text>Você tem um total de: {todastarefas.length} Tarefa(s)</Text>
              <Text><FontAwesome name={tfi_icon} size={16} color={vars.cor1} /> {tarefasiniciadas.length} iniciada(s)</Text>
              <Text><FontAwesome name={tf_icon} size={16} color={vars.cor1} /> {tarefas.length} a fazer</Text>
              <Text><FontAwesome name={tff_icon} size={16} color={vars.cor1} /> {tarefasfinalizadas.length} finalizada(s)</Text>
            </View>
          </View>
          <View marginBottom={10}>
            <View style={styles.caixaBotao}>
              <FontAwesome.Button style={styles.botao} name="star" onPress={
                () => {
                  navigation.navigate('Mapa')
                }
              }>Adicionar Tarefa</FontAwesome.Button>
            </View>
            <View style={styles.caixaBotao}>
              <FontAwesome.Button style={styles.botao} name="info-circle" onPress={
                () => {
                  navigation.replace('Sobre')
                }
              }>Sobre</FontAwesome.Button>
            </View>
            <View style={styles.caixaBotao}>
              <FontAwesome.Button style={styles.botao} name="question-circle" onPress={
                () => {
                  navigation.replace('FAQ')
                }
              }>FAQ</FontAwesome.Button>
            </View>
            <View style={styles.caixaBotao}>
              <FontAwesome.Button style={styles.botao} name="power-off" onPress={
                () => {
                  navigation.replace('Login')
                }
              }>Logout</FontAwesome.Button>
            </View>
          </View>
        </Tab>
        <Tab heading={<TabHeading style={styles.tabHeader}><FontAwesome name={tfi_icon} size={24} color="white" /><Text style={styles.texto}> [{tarefasiniciadas.length}]  </Text></TabHeading>}>
          <FlatList
            data={tarefasiniciadas}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  set_item_selecionado(item);
                }}
              >
                <View style={styles.card}>
                  <List.Accordion title={<Text>{item.pedido}.{item.etapa}.{item.nometarefa}</Text>

                  }
                    left={props => <FontAwesome name={tfi_icon} size={32} color={vars.cor1} />}

                    onPress={handlePress}>

                    <Cell cellStyle="Subtitle" title={<Text><FontAwesome name="home" size={24} color={vars.cor1} /> {item.obra}</Text>} detail={<Text>{item.descricaotarefa}</Text>} />
                    <Section>
                      <Cell title={<Text><FontAwesome name="file-text-o" size={16} style={styles.iconesinternos} /> {item.descricao}</Text>} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Iniciar em:</Text>} detail={item.inicio} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Finalizar em:</Text>} detail={item.fim} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="clock-o" size={16} style={styles.iconesinternos} /> Tempo previsto:</Text>} detail={<Text> {item.horas} h/dia</Text>} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="calendar-plus-o" size={16} style={styles.iconesinternos} /> Iniciado em:</Text>} detail={item.iniciado_em} />
                      <View margin={5}>
                        <FontAwesome.Button style={styles.botao} name="flag" onPress={() => navigation.navigate('Apontar', { item })}>Apontar</FontAwesome.Button>
                      </View>
                      <View margin={5}>
                        <FontAwesome.Button style={styles.botao} name="trash-o" onPress={() => apagar(item)}>Apagar</FontAwesome.Button>
                      </View>
                    </Section>
                  </List.Accordion>
                </View>

              </TouchableOpacity>
            }
          />

        </Tab>
        <Tab heading={<TabHeading style={styles.tabHeader}><FontAwesome name={tf_icon} size={24} color="white" /><Text style={styles.texto}> [{tarefas.length}] </Text></TabHeading>}>
          <FlatList
            data={tarefas}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  set_item_selecionado(item);
                }}
              >
                <View style={styles.card}>
                  <List.Accordion title={<Text>{item.pedido}.{item.etapa}.{item.nometarefa}</Text>

                  }
                    left={props => <FontAwesome name={tf_icon} size={32} color={vars.cor1} />}

                    onPress={handlePress}>

                    <Cell cellStyle="Subtitle" title={<Text><FontAwesome name="home" size={24} color={vars.cor1} /> {item.obra}</Text>} detail={<Text>{item.descricaotarefa}</Text>} />
                    <Section>
                      <Cell title={<Text><FontAwesome name="file-text-o" size={16} style={styles.iconesinternos} /> {item.descricao}</Text>} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Iniciar em:</Text>} detail={item.inicio} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Finalizar em:</Text>} detail={item.fim} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="clock-o" size={16} style={styles.iconesinternos} /> Tempo previsto:</Text>} detail={<Text> {item.horas} h/dia</Text>} />

                      <View margin={5}>
                        <FontAwesome.Button style={styles.botao} name="flag" onPress={() => navigation.navigate('Apontar', { item })}>Apontar</FontAwesome.Button>
                      </View>
                      <View margin={5}>

                        <FontAwesome.Button style={styles.botao} name="trash-o" onPress={() => apagar(item)}>Apagar</FontAwesome.Button>
                      </View>
                    </Section>

                  </List.Accordion>
                </View>

              </TouchableOpacity>
            }
          />

        </Tab>
        <Tab heading={<TabHeading style={styles.tabHeader}><FontAwesome name={tff_icon} size={24} color="white" /><Text style={styles.texto}> [{tarefasfinalizadas.length}]  </Text></TabHeading>}>
          <FlatList
            data={tarefasfinalizadas}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  set_item_selecionado(item);
                }}
              >
                <View style={styles.card}>
                  <List.Accordion title={<Text>{item.pedido}.{item.etapa}.{item.nometarefa}</Text>

                  }
                    left={props => <FontAwesome name={tff_icon} size={32} color={vars.cor1} />}

                    onPress={handlePress}>

                    <Cell cellStyle="Subtitle" title={<Text><FontAwesome name="home" size={24} color={vars.cor1} /> {item.obra}</Text>} detail={<Text>{item.descricaotarefa}</Text>} />
                    <Section>
                      <Cell title={<Text><FontAwesome name="file-text-o" size={16} style={styles.iconesinternos} /> {item.descricao}</Text>} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Iniciar em:</Text>} detail={item.inicio} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="flag" size={16} style={styles.iconesinternos} /> Finalizar em:</Text>} detail={item.fim} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="clock-o" size={16} style={styles.iconesinternos} /> Tempo previsto:</Text>} detail={<Text> {item.horas} h/dia</Text>} />
                      <Text></Text>
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="calendar-plus-o" size={16} style={styles.iconesinternos} /> Iniciado em:</Text>} detail={item.iniciado_em} />
                      <Cell cellStyle="RightDetail" title={<Text><FontAwesome name="calendar-check-o" size={16} style={styles.iconesinternos} /> Finalizado em:</Text>} detail={item.finalizado_em} />


                      <View margin={5}>
                        <FontAwesome.Button style={styles.botao} name="flag" onPress={() => navigation.navigate('Apontar', { item })}>Apontar</FontAwesome.Button>
                      </View>
                      <View margin={5}>

                        <FontAwesome.Button style={styles.botao} name="trash-o" onPress={() => apagar(item)}>Apagar</FontAwesome.Button>
                      </View>
                    </Section>

                  </List.Accordion>
                </View>

              </TouchableOpacity>
            }
          />

        </Tab>
      </Tabs>



    </View>
  );
}
export default Home

const styles = StyleSheet.create({
  tabHeader: {
    backgroundColor: '#1C3D85',
  },
  botao: {
    backgroundColor: vars.cor1,
  },
  texto:
  {
    color: 'white'
  },
  iconesinternos:
  {
    color: "black"
  },

  header: {

    margin: 10,
    borderWidth: 2,
    borderColor: vars.cor1,
    backgroundColor: 'white',
  },
  card: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: vars.cor1,
    backgroundColor: 'white'

  },
  container: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaTexto: {
    width: "90%",
    borderWidth: 1,

    padding: 5,
    marginTop: 5
  }, caixaBotao: {
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  caixaBotao2: {
    marginTop: 5,
    marginBottom: 5,

  },
});
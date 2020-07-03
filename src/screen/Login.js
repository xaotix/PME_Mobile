import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import * as conexoes from '../service/conexoes'
import { AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as vars from '../service/propriedades'

export default function Login(props) {



  const { navigation } = props
  const [mensagem, setMensagem] = useState("")
  const [ma, setMa] = useState("")
  const [password, setPassword] = useState("")
  const logar = () => {


    const salvarDados = async () => {
      await AsyncStorage.setItem('ma', ma);
      await AsyncStorage.setItem('s', password);
    }
    salvarDados();



    setMensagem("Autenticando...");

    conexoes.autenticar(ma, password)
      .then(retorno => {
        console.log("Retornou!")
        console.log(retorno.Status)

        if (retorno.Status === "OK") {
          setMensagem("")
          navigation.navigate('Home');
        }
        else {
          console.log(retorno.Status);
          setMensagem(retorno.Status);
        }
      })
      .catch(erro => {
        alert(erro)
        console.log(erro);
      }
      )


  }
  useEffect(
    () => {
      const pegarDados = async () => {
        setMa(await AsyncStorage.getItem('ma'))
        setPassword(await AsyncStorage.getItem('s'))
      }
      pegarDados();
    }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={require('./img/pme_logo.png')} />
      </View>
      <View style={styles.container}>
        <Text>Digite suas credenciais e clique em login</Text>
        <Text>{mensagem}</Text>

        <TextInput
          style={styles.caixaTexto}
          placeholder="digite seu MA"
          value={ma}
          onChangeText={texto => setMa(texto)}
        />
        <TextInput
          style={styles.caixaTexto}
          placeholder="Senha"
          value={password}
          secureTextEntry
          onChangeText={texto => setPassword(texto)}
        />
        <View style={styles.caixaBotao}>
          <FontAwesome.Button style={styles.botao} name="user" onPress={logar}>Login</FontAwesome.Button>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: vars.cor1,
  },
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  }, caixaTexto: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 5
  },
  caixaBotao: {
    marginTop: 10,
  },
});

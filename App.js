import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, ImageEditorStatic, Image } from 'react-native';

import Home from './src/screen/Home'
import Login from './src/screen/Login'
import Apontar from './src/screen/Apontar'
import AdicionarTarefa from './src/screen/AdicionarTarefa'
import Mapa from './src/screen/Mapa'
import Sobre from './src/screen/Sobre'
import FAQ from './src/screen/FAQ'
const cor1 = "#1C3D85"

//Desabilitando Warnings
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Setting a timer'])

//Configurando Encondig
import { decode, encode } from 'base-64'
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}
function LogoTitle(props) {
  return (
    <View backgroundColor={cor1}
    style={{
      flex: 1,
      flexDirection: "row"
    }}
    >
      <View style={{flex:1}}>
      <Image source={require('./src/screen/img/logo.png')}/> 

      </View>
      <View style={{flex:1, justifyContent: "center"}}>
        <Text style={{textAlign: 'right', color: 'white'}}>{props.title}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const Stack = createStackNavigator();


  return (
    <View style={styles.container} >

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            
            component={Home}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Minhas Tarefas" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Apontar"
            component={Apontar}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Apontar Tarefa" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="FAQ"
            component={FAQ}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - FAQ" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Login" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AdicionarTarefa"
            component={AdicionarTarefa}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Adicionar Tarefa" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Sobre"
            component={Sobre}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Sobre" />,
              headerStyle: {
                backgroundColor: cor1,
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Mapa"
            component={Mapa}
            options={{
              headerLeft: null,
              headerTitle: props => <LogoTitle {...props} title="PME - Selecionar Obra" />,
              headerStyle: {
                backgroundColor: cor1,
                
              },
              headerTintColor: cor1,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3D85',
    marginTop: 0,

  }
});
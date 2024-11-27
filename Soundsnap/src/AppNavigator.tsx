// src/AppNavigator.tsx

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../App';  // Caminho para a tela de inicial
import DetalhesAlbum from './Pages/DetalhesAlbum'; // Caminho para a tela de detalhes do álbum
import Album from './Models/Album' ;  // Importando o tipo de Album

export type DetalhesAlbumParams = {
  DetalhesAlbum: { album: Album }; // Definindo os parâmetros para a tela DetalhesAlbum
};

const Stack = createStackNavigator<DetalhesAlbumParams>(); // Tipando a navegação com os parâmetros

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="DetalhesAlbum" component={DetalhesAlbum} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

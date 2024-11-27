// src/Screens/DetalhesAlbum.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';  // Importe de @react-navigation/native
import { StackNavigationProp } from '@react-navigation/stack';
import { DetalhesAlbumParams } from '../AppNavigator'; // Caminho para a definição do tipo DetalhesAlbumParams

// Tipos para as propriedades route e navigation
type DetalhesAlbumRouteProp = RouteProp<DetalhesAlbumParams, 'DetalhesAlbum'>;
type DetalhesAlbumNavigationProp = StackNavigationProp<DetalhesAlbumParams, 'DetalhesAlbum'>;

interface Props {
  route: DetalhesAlbumRouteProp;
  navigation: DetalhesAlbumNavigationProp;
}

const DetalhesAlbum: React.FC<Props> = ({ route, navigation }) => {
  const { album } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{album.nomeAlbum}</Text>
      <Text style={styles.artist}>Artista: {album.nomeArtista}</Text>
      <Image source={{ uri: album.foto }} style={styles.image} />
      <Text style={styles.info}>Mais detalhes do álbum podem ser exibidos aqui.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  artist: { fontSize: 18, marginBottom: 8 },
  image: { width: '100%', height: 200, resizeMode: 'cover', marginBottom: 16 },
  info: { fontSize: 16, color: '#666' },
});

export default DetalhesAlbum;

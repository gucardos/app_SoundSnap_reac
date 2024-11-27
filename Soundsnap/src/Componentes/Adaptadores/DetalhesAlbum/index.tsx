import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Album from '../../../Models/Album';
import styles from '../../../Styles/styles';

export default function DetalhesAlbum() {
  const route = useRoute();
  const { id, nomeAlbum, nomeArtista, foto, lancamento, musicas } = route.params as Album;

  return (
    <View style={styles.container}>
      <Image source={{ uri: foto }} style={styles.albumImage} />
      <Text style={styles.albumName}>{nomeAlbum}</Text>
      <Text style={styles.artist}>{nomeArtista}</Text>
      <Text style={styles.info}>Ano de Lançamento: {lancamento}</Text>
      <Text style={styles.info}>Número de Músicas: {musicas}</Text>
    </View>
  );
}

// Observação:
// 1. Este componente agora utiliza `useRoute` do `@react-navigation/native` e faz uso da interface Album do arquivo Models/Album.tsx.
// 2. O arquivo de estilos foi ajustado para utilizar os estilos disponíveis em '../Styles/styles'.
// 3. Certifique-se de passar corretamente as propriedades `id`, `nomeAlbum`, `nomeArtista`, `foto`, `lancamento`, e `musicas` ao navegar para esta tela, para que todos os detalhes sejam exibidos.
// 4. Os estilos foram aplicados conforme definidos no arquivo `styles.js`.

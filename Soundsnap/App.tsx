// Index.tsx

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './src/Styles/styles';
import { get_rand_album } from './acess';
import Album from './src/Models/Album';
import ListaAlbum from './src/Componentes/Adaptadores/ListaAlbum/index';
import AppNavigator from './src/AppNavigator'; // Importe o AppNavigator

type RootStackParamList = {
  Index: undefined;
  DetalhesAlbum: { album: Album };
};

export default function Index() {
  
  const [listaAlb, setLista] = useState<Album[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  // Uso do hook de navegação

  async function listaAlbum() {
    const lista: Album[] = [];
    for (let i = 0; i < 20; i++) {
      const album = await get_rand_album();
      const fetchedAlbum = album.albums.items[0];
      // Ajustando para usar o modelo correto
      lista.push({
        id: fetchedAlbum.id,
        nomeAlbum: fetchedAlbum.name,
        nomeArtista: fetchedAlbum.artists[0]?.name || 'Artista Desconhecido',
        musicas: fetchedAlbum.total_tracks || 0,
        foto: fetchedAlbum.images[0]?.url || '',
        lancamento: parseInt(fetchedAlbum.release_date?.slice(0, 4)) || 0,
      });
    }
    setLista(lista);
  }

  useEffect(() => {
    listaAlbum();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/logo_soundsnap_claro.png')}
          style={styles.ImagemLogo}
        />
        <TextInput
          style={styles.inputHeader}
          placeholder="O quê você quer ouvir hoje?"
        />
        <Image source={require('./assets/user.png')} style={styles.ImagemUser} />
      </View>
      <View style={styles.container}>
        <View style={styles.albumContainer}>
          {/* Aqui passa a função de navegação para o componente ListaAlbum */}
          <ListaAlbum
            albuns={listaAlb}
            aoAtualizar={(album: Album) => navigation.navigate('DetalhesAlbum', { album })}
          />
        </View>
      </View>
    </View>
  );
}

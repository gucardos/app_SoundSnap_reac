import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import Album from '../../../Models/Album';
import styles from '../../../Styles/styles';
import { get_album_tracks } from '../../../../acess'; // Importando a nova função

// Definir o tipo de navegação com as rotas possíveis
type RootStackParamList = {
  index: undefined;
  detalhesAlbum: { id: number; nomeAlbum: string; nomeArtista: string; foto: string; lancamento: number; musicas: number };
  loginCadastro: undefined;
};

export default function DetalhesAlbum() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id, nomeAlbum, nomeArtista, foto, lancamento, musicas } = route.params as Album;

  const [trackList, setTrackList] = useState<{ name: string; duration_ms: number }[]>([]);

  useEffect(() => {
    async function fetchAlbumTracks() {
      try {
        // Busca as faixas do álbum usando a função do arquivo acess.js
        const tracks = await get_album_tracks(id);
        setTrackList(tracks.map((track: any) => ({
          name: track.name,
          duration_ms: track.duration_ms,
        })));
      } catch (error) {
        console.error("Erro ao buscar as músicas do álbum:", error);
      }
    }
    fetchAlbumTracks();
  }, [id]);

  function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Image source={require('../../../../assets/logo_soundsnap_claro.png')} style={styles.ImagemLogo} />
        </TouchableOpacity>
        <TextInput style={styles.inputHeader} placeholder="O quê você quer ouvir hoje?" />
        <TouchableOpacity onPress={() => navigation.navigate('loginCadastro')}>
          <Image source={require('../../../../assets/user.png')} style={styles.ImagemUser} />
        </TouchableOpacity>
      </View>
      <View style={styles.albumDetailsContainer}>
        <Image source={{ uri: foto }} style={styles.albumImage} />
        <Text style={styles.albumName}>{nomeAlbum}</Text>
        <Text style={styles.artist}>{nomeArtista}</Text>
        <Text style={styles.info}>Ano de Lançamento: {lancamento}</Text>
        <Text style={styles.info}>Número de Músicas: {musicas}</Text>
        <Text style={styles.info}>Músicas do Álbum:</Text>

        {trackList.length > 0 ? (
          trackList.map((track, index) => (
            <View key={index} style={styles.trackContainer}>
              <Text style={styles.track}>{track.name}</Text>
              <Text style={styles.trackDuration}>{formatDuration(track.duration_ms)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.info}>Carregando músicas...</Text>
        )}
      </View>
    </ScrollView>
  );
}

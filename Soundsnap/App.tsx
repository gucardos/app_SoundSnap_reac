// Importar a função de busca
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import styles from './src/Styles/styles.js';
import { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { acess, get_rand_album, search_album } from './acess';
import Album from './src/Models/Album.js';
import DetalhesAlbum from './src/Componentes/Adaptadores/DetalhesAlbum'; 
import LoginCadastro from './src/Componentes/Adaptadores/LoginCadastro/LoginCadastro';
import HeaderWithSearch from './src/Componentes/HeaderWithSearch/HeaderWithSearch'; 

type RootStackParamList = {
  index: undefined;
  detalhesAlbum: { id: number; nomeAlbum: string; nomeArtista: string; foto: string; lancamento: number; musicas: number };
  loginCadastro: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="detalhesAlbum" component={DetalhesAlbum} />
        <Stack.Screen name="loginCadastro" component={LoginCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Index() {
  const [listaAlb, setLista] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function listaAlbum() {
    setLoading(true);
    try {
      const lista = [];
      for (let i = 0; i < 20; i++) {
        const album = await get_rand_album();
        if (album && album.albums && album.albums.items && album.albums.items.length > 0) {
          const albumItem = album.albums.items[0];
          lista.push({
            id: albumItem.id,
            nomeAlbum: albumItem.name,
            nomeArtista: albumItem.artists[0].name,
            foto: albumItem.images[0]?.url || '',
            lancamento: new Date(albumItem.release_date).getFullYear(),
            musicas: albumItem.total_tracks,
          });
        }
      }
      setLista(lista);
    } catch (error) {
      console.error("Erro ao buscar álbuns: ", error);
      Alert.alert('Erro', 'Não foi possível buscar os álbuns. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!searchQuery) {
      Alert.alert('Busca', 'Por favor, insira um termo para buscar.');
      return;
    }

    setLoading(true);
    try {
      const response = await search_album(searchQuery);
      if (response && response.albums && response.albums.items.length > 0) {
        const albums = response.albums.items.map((albumItem: any) => ({
          id: albumItem.id,
          nomeAlbum: albumItem.name,
          nomeArtista: albumItem.artists[0].name,
          foto: albumItem.images[0]?.url || '',
          lancamento: new Date(albumItem.release_date).getFullYear(),
          musicas: albumItem.total_tracks,
        }));
        setLista(albums);
      } else {
        Alert.alert('Resultado', 'Nenhum álbum encontrado.');
        setLista([]);
      }
    } catch (error) {
      console.error("Erro ao buscar álbuns: ", error);
      Alert.alert('Erro', 'Não foi possível realizar a busca.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listaAlbum();
  }, []);

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity
      style={styles.albumContainer}
      onPress={() =>
        navigation.navigate('detalhesAlbum', {
          id: item.id,
          nomeAlbum: item.nomeAlbum,
          nomeArtista: item.nomeArtista,
          foto: item.foto,
          lancamento: item.lancamento,
          musicas: item.musicas,
        })
      }
    >
      <View style={styles.card}>
        <Image source={{ uri: item.foto }} style={styles.image} />
        <View style={styles.description}>
          <Text style={styles.albumName}>{item.nomeAlbum}</Text>
          <Text style={styles.artist}>{item.nomeArtista}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        searchQuery={searchQuery}
        onSearchChange={(text) => setSearchQuery(text)}
        onSearchSubmit={handleSearch}
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={listaAlb}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAlbumItem}
            ListEmptyComponent={<Text>Nenhum álbum encontrado.</Text>}
          />
        )}
      </View>
    </View>
  );
}

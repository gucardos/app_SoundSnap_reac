import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TextInput, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './src/Styles/styles.js';
import { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { acess, get_rand_album } from './acess';
import Album from './src/Models/Album.js';
import DetalhesAlbum from './src/Componentes/Adaptadores/DetalhesAlbum'; // Tela de detalhes do álbum
import LoginCadastro from './src/Componentes/Adaptadores/LoginCadastro/LoginCadastro'; // Tela de login/cadastro

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function listaAlbum() {
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
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Image source={require('./assets/logo_soundsnap_claro.png')} style={styles.ImagemLogo} />
        </TouchableOpacity>
        <TextInput style={styles.inputHeader} placeholder="O quê você quer ouvir hoje?" />
        <TouchableOpacity onPress={() => navigation.navigate('loginCadastro')}>
          <Image source={require('./assets/user.png')} style={styles.ImagemUser} />
        </TouchableOpacity>
      </View>
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

// Observação:
// 1. Utilizei os estilos `card`, `image`, e `description` do arquivo `styles.js` para garantir que os álbuns sejam exibidos de forma consistente e estilizada.
// 2. A disposição dos elementos dentro de cada álbum foi organizada para melhorar a apresentação visual e manter a consistência com os outros elementos do aplicativo.

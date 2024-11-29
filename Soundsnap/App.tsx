import React, { useEffect, useState, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import styles from './src/Styles/styles.js';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { get_rand_album, search_album } from './acess';
import Album from './src/Models/Album.js';
import DetalhesAlbum from './src/Componentes/Adaptadores/DetalhesAlbum'; 
import LoginCadastro from './src/Componentes/Adaptadores/LoginCadastro/LoginCadastro';
import HeaderWithSearch from './src/Componentes/HeaderWithSearch/HeaderWithSearch'; 
import { UserProvider, useUser } from './src/Context/UserContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  index: undefined;
  detalhesAlbum: { id: number; nomeAlbum: string; nomeArtista: string; foto: string; lancamento: number; musicas: number };
  loginCadastro: undefined;
};

// Atualizando o tipo User para incluir likes
type User = {
  usuario: string;
  nome: string;
  email: string;
  imagem: string;
  likes?: string[];
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen name="index" component={Index} />
          <Stack.Screen name="detalhesAlbum" component={DetalhesAlbum} />
          <Stack.Screen name="loginCadastro" component={LoginCadastro} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

function Index() {
  const [listaAlb, setLista] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, setUser } = useUser();

  // Função para listar álbuns aleatórios (inicialização)
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

  // Função para buscar álbuns pelo termo de pesquisa (Query)
  async function handleSearch() {
    if (!searchQuery) {
      Alert.alert('Busca', 'Por favor, insira um termo para buscar.');
      return;
    }

    setLoading(true);
    setIsSearching(true);
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

  // useEffect para listar álbuns ao inicializar a página
  useEffect(() => {
    if (!isSearching) {
      listaAlbum();
    }
  }, [isSearching]);

  // Função para favoritar um álbum
  // Função para favoritar um álbum
// Função para favoritar um álbum
// Função para favoritar um álbum
const handleFavorite = async (album: Album) => {
  if (!user) {
    // Se o usuário não estiver logado, redirecionar para a tela de login/cadastro
    navigation.navigate('loginCadastro');
    return;
  }

  try {
    // Fazendo a requisição PUT para adicionar o like
    const userId = user.usuario; // Pegando o identificador do usuário
    const albumId = album.id; // Pegando o identificador do álbum a ser favoritado

    const response = await axios.put(
      `https://spotifyapi-hct0.onrender.com/addlike/${userId}/${albumId}`
    );

    if (response.status === 200) {
      Alert.alert('Favorito', `Álbum "${album.nomeAlbum}" foi adicionado aos seus favoritos!`);

      // Atualizar a lista de favoritos no contexto do usuário
      const updatedLikes = [...(user.likes ?? []), String(albumId)]; // Assegurando que o albumId seja uma string

      // Criar um novo objeto usuário com os dados corretos e atualizados
      const updatedUser: User = {
        ...user,
        likes: updatedLikes, // Atualizando a lista de likes como array de strings
      };

      // Atualizando o estado do usuário e salvando no AsyncStorage
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } else {
      Alert.alert('Erro ao favoritar', 'Não foi possível favoritar o álbum. Tente novamente mais tarde.');
    }
  } catch (error) {
    console.error('Erro ao favoritar álbum:', error);
    Alert.alert('Erro', 'Não foi possível favoritar o álbum. Tente novamente mais tarde.');
  }
};




  // Renderização de um álbum (memoizado)
  const AlbumItem = memo(({ item }: { item: Album }) => {
    return (
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
          <TouchableOpacity onPress={() => handleFavorite(item)} style={styles.favoriteButton}>
            <Icon name="star" size={24} color={user && user.likes?.includes(item.id.toString()) ? "#FFD700" : "#ccc"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        searchQuery={searchQuery}
        onSearchChange={(text) => {
          setSearchQuery(text);
          if (!text) {
            setIsSearching(false);
            listaAlbum(); // Se a pesquisa for limpa, carregar a lista inicial de álbuns
          }
        }}
        onSearchSubmit={handleSearch}
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={listaAlb}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AlbumItem item={item} />}
            ListEmptyComponent={<Text>Nenhum álbum encontrado.</Text>}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
          />
        )}
      </View>
    </View>
  );
}

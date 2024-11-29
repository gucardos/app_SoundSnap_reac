import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderWithSearch from '../../../Componentes/HeaderWithSearch/HeaderWithSearch';
import styles from '../../../Styles/styles';

// Definir o tipo de navegação com as rotas possíveis
type RootStackParamList = {
  detalhesAlbum: undefined;
  index: undefined;
  loginCadastro: undefined;
};

type User = {
  usuario: string;
  nome: string;
  email: string;
  imagem: string;
  likes: string[]; // Adicionando informações de álbuns favoritos
};

export default function LoginCadastro() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Carregar o usuário ao iniciar o componente
  // Carregar o usuário ao iniciar o componente
useEffect(() => {
  const loadUser = async () => {
    setLoading(true);
    try {
      // Obtenha os dados armazenados localmente
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Certifique-se de que o nome de usuário está presente
        if (userData && userData.usuario) {
          // Agora, fazer uma solicitação GET para buscar os dados do usuário
          try {
            const response = await axios.get(`https://spotifyapi-hct0.onrender.com/users/${userData.usuario}`);
            if (response.status === 200) {
              setUser(response.data);
            } else {
              console.error('Erro ao carregar usuário: status diferente de 200', response);
              setUser(null);
            }
          } catch (apiError) {
            console.error('Erro na requisição para buscar o usuário:', apiError);
            if (axios.isAxiosError(apiError) && apiError.response?.status === 404) {
              Alert.alert('Erro', 'Usuário não encontrado. Verifique o nome de usuário fornecido.');
            } else {
              Alert.alert('Erro', 'Ocorreu um problema ao tentar buscar os detalhes do usuário.');
            }
            setUser(null);
          }
        } else {
          // Se os dados do usuário não têm um campo de nome de usuário, faça o logout
          console.warn('Nenhum nome de usuário encontrado no armazenamento local.');
          handleLogout();
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };
  loadUser();
}, []);


const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert('Erro no login', 'Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  try {
    const loginResponse = await axios.post('https://spotifyapi-hct0.onrender.com/login/', {
      usuario: username.trim(),
      senha: password.trim(),
    });

    if (loginResponse.status === 200 && loginResponse.data.success) {
      // Agora precisamos buscar as informações do usuário após o login bem-sucedido.
      try {
        const userResponse = await axios.get(`https://spotifyapi-hct0.onrender.com/users/${username.trim()}`);

        if (userResponse.status === 200) {
          const userData = userResponse.data;
          // Salvar os dados do usuário no AsyncStorage e no estado `user`
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);

          // Mensagem de sucesso e navegação
          Alert.alert('Login bem-sucedido', 'Você está logado!');
          navigation.navigate('index');
        } else {
          Alert.alert('Erro no login', 'Não foi possível obter os dados do usuário. Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        Alert.alert('Erro no login', 'Erro ao obter dados do usuário após o login. Tente novamente.');
      }
    } else {
      Alert.alert('Erro no login', 'Verifique suas credenciais e tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    Alert.alert('Erro no login', 'Erro ao tentar fazer login. Verifique suas credenciais.');
  }
};

  


  const handleCadastro = async () => {
    if (!username || !fullName || !email || !password) {
      Alert.alert('Erro no cadastro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await axios.post('https://spotifyapi-hct0.onrender.com/users/', {
        usuario: username.trim(),
        nome: fullName.trim(),
        email: email.trim(),
        senha: password.trim(),
        imagem: "default_image_url", // Pode usar um valor padrão
        likes: [],
        deslikes: []
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Cadastro bem-sucedido', 'Sua conta foi criada com sucesso!');
        setIsLogin(true);
      } else {
        Alert.alert('Erro no cadastro', 'Houve um problema ao tentar criar a sua conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro no cadastro', 'Não foi possível realizar o cadastro. Verifique suas informações.');
    }
  };

  const handleSearch = () => {
    console.log('Buscando por:', searchQuery);
    // Lógica para buscar álbuns usando a query
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setUsername('');
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    // Exibir um indicador de carregamento enquanto o estado do usuário está sendo verificado
    return (
      <View style={styles.loginContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Exibição de favoritos na página do usuário
if (user) {
  return (
    <View style={[styles.loginContainer, { paddingHorizontal: 20 }]}> 
      <HeaderWithSearch 
        searchQuery={searchQuery}
        onSearchChange={(text) => setSearchQuery(text)}
        onSearchSubmit={handleSearch}
      />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.loginTitle}>Bem-vindo, {user.nome}!</Text>
        <Text style={styles.inputLabel}>Usuário: {user.usuario}</Text>
        <Text style={styles.inputLabel}>Email: {user.email}</Text>
        <TouchableOpacity 
          style={[styles.loginButton, { marginTop: 20 }]}
          onPress={handleLogout}
        >
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={[styles.loginTitle, { marginTop: 30 }]}>Seus álbuns favoritos</Text>
        {user.likes && user.likes.length > 0 ? (
          <FlatList
            data={user.likes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text style={styles.inputLabel}>{`Álbum ID: ${item}`}</Text> // Você pode melhorar para exibir mais detalhes do álbum, se necessário
            )}
          />
        ) : (
          <Text style={styles.inputLabel}>Nenhum álbum favoritado.</Text>
        )}
      </View>
    </View>
  );
}


  // Se o usuário não está logado, exibe a tela de login/cadastro
  return (
    <View style={[styles.loginContainer, { paddingHorizontal: 20 }]}> 
      <HeaderWithSearch 
        searchQuery={searchQuery}
        onSearchChange={(text) => setSearchQuery(text)}
        onSearchSubmit={handleSearch}
      />
      <Text style={[styles.loginTitle, { marginBottom: 20 }]}>{isLogin ? 'Login' : 'Cadastro'}</Text>
      <Text style={styles.inputLabel}>Nome de usuário</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize="none"
        placeholderTextColor="#777"
      />
      {!isLogin && (
        <>
          <Text style={styles.inputLabel}>Nome completo</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Nome completo"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            autoCapitalize="words"
            placeholderTextColor="#777"
          />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#777"
          />
        </>
      )}
      <Text style={styles.inputLabel}>Senha</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#777"
      />
      <TouchableOpacity
        style={[styles.loginButton, { paddingVertical: 12 }]}
        onPress={isLogin ? handleLogin : handleCadastro}
      >
        <Text style={styles.loginButtonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 15 }}>
        <Text style={styles.loginToggleText}>
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

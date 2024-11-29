import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
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

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
      const response = await axios.post('https://spotifyapi-hct0.onrender.com/login', {
        usuario: username.trim(),
        senha: password.trim(),
      });
      if (response.status === 200) {
        Alert.alert('Login bem-sucedido', 'Você está logado!');
        const userData = response.data;
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } else {
        Alert.alert('Erro no login', 'Verifique suas credenciais e tente novamente.');
      }
    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error) && error.response
        ? Array.isArray(error.response.data.detail)
          ? error.response.data.detail.map((detail: any) => detail.msg).join(', ')
          : 'Nome de usuário ou senha incorretos.'
        : 'Erro desconhecido. Tente novamente.';
      Alert.alert('Erro no login', errorMessage);
    }
  };

  const handleCadastro = async () => {
    if (!username || !fullName || !email || !password) {
      Alert.alert('Erro no cadastro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Montando os dados do cadastro de forma consistente
      const userData = {
        usuario: username.trim(),
        nome: fullName.trim(),
        email: email.trim(),
        senha: password.trim(),
        imagem: "default_image_url", // Placeholder para a imagem do usuário
        likes: [],
        deslikes: []
      };

      const response = await axios.post('https://spotifyapi-hct0.onrender.com/users/', userData);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Cadastro bem-sucedido', 'Sua conta foi criada com sucesso!');
        setIsLogin(true);
      } else {
        Alert.alert('Erro no cadastro', 'Houve um problema ao tentar criar a sua conta. Tente novamente.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400 || error.response.status === 422) {
          // Lidar com erros de validação ou dados incorretos
          const errorMessage = error.response.data.detail || 'Erro ao tentar realizar o cadastro. Verifique os dados e tente novamente.';
          Alert.alert('Erro no cadastro', typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        } else if (error.response.status === 404) {
          // Caso o endpoint não seja encontrado
          Alert.alert('Erro no cadastro', 'Endpoint não encontrado. Verifique a URL do servidor.');
        } else {
          Alert.alert('Erro no cadastro', 'Erro desconhecido ao tentar realizar o cadastro. Tente novamente.');
        }
      } else {
        Alert.alert('Erro no cadastro', 'Erro desconhecido. Tente novamente.');
      }
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
    return (
      <View style={styles.loginContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

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
        </View>
      </View>
    );
  }

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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import styles from '../../../Styles/styles';

// Definir o tipo de navegação com as rotas possíveis
type RootStackParamList = {
  detalhesAlbum: undefined;
  index: undefined;
  loginCadastro: undefined;
};

export default function LoginCadastro() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e cadastro
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      console.log('Resposta da API (login):', response.data);
      if (response.status === 200) {
        Alert.alert('Login bem-sucedido', 'Você está logado!');
        // Navegar para a página principal
        navigation.navigate('index');
      } else {
        Alert.alert('Erro no login', 'Verifique suas credenciais e tente novamente.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro no login:', error.response.data);
          const errorMessage = Array.isArray(error.response.data.detail)
            ? error.response.data.detail.map((detail: any) => detail.msg).join(', ')
            : 'Nome de usuário ou senha incorretos.';
          Alert.alert('Erro no login', errorMessage);
        } else if (error.request) {
          console.error('Erro na requisição:', error.request);
          Alert.alert('Erro no login', 'Não foi possível obter resposta do servidor. Tente novamente mais tarde.');
        } else {
          console.error('Erro ao configurar a solicitação:', error.message);
          Alert.alert('Erro no login', 'Erro inesperado. Tente novamente.');
        }
      } else {
        console.error('Erro desconhecido no login:', error);
        Alert.alert('Erro no login', 'Erro desconhecido. Tente novamente.');
      }
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
        imagem: "default_image_url", // Pode ser um campo obrigatório na API, ajustado conforme necessário
        likes: [],
        deslikes: []
      });

      console.log('Resposta da API (cadastro):', response.data);
      if (response.status === 200) { // Mudando para verificar código de sucesso 200
        Alert.alert('Cadastro bem-sucedido', 'Sua conta foi criada!');
        // Trocar para a página de login
        setIsLogin(true);
      } else {
        Alert.alert('Erro no cadastro', 'Verifique os dados e tente novamente.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro no cadastro:', error.response.data);
          const errorMessage = Array.isArray(error.response.data.detail)
            ? error.response.data.detail.map((detail: any) => detail.msg).join(', ')
            : 'Não foi possível criar sua conta. Tente novamente.';
          Alert.alert('Erro no cadastro', errorMessage);
        } else if (error.request) {
          console.error('Erro na requisição:', error.request);
          Alert.alert('Erro no cadastro', 'Não foi possível obter resposta do servidor. Tente novamente mais tarde.');
        } else {
          console.error('Erro ao configurar a solicitação:', error.message);
          Alert.alert('Erro no cadastro', 'Erro inesperado. Tente novamente.');
        }
      } else {
        console.error('Erro desconhecido no cadastro:', error);
        Alert.alert('Erro no cadastro', 'Erro desconhecido. Tente novamente.');
      }
    }
  };

  return (
    <View style={[styles.loginContainer, { paddingHorizontal: 20 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Image source={require('../../../../assets/logo_soundsnap_claro.png')} style={styles.ImagemLogo} />
        </TouchableOpacity>
        <TextInput style={styles.inputHeader} placeholder="O quê você quer ouvir hoje?" />
        <TouchableOpacity onPress={() => navigation.navigate('loginCadastro')}>
          <Image source={require('../../../../assets/user.png')} style={styles.ImagemUser} />
        </TouchableOpacity>
      </View>
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

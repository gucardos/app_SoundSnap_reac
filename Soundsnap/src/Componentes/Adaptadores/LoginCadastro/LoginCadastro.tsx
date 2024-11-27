import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>{isLogin ? 'Login' : 'Cadastro'}</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#777"
      />
      <TextInput
        style={styles.loginInput}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#777"
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => {
        const message = isLogin ? 'Logando...' : 'Cadastrando...';
        console.log(message);
      }}>
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

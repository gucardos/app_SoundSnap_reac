import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../../Styles/styles';  // Assumindo que você já possui os estilos definidos.

type RootStackParamList = {
  index: undefined;
  loginCadastro: undefined;
};

interface HeaderWithSearchProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSearchSubmit: () => void;
}

const HeaderWithSearch: React.FC<HeaderWithSearchProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Image source={require('../../../assets/logo_soundsnap_claro.png')} style={styles.ImagemLogo} />
      </TouchableOpacity>
      <TextInput
        style={styles.inputHeader}
        placeholder="O quê você quer ouvir hoje?"
        placeholderTextColor="#777"
        value={searchQuery}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearchSubmit}
      />
      <TouchableOpacity onPress={() => navigation.navigate('loginCadastro')}>
        <Image source={require('../../../assets/user.png')} style={styles.ImagemUser} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithSearch;

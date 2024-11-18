import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import logo from './assets/logo_soundsnap_claro.png';
import styles from './src/styles.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}
          style={styles.ImagemLogo}/>
        <TextInput style={styles.inputHeader} defaultValue='O quê você quer ouvir hoje?'/>
      </View>
      <Text style={styles.TituloDefault}>Hello World!</Text>
    </View>
  );
}


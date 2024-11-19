import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import styles from './src/styles.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo_soundsnap_claro.png')}
          style={styles.ImagemLogo}/>
        <TextInput style={styles.inputHeader} placeholder='O quê você quer ouvir hoje?'/>
      </View>
      <Text style={styles.TituloDefault}>Hello World!</Text>
    </View>
  );
}


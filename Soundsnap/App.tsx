import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './src/Styles/styles.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo_soundsnap_claro.png')}
          style={styles.ImagemLogo}/>
        <TextInput style={styles.inputHeader} placeholder='O quê você quer ouvir hoje?'/>
        <Image source={require('./assets/user.png')}
          style={styles.ImagemUser}/>
      </View>
      <View style={styles.container}>

      </View>
    </View>
  );
}


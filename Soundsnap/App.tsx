import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './src/Styles/styles.js';
import { useEffect } from 'react';

export default function App() {
  async function acess() {
    let c_id = "c39f13e6b0b9496882f544f1a9456d7a"
    let c_sct = "b819c1e4cca44124bd66cbc9b5e74e79"
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {"content-type": "application/x-www-form-urlencoded", },
        body: new URLSearchParams({
            grant_type: 'client_credentials', 
            client_id: c_id, 
            client_secret: c_sct 
        }),
      });
    let data = response.json()


    return data
}

useEffect(() => {acess()}, [])

const test =  acess()

console.log('acces =>',  test)
console.log('acces =>')

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


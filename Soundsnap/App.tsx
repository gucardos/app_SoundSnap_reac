import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './src/Styles/styles.js';
import { useEffect, useState } from 'react';
import {acess} from './acess';
import Album from './src/Models/Album.js';
import ListaAlbum from './src/Componentes/Adaptadores/ListaAlbum/index';
import axios from "axios";
import ItemAlbum from './src/Componentes/Adaptadores/ItemAlbum/index';
 
 
 
 
 
export default function Index() {
  
 
 

 

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo_soundsnap_claro.png')}
          style={styles.ImagemLogo}/>
        <TextInput style={styles.inputHeader} placeholder='O quê você quer ouvir hoje?'/>
        <Image source={require('./assets/user.png')}
          style={styles.ImagemUser}/>
      </View>
      <View style={styles.container}>
      <View style={styles.albumContainer}>
        <TouchableOpacity onPress={() => { /* navegue para o detalhe do álbum */ }}>
          
          <ItemAlbum></ItemAlbum>
          
          
        </TouchableOpacity>
      
      </View>
    </View>
  </View>

  )
}


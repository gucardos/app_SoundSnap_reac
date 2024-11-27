import { Image, StyleSheet, Text, TextInput,  View } from 'react-native';
import styles from './src/Styles/styles.js';
import { useEffect, useState } from 'react';
import {acess, get_rand_album} from './acess';
import Album from './src/Models/Album.js';
import ListaAlbum from './src/Componentes/Adaptadores/ListaAlbum/index';
import axios from "axios";
import ItemAlbum from './src/Componentes/Adaptadores/ItemAlbum/index';
 
 
 
 
 
export default function Index() {
  const [listaAlb,setLista] = useState<Album[]>([])
  
  async function  listaAlbum()  {
   const lista = [];
   var i=0
   for(i=0;i<20;i++){
      var album = await get_rand_album();
      lista.push(album.albums.items[0])
   }
   setLista(lista)
   return lista;
 }
 
 useEffect(()=>{
  listaAlbum()
 },[])

 

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

          
          <ListaAlbum albuns={listaAlb}></ListaAlbum>
          
          

      </View>
    </View>
  </View>

  )
}


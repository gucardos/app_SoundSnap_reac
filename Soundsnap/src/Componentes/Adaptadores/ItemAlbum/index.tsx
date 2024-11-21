import Album from './src/Models/Album.tsx';
import styles from './src/Styles/styles.js';
import React from "react";

import { Text, View, Image } from "react-native";

interface PropAlbum{
    Album:Album
}

const ItemAlbum:React.FC<PropAlbum> = ( {Album})=> {
    
    console.log(Album)
    
    return (
        <View style={styles.card} >
            <Text style={styles.cardText} >{Album.nomeAlbum}</Text>
            <Text style={styles.cardText} >{Album.nomeArtista}</Text>
            <Text style={styles.cardText} >{Album.lancamento}</Text>
            <Image source={{uri:Album.foto} } 
             style={styles.image}   />
  
            
        </View>
    )

}

export default ItemAlbum;
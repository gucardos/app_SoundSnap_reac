// src/Componentes/Adaptadores/ItemAlbum/index.tsx

import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../../../Styles/styles";
import Album from "../../../Models/Album";

interface PropAlbum {
  album: Album;
  aoAtualizar?: (album: Album) => void;  // Função para navegar para DetalhesAlbum
}

const ItemAlbum: React.FC<PropAlbum> = ({ album, aoAtualizar }) => {

  return (
    <TouchableOpacity onPress={() => aoAtualizar?.(album)}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{album.nomeAlbum}</Text>
        <Text style={styles.cardText}>{album.nomeArtista}</Text>
        <Image source={{ uri: album.foto }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemAlbum;

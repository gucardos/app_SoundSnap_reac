import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../../Styles/styles';
import Album from '../../../Models/Album';

interface PropAlbum {
  album: Album;
}

const ItemAlbum: React.FC<PropAlbum> = ({ album }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        {album ? (
          <>
            <Text style={styles.cardText}>{album.nomeAlbum}</Text>
            <Text style={styles.cardText}>
              {album.nomeArtista}
            </Text>
            <Image
              source={{ uri: album.foto }}
              style={styles.image}
            />
          </>
        ) : (
          <Text style={styles.cardText}>Nenhum álbum encontrado.</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemAlbum;

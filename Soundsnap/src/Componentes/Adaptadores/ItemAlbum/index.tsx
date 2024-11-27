import React, { useEffect, useState} from "react";
import { Text, View, Image, TouchableOpacity  } from "react-native";
import { get_rand_album } from "../../../../acess";  // Importando a função correta
import styles from "../../../Styles/styles";
import Album from "../../../Models/Album";

interface PropAlbum{
    album: Album;
    
}

const ItemAlbum: React.FC<PropAlbum> = ({album}) => {
    const [albumData, setAlbumData] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Estado para indicar se estamos carregando os dados
    const [error, setError] = useState<string | null>(null); // Para exibir erros 

    useEffect(() => {
        setAlbumData(album)

       ; // Chama a função para buscar o álbum ao carregar o componente
    }, []); // O useEffect é chamado apenas uma vez ao montar o componente

    

    return (
        <TouchableOpacity>
        <View style={styles.card}>
            {albumData ? (
                <>
                    <Text style={styles.cardText}>{albumData.name}</Text>
                    <Text style={styles.cardText}>
                        {albumData.artists && albumData.artists[0]?.name}
                    </Text>
                    <Image
                        source={{ uri: albumData.images && albumData.images[0]?.url }}
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

import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { get_rand_album } from "../../../../acess";  // Importando a função correta
import styles from "../../../Styles/styles";

const ItemAlbum: React.FC = () => {
    const [albumData, setAlbumData] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Estado para indicar se estamos carregando os dados
    const [error, setError] = useState<string | null>(null); // Para exibir erros 

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                setLoading(true); // Inicia o carregamento
                setError(null); // Reseta qualquer erro anterior

                // Busca dados de álbum aleatório
                const data = await get_rand_album();
                console.log("Dados do álbum:", data); // Log para verificar a resposta da API

                if (data && data.albums && data.albums.items.length > 0) {
                    setAlbumData(data.albums.items[0]); // Atualiza o estado com o primeiro álbum encontrado
                } else {
                    setError("Nenhum álbum encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do álbum:", error);
                setError("Erro ao buscar os dados do álbum.");
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchAlbum(); // Chama a função para buscar o álbum ao carregar o componente
    }, []); // O useEffect é chamado apenas uma vez ao montar o componente

    if (loading) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}>Erro: {error}</Text>
            </View>
        );
    }

    return (
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
    );
};

export default ItemAlbum;

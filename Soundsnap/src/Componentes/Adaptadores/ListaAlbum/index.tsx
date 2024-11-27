import { FlatList, View } from "react-native";
import ItemAlbum from "../ItemAlbum";
import styles from '../../../Styles/styles';
import Album from '../../../Models/Album'; // Corrigido para evitar duplicidade
import React from "react";

interface PropListaAlbum {
    albuns: Album[];
    aoAtualizar?: Function;
}

interface PropItemAlbum {
    album: Album;
}

const ListaAlbum: React.FC<PropListaAlbum> = ({ albuns }) => {
    const renderItem = ({ item }: { item: Album }) => (
        <ItemAlbum album={item} />
    );
    return (
        <FlatList
            data={albuns}
            keyExtractor={(album) => album.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
    );
};

export default ListaAlbum;

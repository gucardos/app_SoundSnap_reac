// src/Componentes/Adaptadores/ListaAlbum/index.tsx

import React from "react";
import { FlatList, View } from "react-native";
import ItemAlbum from "../ItemAlbum";
import Album from '../../../Models/Album';

interface PropListaAlbum {
  albuns: Album[];
  aoAtualizar?: (album: Album) => void;  // Função para navegar para DetalhesAlbum
}

const ListaAlbum: React.FC<PropListaAlbum> = ({ albuns, aoAtualizar }) => {
  return (
    <FlatList
      data={albuns}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ItemAlbum
          album={item}
          aoAtualizar={aoAtualizar}  // Passando a função de navegação para ItemAlbum
        />
      )}
    />
  );
}

export default ListaAlbum;

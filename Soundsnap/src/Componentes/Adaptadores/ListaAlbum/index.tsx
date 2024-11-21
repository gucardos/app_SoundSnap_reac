import { FlatList, ScrollView, View } from "react-native";
import ItemAlbum from "../ItemAlbum"
import styles from './src/Styles/styles.js';
import Album from './src/Models/Album.tsx';
import React from "react";

interface PropListaAlbum{
    albuns: Album[];
    aoAtualizar?:Function;
}

const  ListaAlbum:React.FC<PropListaAlbum> =
         ({albuns})=>{
    return (
    
        <FlatList
            data={albuns}
            keyExtractor={(p)=>p.id.toString()}
            renderItem={
                ({item})=>{
                    return <ItemAlbum
                        Album={item}
                        </ItemAlbum>
                }
            }
        />
        
    
    )
}

export default ListaAlbum
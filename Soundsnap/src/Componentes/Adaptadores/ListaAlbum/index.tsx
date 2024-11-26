import { FlatList, ScrollView, View } from "react-native";
import ItemAlbum from "../ItemAlbum"
import styles from '../../../Styles/styles';
import Album from '../../../Models/Album';
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
                        album={item}></ItemAlbum>
                        
                }
            }
        />
        
    
    )
}

export default ListaAlbum
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d4cdc5'
    },
    TituloDefault:{
      fontSize: 30,
      color: '#191013'
    },
    ImagemLogo:{
      width: 80,
      height: 80,
      paddingTop: 'auto',
      paddingLeft: 0
    },
    header:{
      backgroundColor: '#191013',
      height:110,
      width:'auto',
      paddingTop: 20,
      paddingLeft: 0,
      flexDirection:'row',
      alignItems:'center',
      
    },
    inputHeader:{
      color:'#191013',
      backgroundColor:'#d4cdc5',
      borderRadius:20,
      height:30,
      width:270,
      textAlign:'center',
      paddingTop:'auto',
      textAlignVertical:'auto'
    },
    ImagemUser:{
      width: 50,
      height: 50,
      paddingTop: 'auto',
      paddingLeft: 'auto',
      backgroundColor:'#d4cdc5',
      borderRadius:25,

    },
    card: {
      width: 300,
      height: 200,
      backgroundColor: '#191013',
      borderRadius: 10,
      elevation: 5, // Para Android
      shadowColor: '#000', // Para iOS
      shadowOffset: { width: 0, height: 2 }, // Para iOS
      shadowOpacity: 0.1, // Para iOS
      shadowRadius: 4, // Para iOS
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginVertical: 20
  },
  cardText: {
      fontSize: 18,
      color: '#d4cdc5',
      fontWeight:"bold"
  },
  image:{
      width:100,
      height:100,
      objectFit:"contain",
      resizeMode:"contain"
  },
  albumContainer: {
    backgroundColor: '#d4cdc5',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center'
  },
  albumImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  description: {
    padding: 10,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#777',
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    fontSize: 14,
  },
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 14,
    color: '#ff7f50',
  },
  });
  
export default styles;

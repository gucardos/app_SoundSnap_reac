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
      paddingTop: 0,
      paddingLeft: 0
    },
    header:{
      backgroundColor: '#191013',
      height:80,
      width:'auto',
      paddingTop: 0,
      paddingLeft: 0,
      flexDirection:'row',
      alignItems:'center'
    },
    inputHeader:{
      color:'#191013',
      backgroundColor:'#d4cdc5',
      borderRadius:20,
      height:30,
      width:250,
      textAlign:'center'
    }
  });
  
export default styles;

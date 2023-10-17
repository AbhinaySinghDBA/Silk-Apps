import { StyleSheet } from 'react-native';

//const styles = StyleSheet.create({
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 25,
  },
picker: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  marginBottom: 10,
},

  submitClose:{
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 16,


  },
  metricLabel: {
    fontSize: 14,
    marginTop: 15,
    marginBottom:5,
    
    
//    fontWeight: 'bold',

  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#ebf0ed',
    borderBottomWidth:
    StyleSheet.hairlineWidth,
  },
  input: {
    height: 60,
    margin: 1,
    borderWidth: 1,
    borderColor: "#ebf0ed",
    padding: 10,
    borderRadius: 15,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    fontSize:16,
  },

  noteText:{
     marginTop: 16,
     fontSize: 16,
  },

  chooseBorder:{
       borderColor: '#ebf0ed',
       borderWidth: 1,
       borderRadius: 15,
       height: 60,

    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
      paddingLeft: 200,
      paddingRight: 30,

    },

    boxWidth: {
      height: 135,
      borderRadius: 15,
      },
     


});
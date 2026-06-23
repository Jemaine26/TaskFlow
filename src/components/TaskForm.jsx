import React from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';



export default function TaskForm({ task, setTask, onAdd }) {


  return (

    <View style={styles.inputContainer}>


      <TextInput

        style={styles.input}

        placeholder="Enter task"

        value={task}

        onChangeText={setTask}

      />



      <TouchableOpacity

        style={styles.addButton}

        onPress={onAdd}

      >


        <Text style={styles.buttonText}>
          +
        </Text>


      </TouchableOpacity>



    </View>

  );

}



const styles = StyleSheet.create({


  inputContainer: {

    flexDirection:'row',

    alignItems:'center',

    marginBottom:15,

  },


  input: {

    flex:1,

    backgroundColor:'#fff',

    borderWidth:1,

    borderColor:'#ddd',

    borderRadius:10,

    paddingHorizontal:15,

    paddingVertical:12,

    fontSize:16,

  },


  addButton: {

    backgroundColor:'#007AFF',

    marginLeft:10,

    paddingHorizontal:18,

    paddingVertical:12,

    borderRadius:10,

  },


  buttonText: {

    color:'#fff',

    fontWeight:'bold',

    fontSize:18,

  },


});
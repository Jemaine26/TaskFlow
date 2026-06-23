import React from 'react';


import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';



export default function TaskItem({ item, onToggle, onDelete }) {



  return (


    <TouchableOpacity


      onPress={() => onToggle(item)}


      onLongPress={() => onDelete(item.id)}



    >


      <View style={styles.taskRow}>


        <Text


          style={[

            styles.taskText,

            item.completed && styles.completed

          ]}


        >

          {item.title}


        </Text>



      </View>


    </TouchableOpacity>


  );


}




const styles = StyleSheet.create({


  taskRow:{


    backgroundColor:'#fff',

    padding:15,

    borderRadius:10,

    marginBottom:10,

    borderWidth:1,

    borderColor:'#eee',


  },


  taskText:{


    fontSize:16,


  },


  completed:{


    textDecorationLine:'line-through',

    color:'gray',


  },


});
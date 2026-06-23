import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native';

import { supabase } from '../../lib/supabase';


type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};


export default function App() {


  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);



  // =========================
  // 1. LOAD TASKS
  // =========================

  const loadTasks = async () => {


    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });



    if (error) {

      console.log({ error });

      return;

    }



    setTasks(data || []);


  };





  // LOAD ON APP START

  useEffect(() => {

    loadTasks();

  }, []);







  // =========================
  // 2. ADD TASK
  // =========================


  const addTask = async () => {


    if (!task.trim()) {

      return;

    }



    const { error } = await supabase

      .from('tasks')

      .insert({

        title: task,

        completed: false,

      });





    if (error) {


      console.log({ error });


      return;


    }




    setTask('');

    Keyboard.dismiss();


    loadTasks();



  };









  // =========================
  // 3. TOGGLE TASK
  // =========================


  const toggleTask = async (item: Task) => {



    const { error } = await supabase

      .from('tasks')

      .update({

        completed: !item.completed,

      })

      .eq('id', item.id);





    if (error) {


      console.log({ error });


      return;


    }




    loadTasks();



  };









  // =========================
  // 4. DELETE TASK
  // =========================


  const deleteTask = (id:number)=>{


    Alert.alert(

      "Delete Task",

      "Are you sure you want to delete this task?",


      [

        {

          text:"Cancel",

          style:"cancel"


        },


        {

          text:"Delete",


          onPress: async()=>{


            const { error } = await supabase

              .from('tasks')

              .delete()

              .eq('id', id);





            if(error){


              console.log({error});


              return;


            }




            loadTasks();



          }


        }



      ]


    );



  };









  return (


    <View style={styles.container}>


      <Text style={styles.title}>

        TaskFlow

      </Text>





      {/* INPUT AREA */}


      <View style={styles.inputContainer}>


        <TextInput


          style={styles.input}


          placeholder="Enter task"


          value={task}


          onChangeText={setTask}



        />





        <TouchableOpacity


          style={styles.addButton}


          onPress={addTask}



        >



          <Text style={styles.buttonText}>

            +

          </Text>



        </TouchableOpacity>




      </View>










      {/* TASK LIST */}



      <FlatList


        data={tasks}



        keyExtractor={(item)=>item.id.toString()}



        renderItem={({item})=>(



          <TouchableOpacity



            onPress={()=>toggleTask(item)}



            onLongPress={()=>deleteTask(item.id)}



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



        )}



      />





    </View>



  );



}









const styles = StyleSheet.create({


  container:{


    flex:1,

    padding:20,

    marginTop:50,

    backgroundColor:'#F5F5F5',


  },





  title:{


    fontSize:32,

    fontWeight:'bold',

    marginBottom:20,


  },







  inputContainer:{


    flexDirection:'row',

    alignItems:'center',

    marginBottom:15,


  },






  input:{


    flex:1,


    backgroundColor:'#fff',


    borderWidth:1,


    borderColor:'#ddd',


    borderRadius:10,


    paddingHorizontal:15,


    paddingVertical:12,


    fontSize:16,



  },







  addButton:{


    backgroundColor:'#007AFF',


    marginLeft:10,


    paddingHorizontal:18,


    paddingVertical:12,


    borderRadius:10,



  },









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








  buttonText:{


    color:'#fff',


    fontWeight:'bold',


    fontSize:18,



  },



});
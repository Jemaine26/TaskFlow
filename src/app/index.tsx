import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';


import Toast from 'react-native-toast-message';


import { Ionicons } from '@expo/vector-icons';


import { supabase } from '../../lib/supabase';


import TaskForm from '../components/TaskForm';




export default function Index() {


  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState<any[]>([]);





  // =========================
  // READ
  // =========================


  const loadTasks = async () => {


    const { data, error } = await supabase

      .from('tasks')

      .select('*')

      .order('created_at', {
        ascending:false
      });




    if(error){


      console.log(error);



      Toast.show({

        type:'error',

        text1:'Load Failed',

        text2:error.message

      });



      return;

    }





    setTasks(data || []);


  };






  useEffect(()=>{


    loadTasks();


  },[]);










  // =========================
  // CREATE
  // =========================


  const addTask = async()=>{


    if(!task.trim()) return;




    const {error}=await supabase

      .from('tasks')

      .insert({

        title:task,

        completed:false

      });





    if(error){


      console.log(error);



      Toast.show({

        type:'error',

        text1:'Add Failed',

        text2:error.message

      });



      return;

    }





    Toast.show({

      type:'success',

      text1:'Task Added'

    });





    setTask('');

    Keyboard.dismiss();


    loadTasks();


  };









  // =========================
  // UPDATE
  // =========================


  const toggleTask = async(item:any)=>{



    const {error}=await supabase

      .from('tasks')

      .update({

        completed:!item.completed

      })

      .eq('id',item.id);





    if(error){



      Toast.show({

        type:'error',

        text1:'Update Failed',

        text2:error.message

      });



      return;


    }





    Toast.show({

      type:'success',

      text1:'Task Updated'

    });




    loadTasks();


  };









  // =========================
  // DELETE
  // =========================


  const deleteTask = async(id:number)=>{



    const {error}=await supabase

      .from('tasks')

      .delete()

      .eq('id',id);






    if(error){



      Toast.show({

        type:'error',

        text1:'Delete Failed',

        text2:error.message

      });



      return;


    }





    Toast.show({

      type:'success',

      text1:'Task Deleted'

    });




    loadTasks();



  };









  return(


    <View style={styles.container}>


      <Text style={styles.title}>

        TaskFlow CRUD

      </Text>





      <TaskForm


        task={task}

        setTask={setTask}

        onAdd={addTask}


      />







      <FlatList


        data={tasks}



        keyExtractor={(item)=>item.id.toString()}




        renderItem={({item})=>(



          <View style={styles.taskRow}>


            <TouchableOpacity

              style={{flex:1}}

              onPress={()=>toggleTask(item)}

            >



              <Text


                style={[

                  styles.taskText,

                  item.completed && styles.completed

                ]}



              >


                {item.title}



              </Text>


            </TouchableOpacity>






            <Ionicons


              name="trash-outline"


              size={28}


              color="red"


              onPress={()=>deleteTask(item.id)}



            />





          </View>


        )}



      />





      <Toast />


    </View>



  );


}










const styles = StyleSheet.create({



container:{


flex:1,

padding:20,

marginTop:50,

backgroundColor:'#F5F5F5'


},





title:{


fontSize:32,

fontWeight:'bold',

marginBottom:20


},





taskRow:{


backgroundColor:'#fff',

padding:15,

borderRadius:10,

marginBottom:10,

flexDirection:'row',

alignItems:'center'


},





taskText:{


fontSize:16,


},





completed:{


textDecorationLine:'line-through',

color:'gray'


}



});
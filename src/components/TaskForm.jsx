import React from 'react';

import {
View,
TextInput,
TouchableOpacity,
Text,
StyleSheet
} from 'react-native';



export default function TaskForm({
task,
setTask,
onAdd
}){


return(

<View style={styles.container}>


<TextInput

style={styles.input}

placeholder="Enter task"

value={task}

onChangeText={setTask}

/>





<TouchableOpacity

style={styles.button}

onPress={onAdd}

>


<Text style={styles.text}>

+

</Text>


</TouchableOpacity>


</View>


);


}





const styles=StyleSheet.create({


container:{

flexDirection:'row',

marginBottom:15

},



input:{

flex:1,

backgroundColor:'#fff',

borderWidth:1,

borderColor:'#ddd',

borderRadius:10,

padding:12

},



button:{

backgroundColor:'#007AFF',

marginLeft:10,

paddingHorizontal:20,

justifyContent:'center',

borderRadius:10

},



text:{

color:'#fff',

fontSize:22,

fontWeight:'bold'

}


});
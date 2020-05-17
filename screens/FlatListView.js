import React, { useState } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import {Icon} from 'react-native-elements';



const TextInputView=(props)=>{
  const lightGrey='#fafaf6';
  const darkBlue="#2d4059"
  const goldenYellow='#ffd717'   //#07d5c0   //#c6e872   //#fbffa3
  const [selectionColor, setSelectionColor] = useState(lightGrey)
  const [textColor, setTextColor] = useState(darkBlue)
  return(
    <View style={{alignItems:"center", justifyContent:"space-between", flexDirection:"row", borderRadius:8, backgroundColor:selectionColor, paddingVertical:10, paddingHorizontal:16}}>
      
      <View>
        <TextInput value={props.item} style={{fontSize:15, color:textColor}} editable={false}></TextInput>
      </View>
        <View style={{ justifyContent:"flex-end", flexDirection:"row"}}>
          <View>
            {(selectionColor===lightGrey) &&
            <Icon name="circle" type="feather" color={darkBlue} onPress={()=>{
                setSelectionColor(darkBlue)
                setTextColor('white')
            }}/>
          }
          {(selectionColor!==lightGrey) &&
            <Icon name="check-circle" type="feather" color={goldenYellow} onPress={()=>{
                setSelectionColor(lightGrey)
                setTextColor(darkBlue)
            }}/>
          }
          </View>
        </View>
    </View>
  )
}


const renderItem = (obj,onDelete)=>{
  return(
    <View style={{marginVertical:5}}>
      <TextInputView item={obj.item} onDelete={onDelete}></TextInputView>
    </View>
  )

}
const FlatListView=(props)=>{
  return(<FlatList data={props.data}
      renderItem={(obj)=>renderItem(obj,props.onDelete)}
      keyExtractor={obj =>obj}
      />)
}

export default FlatListView



//   const TextInputView=(props)=>{
//     return(
//       <View style={{alignItems:"center", justifyContent:"space-between", flexDirection:"row",paddingVertical:10}}>
//         <View style={{width:"80%"}}>
//           <TextInput value={props.item} ></TextInput>
//         </View>
//           <View  style={{ justifyContent:"flex-end", flexDirection:"row", width:"20%" }}>
//             <View>
//               <Icon name="check" type="feather" onPress={()=>{props.onDelete(props.item)}}/>
//             </View>
//           </View>
//       </View>
//     )
//   }
  

// const renderItem = (obj,onDelete)=>{
//   return(
//     // <Text>{obj.item}</Text>
//     <TextInputView item={obj.item} onDelete={onDelete}></TextInputView>
//   )

// }
// const FlatListView=(props)=>{
//   return(<FlatList data={props.data}
//       renderItem={(obj)=>renderItem(obj, props.onDelete)}
//       keyExtractor={obj =>obj}
//       />)
// }

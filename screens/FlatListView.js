import React, { useState } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';



const TextInputView=(props)=>{
  const lightGrey='#fafaf6';
  const darkBlue="#2d4059"
  const goldenYellow='#ffd717'   //#07d5c0   //#c6e872   //#fbffa3
  const [selectionColor, setSelectionColor] = useState(lightGrey)
  const [textColor, setTextColor] = useState(darkBlue)
  return(
    <View style={{alignItems:"center", justifyContent:"space-between", flexDirection:"row", borderRadius:8, backgroundColor:selectionColor, paddingVertical:10, paddingHorizontal:16, width:"100%"}}>
      
      <View style={{width:"90%"}}>
        <TouchableOpacity onPress={()=>{
          props.onTouch(props.item)
        }}>
            <Text style={{fontSize:15, color:textColor}}>{props.item}</Text>
            
        </TouchableOpacity>
      </View>
        <View style={{ justifyContent:"flex-end", flexDirection:"row", width:"10%"}}>
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


const renderItem = (obj,onTouch)=>{
  return(
      <View style={{marginVertical:5}}>
        <TextInputView item={obj.item} onTouch={onTouch} ></TextInputView>
      </View>
  )

}
const FlatListView=(props)=>{
  return(<FlatList data={props.data}
      renderItem={(obj)=>renderItem(obj,props.onTouch)}
      keyExtractor={obj =>obj}
      />)
}

export default FlatListView
import React, { useState } from 'react';
import {  StyleSheet, Text, View, TextInput, Button, StatusBar, FlatList } from 'react-native';
import {Icon} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';



export default function App() {

  const [listViewData, setListViewData] = useState(["lamfsd","sfedfdv","sdfkjnsdkf"])
  const [undoData, setUndoData] = useState()
  const [newData, setNewData] = useState('')
  const [deletedData, setDeletedData] = useState('')
  const [deleted, setDeleted] = useState(false)


  const FlatListView=(props)=>{
    return(<FlatList data={props.data}
        renderItem={(obj)=>renderItem(obj)}
        keyExtractor={obj =>obj}
        />)
  }

  
  const TextInputView=(props)=>{

    return(
      <View style={{alignItems:"center", justifyContent:"space-between", flexDirection:"row",paddingVertical:10,}}>

        
      <Text>{props.item} </Text>
        <View  style={{ justifyContent:"flex-end", flexDirection:"row" }}>
          <Icon name="check" type="feather" onPress={()=>{
            setUndoData(listViewData)
            setListViewData(listViewData.filter(x=>(x!==props.item)))
            setDeletedData(props.item)
            setDeleted(true)
        }}/>
        </View>
        </View>
    )
  }


  const renderItem = (obj)=>{

    return(<View >
      <TextInputView item={obj.item}></TextInputView>

    </View>)

  }
  
  return(
    <View style={styles.container}>
      
      <View style={{flex:1, padding:10}}>
      <FlatListView data={listViewData}></FlatListView>
      </View>
        <Snackbar
        style={{marginBottom:100, alignSelf:"center", marginLeft:27}}
          visible={deleted}
          onDismiss={()=>{
            setDeleted(false)
          }}
          duration={1500}
          action={{
            label: 'Undo',
            onPress: () => {
              // setDeleted(false)
              setListViewData(undoData)
              setDeleted(false)
            },
          }}
        >
          {deletedData} is removed from list
        </Snackbar>
      
      <View style={{justifyContent:"space-between", flexDirection:"row", flex:0, paddingTop:20, paddingHorizontal:10, paddingBottom:10}}>
        <TextInput value={newData} onChangeText={text=>{
          setNewData(text)
        }} placeholder="Create your new item" multiline></TextInput>
        <View >
          <Icon name="plus" type="feather" onPress={()=>{
            if(newData)
            {
              a=listViewData.filter(x=>(x===newData))
              console.log(a.length)
              if(a.length===0){
                setListViewData([...listViewData, newData])
              }
              else{
                alert(newData + " Already exists")
              }
          }
          setNewData('')
        
        }}></Icon>
        </View>
      </View>
      


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:StatusBar.currentHeight,
    padding:10,
    marginTop:30,
    flex: 1,
    backgroundColor: '#fff',
  },
});

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, StatusBar, FlatList } from 'react-native';
import {Icon, colors} from 'react-native-elements';
import {Snackbar, Headline} from 'react-native-paper';
import FlatListView from './screens/FlatListView'

export default function App() {

  const [listViewData, setListViewData] = useState(["task1","task2"])
  const [undoData, setUndoData] = useState([])
  const [newData, setNewData] = useState(null)
  const [deletedData, setDeletedData] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [created, setCreated] = useState(false)
  const [deletedAll, setDeletedAll] = useState(false)



  const onDeletePress=(item)=>{
            setUndoData(listViewData)
            setListViewData(listViewData.filter(x=>(x!==item)))
            setDeletedData(item)
            setDeleted(true)
  }
  
  return(
    <View style={{flex:1}}>
      <View style={styles.header}>
        <Text adjustsFontSizeToFit style={{ color:"#333644", fontSize:20, fontWeight:"bold", letterSpacing:0 }}>To do App</Text>
        <TouchableOpacity onPress={()=>{setDeletedAll(true); setUndoData(listViewData); setListViewData([])}}>
          <Text adjustsFontSizeToFit style={{ color:"#333644", fontSize:15, fontWeight:"bold" }}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{flex:1}}>
          <FlatListView data={listViewData} onDelete={onDeletePress}></FlatListView>
        </View>
        <Snackbar
          style={styles.snakeBar}
          visible={deleted}
          onDismiss={()=>{setDeleted(false)}}
          duration={1500}
          action={{
            label: 'Undo',
              onPress: () => {
                setListViewData(undoData)
                setDeleted(false)
              },
            }}
          >
            {deletedData} is removed from list
        </Snackbar>
        { newData &&
          <Snackbar
          style={styles.snakeBar}
          visible={created}
          onDismiss={()=>{ setCreated(false); setNewData(null) }}
          duration={2500}
          action={{
            
            label: 'OK',
              onPress: () => {
                
                setCreated(false)
                setNewData(null) 
              },
            }}
          >
            {newData} is created
        </Snackbar>
        }
        <Snackbar
          style={styles.snakeBar}
          visible={deletedAll}
          onDismiss={()=>{setDeletedAll(false)}}
          duration={1500}
          action={{
            label: 'Undo',
              onPress: () => {
                setListViewData(undoData)
                setDeletedAll(false)
              },
            }}
          >
            All entries are removed from list
        </Snackbar>
        
        <View style={{justifyContent:"space-between", flexDirection:"row", flex:0, paddingTop:20, paddingHorizontal:10, paddingBottom:10}}>
          <View style={{width:"90%"}}>
            <TextInput value={newData} onChangeText={text=>{setNewData(text)}} placeholder="Create your new item" multiline></TextInput>
          </View>
          
          <View style={{width:"10%"}}>
            <Icon name="plus-circle" color="#001f3f" type="feather" onPress={()=>{
              if(newData)
              {
                const a=listViewData.filter(x=>(x===newData))
                console.log(a.length)
                if(a.length===0){
                  setListViewData([...listViewData, newData])
                  setCreated(true)
                }
                else{
                  alert(newData + " Already exists")
                  setNewData(null)
                }
            }
          }}></Icon>
          </View>
        </View>
        


      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({

  header:{
    paddingTop:StatusBar.currentHeight+20,
    flex:0,
    padding:20,
    borderBottomWidth:2,
    borderBottomColor:"#f6f6f6",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:'center',
    backgroundColor:"#fff",
    
  },
  container: {
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:6,
    flex: 1,
    backgroundColor: '#fafaf6',
  },
  snakeBar:{
    marginBottom:80,
    alignSelf:"center",
    marginLeft:27,
    backgroundColor:"#2d4059",
    paddingHorizontal:10
  }
});

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, FlatList } from 'react-native';
import { Icon, colors } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import FlatListView from './screens/FlatListView'

export default function App() {

  const [listViewData, setListViewData] = useState(["task1","task2"])
  const [undoData, setUndoData] = useState([])
  const [newData, setNewData] = useState(null)
  const [displayNewData, setDisplayNewData] = useState(null)
  // const [newDataCreated, setNewDataCreated] = useState(false)
  const [deletedData, setDeletedData] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [created, setCreated] = useState(false)
  const [deletedAll, setDeletedAll] = useState(false)
  const [touched, setTouched] = useState(false)

  const onTouch = (item)=>{
    setTouched(true)
    setDeletedData(item)
  }

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
          <FlatListView onTouch={onTouch} data={listViewData}></FlatListView>
        </View>
        <Snackbar
          style={styles.snakeBar}
          visible={deleted}
          onDismiss={()=>{setDeleted(false)}}
          duration={500}
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
          <Snackbar
          style={styles.snakeBar}
          visible={created}
          onDismiss={()=>{ setCreated(false); setNewData(null);}}
          duration={500}
          >
            {displayNewData} is created
        </Snackbar>
        <Snackbar
          style={styles.snakeBar}
          visible={deletedAll}
          onDismiss={()=>{setDeletedAll(false)}}
          duration={1000}
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
        <Snackbar
          style={styles.snakeBar}
          visible={touched}
          onDismiss={()=>{setTouched(false)}}
          duration={500}
          action={{
            label: 'Delete',
              onPress: () => {
                onDeletePress(deletedData)
              },
            }}
          >
            
            
            Delete {deletedData} ?
        </Snackbar>
        
        <View style={{justifyContent:"space-between", flexDirection:"row", flex:0, paddingTop:20, paddingHorizontal:10, paddingBottom:10}}>
          <View style={{width:"90%"}}>
            <TextInput  onTouchStart={()=>{setCreated(false);setNewData(null)}} value={newData} onChangeText={text=>{setNewData(text)}} placeholder="Create your new item" ></TextInput>
          </View>
          
          <View style={{width:"10%"}}>
            <Icon name="plus-circle" color="#001f3f" type="feather" onPress={()=>{
              if(newData)
              {
                const a=listViewData.filter(x=>(x===newData))
                if(a.length===0){
                  setListViewData([...listViewData, newData])
                  setCreated(true)
                  setDisplayNewData(newData)
                }
                else{
                  alert(newData + " Already exists")
                  setCreated(false)
                }
                setNewData(null)

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

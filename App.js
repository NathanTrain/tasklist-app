import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TouchableHighlight, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular, Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import modalStyles from './modalStyles.js';

export default function App() {
  
  const [tarefas, setTarefas] = useState([]);
  const [modal, setModal] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState('');
  console.disableYellowBox = true;


  useEffect(()=>{
    (async () => {
      try{
        let tarefasAtual = await AsyncStorage.getItem('tarefas');
        (tarefasAtual == null)? setTarefas([]) : setTarefas(JSON.parse(tarefasAtual));
      }catch(error){
      }
  })(); // faz função e ja executa { ( ()=>{} ) () }
}, []);
  



  function deletarTarefa(id){
    alert('Tarefa deletada com sucesso!')
    let newTarefas = tarefas.filter((val)=>{
      return val.id != id;
    });

    setTarefas(newTarefas);
    (async()=>{
      try{
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
      }catch{

      }
    })();
  }

  function addTarefa() {
    setModal(false);
    let id = 0;
    if(tarefas.length > 0){
      id = tarefas[tarefas.length-1].id + 1;
    }
    if (tarefaAtual != ''){
      let tarefa = {id:id, tarefa:tarefaAtual}
      setTarefas([...tarefas,tarefa]);
      setTarefaAtual('');

      (async () =>{
        try{
          await AsyncStorage.setItem('tarefas', JSON.stringify([...tarefas,tarefa]))
        }catch(error){
          //saving error
        }
      })();

    }
  }

  { //verificador se a fonte foi carregada
    let [fontsLoaded] = useFonts({
      Ubuntu_400Regular,
      Ubuntu_300Light
    });  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  }

  return (
    <ScrollView style={{flex:1}}>
      <StatusBar hidden/>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TextInput
              onChangeText={text => setTarefaAtual(text)}
              multiline={true}
              numberOfLines={5}
              autoFocus={true}
              style={{padding:10, height:50, textAlignVertical:'top', fontSize:15}}/>
            <TouchableHighlight
              style={modalStyles.openButton}
              onPress={() => addTarefa()}>
              <Text style={modalStyles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Header></Header>

      {
        tarefas.map((val)=>{
          return(
            <View style={styles.tarefasSingle}>
                <View style={styles.tarefaText}>
                  <Text>{val.tarefa}</Text>
                </View>
                <View style={styles.apagar}>
                  <TouchableOpacity onPress={() => deletarTarefa(val.id)} >
                    <AntDesign name="minuscircleo" size={26} color="black" />
                  </TouchableOpacity>
                </View>
            </View>
          );
        })
      }

      <TouchableOpacity onPress={()=> setModal(true)} style={styles.btnAddTarefa}>
        <Text style={{textAlign:'center', color:'white', fontSize:20, fontFamily:'Ubuntu_300Light'}}>Adicionar Tarefa</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tarefasSingle:{
    marginTop:20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection:'row',
    paddingBottom: 10,
  },
  tarefaText:{
    flex:1,
    width:'100%',
    padding: 10,
  },
  apagar:{
    alignItems: 'flex-end',
    flex:1,
    padding:10
  },
  btnAddTarefa:{
    width:'100%',
    padding:8,
    backgroundColor: '#b70b',

  },
});

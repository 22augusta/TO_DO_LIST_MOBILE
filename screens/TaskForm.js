
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import api from '../services/api';

export default function TaskForm({ route, navigation }) {
  const task = route.params?.task;
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'pending');

  const saveTask = async () => {
    if (task) {
      await api.put(`/${task._id}`, { title, description, status });
    } else {
      await api.post('/', { title, description, status });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} />
      <Button title="Salvar" onPress={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});

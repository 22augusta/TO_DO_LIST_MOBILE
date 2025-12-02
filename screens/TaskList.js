import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await api.get('/');
    setTasks(response.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation]);

  const deleteTask = async (id) => {
    await api.delete(`/${id}`);
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <Button title="Nova Tarefa" onPress={() => navigation.navigate('TaskForm')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { task: item })}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.status}</Text>
            </TouchableOpacity>
            <Button title="Excluir" color="red" onPress={() => deleteTask(item._id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  taskItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 18 }
});

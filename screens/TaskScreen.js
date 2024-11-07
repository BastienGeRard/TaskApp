import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig'; // Assure-toi d'importer db et auth de firebaseConfig
import { collection, addDoc, query, onSnapshot, where, deleteDoc, doc } from 'firebase/firestore';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const user = auth.currentUser; // Récupère l'utilisateur actuel

  useEffect(() => {
    // Récupère les tâches de l'utilisateur depuis Firestore
    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArray);
    });
    return unsubscribe;
  }, []);

  const addTask = async () => {
    if (task.length > 0) {
      await addDoc(collection(db, 'tasks'), {
        text: task,
        userId: user.uid,
        createdAt: new Date(),
      });
      setTask('');
    }
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, 'tasks', taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
  },
});

export default TaskScreen;

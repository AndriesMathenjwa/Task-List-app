"use client"
import React, { useState, useEffect } from 'react';
import { db } from "@/services/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaTrash, FaEdit } from "react-icons/fa";
import TaskForm from "@/components/TaskForm";
import "./homePage.scss";

interface TaskData {
  category: string;
  title: string;
  details: string;
  id?: string;
  userId?: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTasks(user.uid);
      }
      setUserLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (userId: string) => {
    const userTasksRef = collection(db, 'tasks');
    const q = query(userTasksRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const tasksArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      category: doc.data().category || "",
      title: doc.data().title || "",
      details: doc.data().details || "",
    })) as TaskData[];
    setTasks(tasksArray);
  };

  const handleAddOrUpdateTask = async (task: TaskData) => {
    if (task.id) {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, { category: task.category, title: task.title, details: task.details });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, category: task.category, title: task.title, details: task.details } : t));
      setEditTaskId(null);
    } else {
      const newTask: TaskData = {
        category: task.category,
        title: task.title,
        details: task.details,
        userId: auth.currentUser?.uid,
      };
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
    }
  };


  const handleEditTask = (task: TaskData) => {
    setEditTaskId(task.id || null);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const groupedTasks = tasks.reduce((acc: Record<string, TaskData[]>, task) => {
    acc[task.category] = acc[task.category] || [];
    acc[task.category].push(task);
    return acc;
  }, {});

  return (
    <div className="task-app">
      <h1>Task-List App</h1>
      <button className="add-task-btn" onClick={() => { setShowForm(true); setEditTaskId(null); }}>+</button>

      {showForm && (
        <TaskForm
          editTaskId={editTaskId}
          onClose={() => setShowForm(false)}
          onSubmit={handleAddOrUpdateTask}
          initialValues={editTaskId ? tasks.find(task => task.id === editTaskId) : undefined}
        />

      )}

      <div className="task-list">
        {userLoaded ? (
          Object.keys(groupedTasks).map((category) => (
            <div key={category} className="task-category">
              <h2>{category}</h2>
              {groupedTasks[category].map((task) => (
                <div className="task" key={task.id}>
                  <p>{task.title}</p>
                  <div className="task-actions">
                    <button onClick={() => handleEditTask(task)}><FaEdit /></button>
                    <button onClick={() => handleDeleteTask(task.id || "")}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading tasks...</p>
        )}
      </div>
    </div>
  );
}

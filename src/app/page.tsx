"use client";
import React, { useState, useEffect } from 'react';
import { db } from "@/services/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaTrash, FaEdit } from "react-icons/fa";
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
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
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

  const handleAddTask = async () => {
    if (auth.currentUser) {
      const newTask: TaskData = {
        category,
        title,
        details,
        id: "",
        userId: auth.currentUser.uid,
      };
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
      setCategory("");
      setTitle("");
      setDetails("");
      setShowForm(false);
    }
  };

  return (
    <div className="task-app">
      <h1>Task-List App</h1>
      <button className="add-task-btn" onClick={() => setShowForm(true)}>+</button>

      {showForm && (
        <div className="task-form">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div className="task-list">
        {userLoaded ? (
          tasks.map((task, index) => (
            <div className="task" key={task.id || index}>
              <p>{task.title}</p>
              <div className="task-actions">
                <button><FaTrash /></button>
                <button><FaEdit /></button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading tasks...</p>
        )}
      </div>
    </div>
  );
}

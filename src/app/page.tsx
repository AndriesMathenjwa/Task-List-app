"use client"
import Image from "next/image";
import "./homePage.scss";
import { db } from "@/services/firebase";
import { collection, addDoc, getDoc, deleteDoc, query, serverTimestamp, orderBy, doc,updateDoc, getDocs, DocumentReference} from "firebase/firestore"
import React, {useState, useEffect} from 'react'
import { FaTrash, FaEdit } from "react-icons/fa"; 


interface TaskData {
  category: string;
  title: string;
  details: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([
    { category: "Personal", title: "Pay your bills", details: "Electricity and water bills" },
    { category: "Work", title: "Review code", details: "Check PRs and refactor" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleAddTask = () => {
    const newTask = { category, title, details };
    setTasks([...tasks, newTask]);
    setCategory("");
    setTitle("");
    setDetails("");
    setShowForm(false);
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
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <p>{task.title}</p>
            <div className="task-actions">
            <button><FaTrash /></button>
            <button><FaEdit /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


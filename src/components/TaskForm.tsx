"use client";
import React, { useEffect, useState } from 'react';
import "./taskForm.scss";

interface TaskData {
    category: string;
    title: string;
    details: string;
    id?: string;
    userId?: string;
}

interface TaskFormProps {
    editTaskId: string | null;
    onClose: () => void;
    onSubmit: (task: TaskData) => Promise<void>;
    initialValues?: TaskData;
}

const TaskForm: React.FC<TaskFormProps> = ({ editTaskId, onClose, onSubmit, initialValues }) => {
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');

    useEffect(() => {
        if (initialValues) {
            setCategory(initialValues.category);
            setTitle(initialValues.title);
            setDetails(initialValues.details);
        } else {
            setCategory('');
            setTitle('');
            setDetails('');
        }
    }, [initialValues]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task: TaskData = {
            category,
            title,
            details,
            id: editTaskId || undefined,
        };
        await onSubmit(task);
        onClose();
    };

    return (
        <div className="task-form">
            <h2>{editTaskId ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="details">Details:</label>
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editTaskId ? 'Update Task' : 'Add Task'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default TaskForm;

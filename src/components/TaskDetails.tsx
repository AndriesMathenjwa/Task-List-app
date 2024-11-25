import React from 'react';
import './taskDetails.scss';

interface TaskData {
  category: string;
  title: string;
  details: string;
  id?: string;
  status: 'Pending' | 'Completed';
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: 'Pending' | 'Completed') => void;
}

const TaskDetails: React.FC<TaskData> = ({ title, details, category, status, id, onClose, onUpdateStatus }) => {
  const toggleStatus = () => {
    if (id) {
      const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
      onUpdateStatus(id, newStatus);
    }
  };

  return (
    <div className="task-details-backdrop">
      <div className="task-details-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Details:</strong> {details}</p>
        <p><strong>Status:</strong> {status}</p>
        <button className="status-btn" onClick={toggleStatus}>
          Mark as {status === 'Pending' ? 'Completed' : 'Pending'}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;

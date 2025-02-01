import React, { useState } from 'react';
    import './index.css';

    const translations = {
      en: {
        title: "To-Do List",
        addTaskButton: "Add Task",
        updateTaskButton: "Update Task",
        favoriteButton: "Favorite",
        unfavoriteButton: "Unfavorite",
        editButton: "Edit",
        removeButton: "Remove",
        toggleLanguageButton: "Switch to French"
      },
      fr: {
        title: "Liste de tâches",
        addTaskButton: "Ajouter une tâche",
        updateTaskButton: "Mettre à jour la tâche",
        favoriteButton: "Favori",
        unfavoriteButton: "Non favori",
        editButton: "Éditer",
        removeButton: "Supprimer",
        toggleLanguageButton: "Passer à l'anglais"
      }
    };

    function App() {
      const [tasks, setTasks] = useState([]);
      const [inputValue, setInputValue] = useState('');
      const [editingTaskId, setEditingTaskId] = useState(null);
      const [language, setLanguage] = useState('en');

      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

      const addTask = () => {
        if (inputValue.trim()) {
          if (editingTaskId !== null) {
            // Update existing task
            setTasks(tasks.map(task =>
              task.id === editingTaskId ? { ...task, text: inputValue } : task
            ));
            setEditingTaskId(null);
          } else {
            // Add new task
            setTasks([...tasks, { id: Date.now(), text: inputValue, favorite: false }]);
          }
          setInputValue('');
        }
      };

      const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
      };

      const toggleFavorite = (taskId) => {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, favorite: !task.favorite } : task
        ));
      };

      const editTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setInputValue(taskToEdit.text);
        setEditingTaskId(taskId);
      };

      const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en');
      };

      return (
        <div className="app">
          <h1>{translations[language].title}</h1>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={translations[language].addTaskButton}
            className="input-field"
          />
          <button onClick={addTask} className="add-button">
            {editingTaskId !== null ? translations[language].updateTaskButton : translations[language].addTaskButton}
          </button>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.favorite ? 'favorite' : ''}`}>
                {task.text}
                {task.favorite && <span className="star">*</span>}
                <button onClick={() => toggleFavorite(task.id)} className="favorite-button">
                  {task.favorite ? translations[language].unfavoriteButton : translations[language].favoriteButton}
                </button>
                <button onClick={() => editTask(task.id)} className="edit-button">{translations[language].editButton}</button>
                <button onClick={() => removeTask(task.id)} className="remove-button">{translations[language].removeButton}</button>
              </li>
            ))}
          </ul>
          <button onClick={toggleLanguage} className="language-toggle">
            {translations[language].toggleLanguageButton}
          </button>
        </div>
      );
    }

    export default App;

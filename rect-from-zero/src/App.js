import React, { useState, useEffect } from 'react';

import api from './services/api';
import Header from './components/Header';
import './App.css'

const App = () => {

  const [propjects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response)
      setProjects(response.data);
    }).catch(e => console.log('Something went wrong, try again', e));
  },[])

  const handleNewPropject = async () => {
    // setProjects([...propjects, `New propject ${new Date()}`]);

   const response = await api.post('projects', {
      title: `New propject ${new Date()}`,
      owner: 'Mario alfredo jorge',
    })

    setProjects([...propjects, response.data])
  }
  return (
    <>
      <Header title="Project" />
      <ul>
        {
          propjects.map(propject => (
            <li key={propject.id}>
              {propject.title}
              <span>{propject.owner}</span>
            </li>
          ))
        }
      </ul>

      <button type="button" onClick={handleNewPropject}>Add new Project</button>
    </>
  );
};

export default App;
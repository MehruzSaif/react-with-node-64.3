import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  // load data 
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Success', data);
      })
  }

  return (
    <div className="App">
      <h1>My Own Data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="text" name='email' placeholder='Email' required />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {
          users.map(user => <li
            key={user.id}>
            id: {user.id} name: {user.name} email: {user.email}
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;

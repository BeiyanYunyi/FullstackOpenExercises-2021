import React, { useState, useEffect } from "react";
import "./App.css";
import psons from "./persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Person = (p) => {
  return (
    <li>
      {p.name}: {p.number}
      <button onClick={p.dtePerson}>delete</button>
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    psons.getAll().then((v) => setPersons(v));
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      phone: newNumber,
    };
    if (persons.map((a) => a.name).includes(newName)) {
      setErrorMessage(`${newName}已存在`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return null;
    }
    psons.create(nameObject).then((returnedPersons) => {
      setPersons(persons.concat(returnedPersons));
    });
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (id) => {
    if (window.confirm("Sure?")) {
      psons.dte(id);
      setPersons(persons.filter((n) => n.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        <form onSubmit={addName}>
          <p>
            name: <input value={newName} onChange={handleNameChange} />
          </p>
          <p>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </p>
          <button type="submit">add</button>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((name) => (
          <Person
            key={name.id}
            name={name.name}
            number={name.phone}
            dtePerson={() => deletePerson(name.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

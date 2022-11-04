import React, { useState, useEffect } from 'react'; // to add
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {

    // For GET
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));

    // For POST
    let inBody = { // actual data
      name: 'Donald',
      like: 'ducks'
    }
    const someStuff = { // request information (metadata)
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inBody)
    };
    fetch("/hello", someStuff)
          .then(res => res.json())
          .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
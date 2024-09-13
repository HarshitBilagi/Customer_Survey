import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  return (
    <>
      <div className="header">
        <h1>{greeting}</h1>
        <h2>Welcome to Customer Survey Page.</h2>
      </div>
      <div className="survey">
        <p>Click the button below to take up the Survey.</p>
        <Link to="/survey">
            <button>Go to Survey!</button>
        </Link>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

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
    <div className="container">
      <div className="header">
        <h1>{greeting}</h1>
        <h2>Welcome to Customer Survey Page.</h2>
      </div>
      <div className="survey">
        <p>Click the button below to take up the Survey.</p>
        <Link className="button" to="/survey">
          Go to Survey!
        </Link>
      </div>
      <div />
    </div>
  );
}

export default Home;

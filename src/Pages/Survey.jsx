import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Survey.css";
import questions from "./questions.json";

function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = localStorage.getItem("surveyAnswers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextAnswer("");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTextAnswer("");
    }
  };

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: value,
    };
    setAnswers(newAnswers);
    localStorage.setItem("surveyAnswers", JSON.stringify(newAnswers));
  };

  const handleTextAnswer = (event) => {
    setTextAnswer(event.target.value);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSubmit = () => {
    let finalAnswers = { ...answers };
    if (questions[currentQuestionIndex].type === "text") {
      finalAnswers[questions[currentQuestionIndex].id] = textAnswer;
    }

    const confirmed = window.confirm("Are you sure you want to submit the survey?");
    
    if (confirmed) {
      const surveyResults = questions.map((q) => ({
        id: q.id,
        question: q.question,
        type: q.type,
        answer: finalAnswers[q.id] || "",
      }));

      console.log("Survey results to be saved:", JSON.stringify(surveyResults, null, 2));

      localStorage.setItem("savedSurveyResults", JSON.stringify(surveyResults));

      setAnswers({});
      setTextAnswer("");
      localStorage.removeItem("surveyAnswers");
      setCurrentQuestionIndex(0);
      
      alert("Thank you for completing the survey! Results have been saved.");

      setTimeout(() => {
        navigate("/"); 
      }, 5000);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <h1>Please fill the Customer Survey form below.</h1>
      <div className="surveyForm">
        <p className="formTitle">Customer Survey</p>
        <p className="questionCount">
          {currentQuestionIndex + 1}/{questions.length}
        </p>
        <p className="question">
          {currentQuestion.id}. {currentQuestion.question}
        </p>
        {currentQuestion.type === "rating" && (
          <div className="numbersMain">
            {[...Array(currentQuestion.range)].map((_, i) => (
              <div
                className={`numbers ${
                  answers[currentQuestion.id] === i + 1 ? "selected" : ""
                }`}
                key={i + 1}
                onClick={() => handleAnswer(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}
        {currentQuestion.type === "text" && (
          <input
            className="userTextInput"
            value={textAnswer || answers[currentQuestion.id] || ""}
            onChange={handleTextAnswer}
            onBlur={() => handleAnswer(textAnswer)}
            placeholder="Your answer here..."
          />
        )}
        <div className="buttons">
          <div>
            <button
              className="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
          </div>
          <div>
            {isLastQuestion ? (
              <button className="button" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button className="button" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;
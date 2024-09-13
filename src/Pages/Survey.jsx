import React from "react";

function Survey(props){
    return(
        <>
            <h1>Please fill the Customer Survey form below.</h1>
            <div className="surveyForm">
                <p>Customer Survey</p>
                <p className="questionCount">{props.questionNumber}/{props.totalQuestions}</p>
                <p className="question">{props.questionNumber}. {props.question}</p>
            </div>
        </>
    )
}

export default Survey;
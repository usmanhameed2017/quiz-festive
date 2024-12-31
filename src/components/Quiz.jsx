import React, { useEffect, useState } from 'react';
import { questions } from './Questions.js';
import './Quiz.css';
import Result from './Result.jsx';

function Quiz() 
{

    // State to start quiz
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    // State for current question index
    const [currentIndex, setCurrentIndex] = useState(0);

    // State for chosen options
    const [chosenOptions, setChosenOptions] = useState(null);

    // State for user score
    const [score, setScore] = useState(0);

    // State to track answer only first click answer
    const [isAnswered, setIsAnswered] = useState(false);

    // Handle Chosen Option
    function handleChosenOption(option, e)
    {
        // Remove the focus after the click
        e.target.blur();

        // Prevent multiple clicks for the same question
        if(isAnswered) 
        {
            return;
        }

        // Set chosen option
        setChosenOptions(option);

        setIsAnswered(true); // Mark the question as answered
        
        // If the chosen option is correct
        if(option === questions[currentIndex].correct_answer) 
        {
            setScore(score + 1);
        }        
    }

    // Handle Next Question
    function handleNextQuestion()
    {
        setCurrentIndex(currentIndex + 1);
        setChosenOptions(null);
        setIsAnswered(false); // Reset answered state for the next question
    }

    // Reset Quiz
    function handleResetQuiz()
    {
        setIsQuizStarted(false);
        setCurrentIndex(0);
        setScore(0);
    }

    return (
        
        <>  
            {/* Main Heading */}
            <h1 className='bg-dark py-5 text-white text-center fw-bold'> QUIZ APP </h1>

            <div className="container-fluid">
            {
                isQuizStarted ? 

                    currentIndex < questions.length ? 

                    // Display Quiz
                    <div className="row quiz-container">
                        <div className="col-md-4 mx-auto">

                            {/* Question Title */}
                            <h2> { questions[currentIndex].title } </h2>
                            <div>
                            {
                                questions[currentIndex].options.map((option, index) => {
                                    const bgClass = option === chosenOptions ? 
                                    chosenOptions === questions[currentIndex].correct_answer ? 
                                    "correct-answer" : "incorrect-answer" 
                                    : ""
                                    return(
                                        <input type="text" className={`form-control mb-2 text-center ${bgClass}`}  
                                        value={ option } key={ index } onClick={ (e) => handleChosenOption(option, e) } readOnly />
                                    );
                                })
                            }
                            </div>

                            {/* Next Button */}
                            <div className='d-grid mb-2'>
                                <button type="button" className='btn btn-outline-primary mt-1' 
                                onClick={ () => handleNextQuestion() }
                                disabled={ chosenOptions === null }> Next </button>
                            </div>

                            {/* Index Tracking */}
                            <div>
                                <h5 className='text-center text-secondary fw-bold'> 
                                    {  currentIndex + 1 }/{ questions.length } 
                                </h5>
                            </div>
                        </div>
                    </div>
                    :
                    // Display Score
                    <Result score={ score } questions={ questions } handleResetQuiz={ handleResetQuiz } />
                :
                // Display Start Quiz Button
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className='btn btn-outline-primary float-end'
                        onClick={ () => setIsQuizStarted(true) }> Start Quiz </button>
                    </div>
                </div>
            }
            </div>
                       
        </>
    );
}

export default Quiz;
import React, { useState } from 'react';
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

    // Handle Chosen Option
    function handleChosenOption(option)
    {
        setChosenOptions(option);
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
                                <ul>
                                {
                                    questions[currentIndex].options.map((option, index) => {
                                        const class_for_options = option === chosenOptions ? 'quiz-options bg-warning' : 'quiz-options'

                                        return(  
                                            <li key={index} className={class_for_options}
                                            onClick={ () => handleChosenOption(option) }> 
                                                { option } 
                                            </li>                    
                                        );
                                    })
                                } 
                                </ul>
                            </div>

                            {/* Next Button */}
                            <div className='d-grid'>
                                <button type="button" className='btn btn-outline-success mt-5' 
                                onClick={ () => handleNextQuestion() }
                                disabled={ chosenOptions === null }> Next </button>
                            </div>

                        </div>
                    </div>
                    :
                    // Display Score
                    <Result score={score} questions={questions} />
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
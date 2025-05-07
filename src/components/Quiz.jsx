import React, { useCallback, useState } from 'react';
import { programming_questions, science_questions, sports_questions, 
diet_questions, geography_questions, psychology_questions  } from '../questions';
import Result from './Result.jsx';
import { quizTopics } from '../topics.js';

function Quiz() 
{
    // Question
    const [questions, setQuestions] = useState(null);

    // State for current question index
    const [currentIndex, setCurrentIndex] = useState(0);

    // State for chosen options
    const [chosenOptions, setChosenOptions] = useState(null);

    // State for user score
    const [score, setScore] = useState(0);

    // State to track answer only first click answer
    const [isAnswered, setIsAnswered] = useState(false);

    // State for heading
    const [heading, setHeading] = useState("QUIZ FESTIVE");

    // Start quiz
    const startQuiz = useCallback((title) => {
        if(title === "Programming") setQuestions(programming_questions);
        if(title === "Sports") setQuestions(sports_questions);
        if(title === "Science") setQuestions(science_questions);
        if(title === "Geography") setQuestions(geography_questions);
        if(title === "Human Behavior and Psychology") setQuestions(psychology_questions);
        if(title === "Diet and Health") setQuestions(diet_questions);

        setHeading(title);
    },[]);

    // Handle Chosen Option
    const handleChosenOption = (option, e) => {
        // Remove the focus after the click
        e.target.blur();

        // Prevent multiple clicks for the same question
        if(isAnswered) return;

        // Set chosen option
        setChosenOptions(option);

        setIsAnswered(true); // Mark the question as answered
        
        // If the chosen option is correct
        if(option === questions[currentIndex].correct_answer) setScore(score + 1);
    }

    // Handle Next Question
    const handleNextQuestion = () => {
        setCurrentIndex(currentIndex + 1);
        setChosenOptions(null);
        setIsAnswered(false); // Reset answered state for the next question
    }

    // Reset Quiz
    const handleResetQuiz = useCallback(() => {
        setQuestions(null);
        setCurrentIndex(0);
        setScore(0);
        setHeading("QUIZ FESTIVE");
    },[]);

    return (
        <>  
            {/* Main Heading */}
            <h1 className='heading py-5 text-white text-center fw-bold'> { heading } </h1>

            <div className="container-fluid">
            {
                questions ? 

                    currentIndex < questions?.length ? 

                    // Display Quiz
                    <div className="row">
                        <div className="col-md-5 mx-auto quiz-container shadow">

                            {/* Question Title */}
                            <h2> { questions?.[currentIndex]?.title } </h2>
                            <div>
                            {
                                questions?.[currentIndex]?.options?.map((option, index) => {
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

                            <hr /> {/* Line separator */}

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
                // Display Quiz Topics
                <div className="row mb-4">
                    
                    {
                        quizTopics.map((topic, index) => (
                            <div className="col-md-5 mx-auto m-2 card-container shadow" key={index}>
                                <h4> { topic.title } </h4>
                                <h6> { topic.description } </h6>
                                <div>
                                    <button type='button' className='btn btn-outline-primary mt-1'
                                    onClick={ () => startQuiz(topic.title) }> Start Quiz </button>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            }
            </div>
                       
        </>
    );
}

export default Quiz;
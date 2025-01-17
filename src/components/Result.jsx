import React from 'react';

function Result({ score, questions, handleResetQuiz }) 
{
    return (
        <div>
            <div className='row mt-2'>
                <div className="col-md-4 mx-auto result-container shadow">

                    {/* Total Score */}
                    <div>
                        <h1 className='text-start fw-bold'> YOUR SCORE IS: { score } </h1>
                    </div>

                    {/* Correct Answers */}
                    <div>
                        <h3 className='text-start'> Correct Answers: </h3>
                        {
                            questions.map((element, index) => {
                                return(
                                    <h6 className='text-start' key={index}> 
                                        {`${index + 1})`} {element.correct_answer} 
                                    </h6>
                                );
                            })
                        }
                    </div>
                    
                    {/* Reset Quiz */}
                    <div className='d-grid'>
                        <button type="button" className='btn btn-outline-danger w-50'
                        onClick={ () => handleResetQuiz() }> Reset </button>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
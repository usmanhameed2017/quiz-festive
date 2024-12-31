import React from 'react';

function Result({ score, questions, handleResetQuiz }) 
{
    return (
        <div className='result-container'>
            <div className='row mt-2'>
                {/* Total Score */}
                <div className="col-md-4 mx-auto">
                    <h1 className='text-start fw-bold'> YOUR SCORE IS: { score } </h1>
                </div>
            </div>
            <div className="row mt-2">
                {/* Correct Answers */}
                <div className="col-md-4 mx-auto">
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
            </div>
            <div className="row mt-2">
                {/* Reset Quiz */}
                <div className="col-md-4 col-sm-12 col-xs-12 mx-auto">
                    <button type="button" className='btn btn-outline-danger w-50'
                    onClick={ () => handleResetQuiz() }> Reset </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
import React from 'react';

function Result({ score, questions }) 
{
    return (
        <div>
            <div className='row mt-2'>
                <div className="col-md-12">
                    <h2 className='text-center'> Your score is: { score } </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-5">
                    <h2> Correct Answers: </h2>
                    <ul>
                        {
                            questions.map((element, index) => {
                                return(
                                    <li key={index}> {element.correct_answer} </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Result;
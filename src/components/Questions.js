import React, {useState} from 'react';
import Axios from 'axios';

function Questions (props){
    const [state, setState] = useState({
        answer: {}
      });

    const onAnswerChanged = (e) => {

          setState(prevState => {
        return {...prevState, answer:{freetextvalue: e.target.value, questionId: props.data.id}}
      });

    }

    const handleInput = (e) => {
        setState(prevState => {
            return {...prevState, answer:{freetextvalue: e.target.value, questionId: props.data.id}}
          });
    }

    const submitAnswer = () => {

          Axios.post("https://localhost:44306/api/quiz", state.answer )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
    }

    let isMCQ = true;
    if(props.data.quizType !== 1 )
         isMCQ = false;
    return(
        <div className="quiz-box">
                    <p className="quiz-box-quiz"> { props.data.title } </p>
                    <p></p>
                    <br />
                    {isMCQ ? (

                             props.data.options.map((option) => {
                                                
                                return(
                                    <div>
                                    <input type="radio" name = {props.data.id} value = {option.title}
                                    onChange= {(e) => onAnswerChanged(e)}
                                    />
                                    <label>{ option.title }</label>
                                    </div>
                                ) 
                            })
                            

                    ) :
                    (
                            <div>
                            <input type="text" placeholder = "your input" onChange = {handleInput} />
                            </div>
                        
                    )

                    }
                    <br/>
                    <div className="quiz-box-panel">
                        <p>Question Summary: {props.data.summary} </p>
                        <p>Answer: { state.answer.freetextvalue } </p>
                    </div>

                    <div>
                        <button onClick = { submitAnswer } >Submit Answer</button>
                    </div>
   </div>
    );
                }

export default Questions ;
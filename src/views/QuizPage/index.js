import React, { useState, useEffect } from 'react';
import {
  OutlinedInput,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TakeQuiz from '../../components/TakeQuiz';

const QuizPage = (props) => {
  const [name, setName] = useState('');
  const [showQues, setShowQues] = useState(false);
  const [ViewSubmissionCode, setViewSubmissionCode] = useState();
  const [questions, setQuestions] = useState();
  const { quizCode } = props;
  const onNameAdded = () => {
    if (name) {
      setShowQues(true);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/addQuiz/${quizCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data[0]['questions']);
        setViewSubmissionCode(data[0]['ViewSubmissionCode']);
      });
  }, []);

  return (
    <div className="flex flex-col ml-32 max-w-sm">
      <Typography className={showQues ? 'mt-12 font-thin text-xl' : 'mt-64'}>
        Welcome to the quiz #{quizCode}
        {showQues ? `, ${name}!` : ''}
      </Typography>
      {showQues ? (
        <div>
          <TakeQuiz
            ViewSubmissionCode={ViewSubmissionCode}
            name={name}
            quizCode={quizCode}
            questions={questions}
          />
        </div>
      ) : (
        <OutlinedInput
          onChange={(event) => setName(event.target.value)}
          value={name}
          className="mt-4"
          placeholder="Enter your Name to continue"
          variant="outlined"
          endAdornment={
            <IconButton onClick={onNameAdded}>
              <ArrowForwardIcon />
            </IconButton>
          }
        />
      )}
    </div>
  );
};

export default QuizPage;

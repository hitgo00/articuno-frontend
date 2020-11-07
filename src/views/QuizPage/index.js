import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

const QuizPage = (props) => {
  const { quizCode } = props;

  return (
    <div className="flex flex-col mt-64 ml-32 max-w-sm">
      <Typography> Welcome to the quiz #{quizCode}</Typography>
      <TextField
        // onChange={(event) => setAnsText(event.target.value)}
        // value={ansText}
        // multiline
        className="mt-4"
        label="Enter your Name to continue"
        variant="outlined"
      />
    </div>
  );
};

export default QuizPage;

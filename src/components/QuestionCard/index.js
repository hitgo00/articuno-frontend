import React, { useState, useEffect } from 'react';
import c from 'classnames';
import { css } from 'emotion';
import { TextField, Button, Typography } from '@material-ui/core';

const quizCard = css`
  width: 500px;
  .inputField {
    width: 400px;
  }
`;

const QuizCard = (props) => {
  const { addQuestion, questionDetail, onEdit } = props;
  const { question = '', answer = '', score = 1, id } = questionDetail;
  const [quesText, setQuesText] = useState(question);
  const [ansText, setAnsText] = useState(answer);
  const [errorMsg, setErrorMsg] = useState('');
  const [quesScore, setScore] = useState(score);

  const [isNew, setIsNew] = useState(true);

  const onDone = () => {
    if (quesText && ansText && quesScore) {
      onEdit(
        {
          question: quesText,
          answer: ansText,
          score: quesScore,
          id: Math.floor(Math.random() * 1000000000),
        },
        id
      );
    } else setErrorMsg('Please fill all the required fields.');
  };

  const onAdd = () => {
    if (quesText && ansText && quesScore) {
      addQuestion({
        question: quesText,
        answer: ansText,
        score: quesScore,
        id: Math.floor(Math.random() * 1000000000),
      });
      setQuesText('');
      setAnsText('');
      setScore(1);
    } else setErrorMsg('Please fill all the required fields.');
  };

  useEffect(() => {
    if (quesText) setIsNew(false);
  }, []);

  return (
    <div className={c(quizCard, 'rounded-full flex flex-col mt-10')}>
      <TextField
        onChange={(event) => setQuesText(event.target.value)}
        required
        value={quesText}
        fullWidth
        label="Question text"
        variant="outlined"
      />
      <div className="flex mt-2">
        <TextField
          onChange={(event) => setAnsText(event.target.value)}
          value={ansText}
          required
          multiline
          className=" inputField "
          label="Correct answer"
          variant="outlined"
        />
        <TextField
          required
          onChange={(event) => setScore(event.target.value)}
          value={quesScore}
          className="w-20 ml-10"
          label="Score"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <Button
        variant="outlined"
        onClick={isNew ? onAdd : onDone}
        className="mt-4"
      >
        {isNew ? `Add` : 'Done'}
      </Button>
      <Typography className="mt-1 text-red-600">
        {errorMsg && errorMsg}
      </Typography>
    </div>
  );
};
export default QuizCard;

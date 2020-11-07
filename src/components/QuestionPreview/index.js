import React from 'react';
import c from 'classnames';
import { css } from 'emotion';
import { Typography, Box, Button } from '@material-ui/core';

const quizCard = css`
  width: 500px;
`;

const QuestionPreview = (props) => {
  const { questionDetail, onEdit, onRemove } = props;
  const { question, answer, score, id } = questionDetail;

  return (
    <Box className={c('flex flex-col space-y-3 mt-10', quizCard)}>
      <Typography className="font-nanumPen text-lg">{question}</Typography>
      <Typography className="font-poppins">
        <Typography className="font-light text-md text-gray-900">
          ➤ {answer}
        </Typography>
      </Typography>
      <Typography className="font-medium text-gray-800 mb-2">
        Score: {score}
      </Typography>
      <Box className="flex justify-between">
        <Button
          onClick={() => onRemove(id)}
          className={css`
            width: 250px;
          `}
          variant="outlined"
        >
          Remove
        </Button>
        <Button
          onClick={onEdit}
          className={css`
            width: 250px;
          `}
          variant="outlined"
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPreview;

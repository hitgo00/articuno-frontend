import React from 'react';
import { css } from 'emotion';
import { Link } from '@reach/router';
import {
  OutlinedInput,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const LandingPage = () => {
  const [quizCode, setQuizCode] = React.useState('');
  const [subCode, setSubCode] = React.useState('');

  const lastQuizCode = localStorage.getItem('QuizCode');
  const lastQuizSubCode = localStorage.getItem('ViewSubmissionCode');

  return (
    <div
      className={css`
        position: absolute;
        top: 30%;
        left: 40%;
      `}
    >
      <Button>
        <Link to="/create">Create </Link>
      </Button>
      <div className="flex flex-col">
        <OutlinedInput
          onChange={(event) => setQuizCode(event.target.value)}
          value={quizCode}
          className="mt-4"
          placeholder="Enter the Quiz code"
          endAdornment={
            <IconButton>
              <Link to={quizCode ? `/quiz/${quizCode}` : '/'}>
                <ArrowForwardIcon />
              </Link>
            </IconButton>
          }
        />

        <OutlinedInput
          onChange={(event) => setSubCode(event.target.value)}
          value={subCode}
          className="mt-4 w-64"
          placeholder="Enter the Submission code"
          endAdornment={
            <IconButton>
              <Link to={subCode ? `/submission/${subCode}` : '/'}>
                <ArrowForwardIcon />
              </Link>
            </IconButton>
          }
        />
      </div>

      <div className="mt-20 max-w-sm">
        {lastQuizCode ? (
          <div>
            {`Last created Quiz Code:${lastQuizCode}`}
            <br />
            {`Last created Submission Code:${lastQuizSubCode}`}
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  );
};
export default LandingPage;

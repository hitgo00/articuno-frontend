import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import c from 'classnames';
import { css } from 'emotion';
import {
  OutlinedInput,
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
} from '@material-ui/core';

const quizCard = css`
  width: 300px;
  position: fixed;
  top: 30%;
  left: 30%;
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={c('flex flex-col space-y-3 mt-10', quizCard)}>
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
    top: '30%',
    // left: '10%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const AnswerHandler = (props) => {
  const { q, index, value, answer: prevAns, updateAns } = props;

  const [answer, setAnswer] = React.useState();
  return (
    <TabPanel value={value} index={index}>
      <Typography className="text-2xl text-gray-900">{q.question}</Typography>
      <Typography className="font-medium text-gray-800 mb-2">
        Max score: {q.score}
      </Typography>
      <OutlinedInput
        multiline
        onChange={(event) => {
          setAnswer(event.target.value);
          updateAns(index, event.target.value, q.id);
        }}
        value={answer}
        className="mt-4"
        placeholder="Answer the question above"
      />
    </TabPanel>
  );
};
export default function VerticalTabs(props) {
  const { questions, name, quizCode, ViewSubmissionCode } = props;
  const [answersList, setAnswersList] = React.useState(
    Array(questions.length).fill({})
  );
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const onAnswerChange = (index, text, questionId) => {
    const bufferArray = answersList;
    bufferArray[index] = { id: questionId, answer: text };
    setAnswersList(bufferArray);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const questionsSizeArray = Array(questions.length).fill(0);

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const onSubmit = () => {
    console.log(ViewSubmissionCode);
    fetch('http://localhost:4949/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentName: name,
        answers: answersList,
        QuizCode: quizCode,
        ViewSubmissionCode: ViewSubmissionCode,
      }),
    })
      .then((response) => {
        console.log('Success:', response.status);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={classes.root + ' absolute'}>
      {isSubmitted ? (
        'Successfully Submitted 🤟🏻'
      ) : (
        <>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {questionsSizeArray.map((q, index) => (
              <Tab label={`Question ${index + 1}`} />
            ))}
          </Tabs>
          {questions.map((q, index) => (
            <AnswerHandler
              updateAns={onAnswerChange}
              answer={answersList[index]}
              value={value}
              q={q}
              index={index}
            />
          ))}
          {value === questions.length - 1 ? (
            <Button
              onClick={onSubmit}
              className="fixed bottom-0 right-0 mr-12 mb-4"
            >
              Submit
            </Button>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

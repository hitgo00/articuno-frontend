import React from 'react';
import _ from 'lodash';
import { Link } from '@reach/router';
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

import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
let model;
let ctx;
let rafID;

const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

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

  const [reaction, setReaction] = React.useState();

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

  const videoRef = React.useRef();

  function drawKeypoints(keypoints) {
    const keypointsArray = keypoints;

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i][0];
      const x = keypointsArray[i][1];
    }

    const fingers = Object.keys(fingerLookupIndices);
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i];
      const points = fingerLookupIndices[finger].map((idx) => keypoints[idx]);

      if (i == 0) {
        if (points[0][1] > points[4][1] + 70) {
          setReaction('👍');
          setTimeout(() => setReaction(null), 10000);

          if (value < questions.length && value > 0) {
            let d = value;
            setValue(d - 1);
          }
        } else if (points[0][1] < points[4][1] - 49) {
          setReaction('👎');
          setTimeout(() => setReaction(null), 10000);
          if (value > -1 && value < questions.length - 1) {
            let d = value;
            setValue(d + 1);
          }
        } else {
          setReaction(null);
        }
      }
    }
  }

  React.useEffect(async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: 320,
        height: 250,
      },
    });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    await tf.setBackend('webgl');
    model = await handpose.load();

    const landmarksRealTime = async (video) => {
      async function frameLandmarks() {
        const predictions = await model.estimateHands(video);

        if (predictions.length > 0) {
          const result = predictions[0].landmarks;
          drawKeypoints(result, predictions[0].annotations);
        }
        rafID = requestAnimationFrame(frameLandmarks);
      }

      frameLandmarks();
    };
    setTimeout(() => landmarksRealTime(videoRef.current), 700);
  }, []);

  console.log(value);

  return (
    <div className={classes.root + ' absolute'}>
      <video className="fixed top-0 right-0" playsInline ref={videoRef} />
      <div className="fixed top-0 right-0 mt-48 mr-20 text-6xl">
        {reaction ? reaction : ''}
      </div>
      {isSubmitted ? (
        <div className="flex flex-col">
          {`Successfully Submitted 🤟🏻, `}
          <br />
          <Link to="/">
            <Button className="mt-4"> Back to home</Button>
          </Link>
        </div>
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

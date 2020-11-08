import React, { useState } from 'react';
import _ from 'lodash';
import { Link } from '@reach/router';
import QuestionCard from '../../components/QuestionCard';
import QuestionHandler from '../../components/QuestionHandler';
import { Button, Typography } from '@material-ui/core';

const QuizBuilder = () => {
  const [quizCode, setQuizCode] = useState(null);
  const [ViewSubmissionCode, setViewSubmissionCode] = useState(null);
  const [questionsList, setQuestionList] = useState([]);
  const addQuestion = (questionDetails) => {
    setQuestionList(questionsList.concat(questionDetails));
  };
  const onRemove = (id) => {
    const newList = _.filter(questionsList, (obj) => obj.id !== id);
    setQuestionList(newList);
  };

  const onEdit = (questionDetail, oldId) => {
    const newList = _.filter(questionsList, (obj) => obj.id !== oldId);
    setQuestionList(newList.concat(questionDetail));
  };

  const onSubmit = () => {
    fetch('http://localhost:4949/addQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionsList),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setQuizCode(data['QuizCode']);
        setViewSubmissionCode(data['ViewSubmissionCode']);
        localStorage.setItem('ViewSubmissionCode', data['ViewSubmissionCode']);
        localStorage.setItem('QuizCode', data['QuizCode']);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="mt-20 ml-64">
      {quizCode ? (
        <Typography className=" flex flex-col font-thin">
          Your quiz code is: {quizCode} <br />
          To view submissions for this quiz, note this submission code:{' '}
          {ViewSubmissionCode}
          <Link to="/">
            <Button className="mt-4"> Back to home</Button>
          </Link>
        </Typography>
      ) : (
        <>
          {questionsList.map((questionDetail) => (
            <QuestionHandler
              key={questionDetail.id}
              addQuestion={addQuestion}
              onRemove={onRemove}
              onEdit={onEdit}
              questionDetail={questionDetail}
            />
          ))}
          <QuestionCard questionDetail={{}} addQuestion={addQuestion} />
          {questionsList.length > 1 ? (
            <Button
              onClick={onSubmit}
              className="absolute bottom-0 right-0 mr-4 mb-4 text-2xl"
            >
              Create
            </Button>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};
export default QuizBuilder;

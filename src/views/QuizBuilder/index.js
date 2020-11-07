import React, { useState } from 'react';
import _ from 'lodash';
import QuestionCard from '../../components/QuestionCard';
import QuestionPreview from '../../components/QuestionPreview';

const QuestionHandler = (props) => {
  const { questionDetail, addQuestion, onRemove, onEdit } = props;

  const [mode, setMode] = useState('PREVIEW');
  const onAddQuestion = (questionDetails) => {
    addQuestion({ questionDetails });
    setMode('PREVIEW');
  };

  const onDoneClick = (questionDetail, oldId) => {
    onEdit(questionDetail, oldId);
    setMode('PREVIEW');
  };

  return (
    <>
      {mode === 'EDIT' ? (
        <QuestionCard
          questionDetail={questionDetail}
          addQuestion={onAddQuestion}
          onRemove={onRemove}
          onEdit={onDoneClick}
        />
      ) : (
        <QuestionPreview
          questionDetail={questionDetail}
          onEdit={() => setMode('EDIT')}
          onRemove={onRemove}
        />
      )}
    </>
  );
};

const QuizBuilder = () => {
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

  return (
    <div className="mt-20 ml-64">
      {questionsList.map((questionDetail, index) => (
        <QuestionHandler
          addQuestion={addQuestion}
          onRemove={onRemove}
          onEdit={onEdit}
          questionDetail={questionDetail}
        />
      ))}
      {/* <QuestionHandler index={questionsList.length} addQuestion={addQuestion} /> */}
      {/* <QuestionPreview
        question={'What is the name of ..?'}
        answer={'The correct answer is ...'}
        score={20}
      />
      <QuestionPreview
        question={'What is the name of ..?'}
        answer={'The correct answer is ...'}
        score={20}
      /> */}
      {/* <QuestionCard
        question={'What is the name of ..?'}
        answer={'The correct answer is ...'}
        score={20}
        addQuestion={addQuestion}
      /> */}
      <QuestionCard questionDetail={{}} addQuestion={addQuestion} />
    </div>
  );
};
export default QuizBuilder;

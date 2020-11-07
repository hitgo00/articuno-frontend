import React, { useState } from 'react';
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

export default QuestionHandler;

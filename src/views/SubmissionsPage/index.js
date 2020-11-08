import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

const SubmissionsPage = (props) => {
  const { submissionCode } = props;
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/results/allStudents/${submissionCode}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        // setQuestions(data[0]['questions']);
        // setViewSubmissionCode(data[0]['ViewSubmissionCode']);
      });
  }, []);

  return (
    <div className="flex flex-col mt-12 ml-32 max-w-sm">
      <Typography className="mb-20">
        {' '}
        Viewing submissions for #{submissionCode}
      </Typography>
      {data
        ? data.map((submission) => {
            return (
              <div className="my-4">
                {submission.StudentName}
                {`     [Total:${submission.TotalScore}]`}
                <ul>
                  {submission.answers.map((answer) => {
                    return (
                      <li>
                        {answer.answer} - {`Score: ${answer.CalculatedScore}`}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default SubmissionsPage;

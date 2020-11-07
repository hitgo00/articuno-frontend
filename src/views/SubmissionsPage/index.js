import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

const SubmissionsPage = (props) => {
  const { submissionCode } = props;

  return (
    <div className="flex flex-col mt-64 ml-32 max-w-sm">
      <Typography> Viewing submissions for #{submissionCode}</Typography>
    </div>
  );
};

export default SubmissionsPage;

import React from 'react';
import { css } from 'emotion';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';

const LandingPage = () => {
  return (
    <div
      className={css`
        position: absolute;
        top: 30%;
        left: 47%;
      `}
    >
      <Button>
        <Link to="/create">Create </Link>
      </Button>
    </div>
  );
};
export default LandingPage;

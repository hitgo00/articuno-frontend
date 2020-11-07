import { Router } from '@reach/router';
import QuizBuilder from './views/QuizBuilder';
import LandingPAge from './views/LandingPage';
import QuizPage from './views/QuizPage';
import SubmissionsPage from './views/SubmissionsPage';

function App() {
  return (
    <Router primary={false}>
      <LandingPAge path="/" />
      <QuizBuilder path="/create" />
      <QuizPage path="/quiz/:quizCode" />
      <SubmissionsPage path="/submission/:submissionCode" />
    </Router>
  );
}

export default App;

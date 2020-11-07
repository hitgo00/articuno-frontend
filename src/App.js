import { Router } from '@reach/router';
import QuizBuilder from './views/QuizBuilder';
import LandingPAge from './views/LandingPage';

function App() {
  return (
    <Router primary={false}>
      <LandingPAge path="/" />
      <QuizBuilder path="/create" />
    </Router>
  );
}

export default App;

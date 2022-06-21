import logo from './assets/images/primereact-logo.webp';
import './App.css';
import { AppButton } from './components/Button';
import { CreateQuestionDialog } from 'components/CreateQuestionDialog';
import { useCallback, useState } from 'react';
import { QuestionFeedbackDialog } from 'components/QuestionFeedbackDialog';

const App = () => {
  const [isCreateQuestionDialogVisible, setIsCreateQuestionDialogVisible] = useState<boolean>(false);
  const onHideCreateQuestionDialog = useCallback(() => {
    setIsCreateQuestionDialogVisible(false);
  }, []);

  const [isQuestionFeedbackDialogVisible, setIsQuestionFeedbackDialogVisible] = useState<boolean>(false);
  const onHideQuestionFeedbackDialog = useCallback(() => {
    setIsQuestionFeedbackDialogVisible(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AppButton label="Create question" onClick={() => setIsCreateQuestionDialogVisible(true)} />
        <div className="mx-8">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            PrimeReact proof of concept.
          </p>
          <a
            className="App-link"
            href="https://www.primefaces.org/primereact/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about PrimeReact
          </a>
        </div>
        <AppButton label="Leave feedback" onClick={() => setIsQuestionFeedbackDialogVisible(true)} />
      </header>

      <CreateQuestionDialog isVisible={isCreateQuestionDialogVisible} onHide={onHideCreateQuestionDialog} />
      <QuestionFeedbackDialog isVisible={isQuestionFeedbackDialogVisible} onHide={onHideQuestionFeedbackDialog} />
    </div>
  );
}

export default App;

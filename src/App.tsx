import logo from './assets/images/primereact-logo.webp';
import './App.css';
import { AppButton } from './components/Button';
import { CreateQuestionDialog } from 'components/CreateQuestionDialog';
import { useCallback, useState } from 'react';

const App = () => {
  const [isCreateQuestionDialogVisible, setIsCreateQuestionDialogVisible] = useState<boolean>(false);
  const onHideCreateQuestionDialog = useCallback(() => {
    setIsCreateQuestionDialogVisible(false);
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
        <AppButton label="Leave feedback" />
      </header>

      <CreateQuestionDialog isVisible={isCreateQuestionDialogVisible} onHide={onHideCreateQuestionDialog} />
    </div>
  );
}

export default App;

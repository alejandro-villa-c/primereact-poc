import { AppButton } from 'components/Button';
import { AppDialog } from 'components/Dialog';
import { AppInputText } from 'components/InputText';
import { AppMultiSelect } from 'components/MultiSelect';
import { AppRadioButton } from 'components/RadioButton';
import { AppTextarea } from 'components/Textarea';
import { AppToast, AppToastComponent } from 'components/Toast';
import { useCallback, useRef, useState } from 'react';

export interface CreateQuestionDialogProps {
  onHide(): void;
  isVisible: boolean;
}

export const CreateQuestionDialog = (props: CreateQuestionDialogProps) => {
  const toast = useRef<AppToastComponent>(null);
  const [questionText, setQuestionText] = useState<string | undefined>(undefined);
  const [questionCategories, setQuestionCategories] = useState<number[]>([]);
  const questionCategoryOptions = [
    { name: 'HTML', id: 1 },
    { name: 'CSS', id: 2 },
    { name: 'JavaScript', id: 3 },
    { name: 'Python', id: 4 },
    { name: 'C#', id: 5 },
    { name: 'Java', id: 6 },
  ];
  const defaultAnswer = { answerText: '', isCorrect: false };
  const minimumAnswers = 2;
  const [answers, setAnswers] = useState<{ answerText: string; isCorrect: boolean; }[]>([{ ...defaultAnswer }, { ...defaultAnswer }]);

  const saveQuestion = useCallback(() => {
    if (toast && toast.current) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Question created successfully', life: 3000 });
    }
  }, [toast]);

  const footer = (<div className="align-items-end">
    <AppButton label="Cancel" className="p-button-rounded p-button-danger mr-3" onClick={props.onHide} />
    <AppButton label="Save" className="p-button-rounded p-button-success" onClick={saveQuestion} />
  </div>);

  return (
    <>
      <AppDialog header="Create a question" onHide={props.onHide} visible={props.isVisible} footer={footer} style={{ width: '50vw' }} resizable={false} draggable={false}>
        <div className="mb-4">
          <label htmlFor="question-text" className="text-xl">Question</label>
          <AppTextarea id="question-text" autoResize value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={{ width: '100%' }} className="mt-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="question-categories" className="text-xl">Categories</label>
          <AppMultiSelect id="question-categories" value={questionCategories} options={questionCategoryOptions} onChange={(e) => setQuestionCategories(e.value)} optionValue="id" optionLabel="name" placeholder="Select the categories" filter style={{ width: '100%' }} className="mt-3" />
        </div>
        <div className="flex flex-column">
          <label className="text-xl">Answers</label>
          {answers.map((answer, i) => {
            return (
              <div key={i} className="flex align-items-center">
                <div className="p-inputgroup my-3 mr-3">
                  <AppInputText value={answer.answerText} placeholder={`Answer ${i + 1}...`} onChange={(e) => {
                    const value = e.target.value;
                    const answersClone = [...answers];
                    answersClone[i].answerText = value;
                    setAnswers(answersClone);
                  }} />
                  <span className="p-inputgroup-addon">
                    <AppRadioButton name="is-correct-answer" value={!answer.isCorrect} checked={answer.isCorrect} tooltip="Is this a right answer?" tooltipOptions={{ position: 'top' }} onChange={(e) => {
                      const value = e.value;
                      const answersClone = [...answers];
                      answersClone[i].isCorrect = value;
                      setAnswers(answersClone);
                    }} />
                  </span>
                </div>
                <AppButton icon="pi pi-times" className="p-button-rounded p-button-danger" aria-label="Remove" style={{ width: '40px', height: '35px' }} onClick={() => {
                  if (answers.length > minimumAnswers) {
                    setAnswers(answers.filter((_, y) => y !== i));
                  }
                }} />
              </div>
            );
          })}
          <div className="flex flex-column align-items-end">
            <AppButton label="Add answer" className="p-button-sm" onClick={() => {
              setAnswers([...answers, { ...defaultAnswer }]);
            }} />
          </div>
        </div>
      </AppDialog>
      <AppToast ref={toast} position="bottom-right" />
    </>
  );
};
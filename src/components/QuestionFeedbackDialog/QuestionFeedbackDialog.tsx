import { AppButton } from 'components/Button';
import { AppDialog } from 'components/Dialog';
import { AppSlider } from 'components/Slider';
import { AppTextarea } from 'components/Textarea';
import { AppToast, AppToastComponent } from 'components/Toast';
import { useCallback, useRef, useState } from 'react';

export interface QuestionFeedbackDialogProps {
  onHide(): void;
  isVisible: boolean;
}

export const QuestionFeedbackDialog = (props: QuestionFeedbackDialogProps) => {
  const toast = useRef<AppToastComponent>(null);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<number | undefined>(undefined);

  const saveQuestionFeedback = useCallback(() => {
    if (toast && toast.current) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Question feedback sent successfully', life: 3000 });
      props.onHide();
    }
  }, [toast, props]);

  const footer = (<div className="align-items-end">
    <AppButton label="Cancel" className="p-button-rounded p-button-danger mr-3" onClick={props.onHide} />
    <AppButton label="Save" className="p-button-rounded p-button-success" onClick={saveQuestionFeedback} />
  </div>);

  return (
    <>
      <AppDialog header="Leave question feedback" onHide={props.onHide} visible={props.isVisible} footer={footer} style={{ width: '50vw' }} resizable={false} draggable={false}>
        <div className="mb-4">
          <label htmlFor="feedback-comment" className="text-xl">Comment</label>
          <AppTextarea id="feedback-comment" autoResize value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%' }} className="mt-3" />
        </div>
        <div>
          <label htmlFor="feedback-difficulty" className="text-xl">Difficulty: {(difficulty || 0) / 10}</label>
          <AppSlider id="feedback-difficulty" value={difficulty} className="mt-4" onChange={(e) => {
            const value = e.value as number;
            setDifficulty(value);
          }} min={10} max={50} />
        </div>
      </AppDialog>
      <AppToast ref={toast} position="bottom-right" />
    </>
  );
};
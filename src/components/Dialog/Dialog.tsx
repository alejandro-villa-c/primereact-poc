import { Dialog, DialogProps } from 'primereact/dialog';

export const AppDialog = (props: DialogProps) => {
  return (
    <Dialog {...props}>
      {props.children}
    </Dialog>
  );
};

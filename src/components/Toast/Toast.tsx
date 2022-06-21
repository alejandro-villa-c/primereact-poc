import { Toast, ToastProps } from 'primereact/toast';
import React from 'react';
import { AppToastComponent } from '.';

export const AppToast = React.forwardRef<AppToastComponent, ToastProps & React.ClassAttributes<Toast>>((props, ref) => {
  return (
    <Toast {...props} ref={ref} />
  );
});
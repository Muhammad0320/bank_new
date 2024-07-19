'use client';

import { ComponentPropsWithRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type ButtonType = ComponentPropsWithRef<'button'> & {
  children: ReactNode;
  pending: string;
};

const Button = ({ children, pending: pendingText, ...props }: ButtonType) => {
  const { pending } = useFormStatus();

  return <button {...props}> {pending ? pendingText : children} </button>;
};

export default Button;

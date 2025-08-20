import React from 'react';
import { Button as NativeBaseButton, IButtonProps } from 'native-base';

interface ButtonProps extends IButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <NativeBaseButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      _text={{
        fontWeight: 'semibold',
      }}
      {...props}
    >
      {children}
    </NativeBaseButton>
  );
};

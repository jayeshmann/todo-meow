import React, { useState } from 'react';

export const useField = (type: string, placeholder: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onReset,
    placeholder,
  };
};

import React from "react";
import styled from "styled-components";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function Input({ type, placeholder, value, onChange }: InputProps) {
  return (
    <InputComp
      type={type}
      min={0}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;

const InputComp = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--primary-light);
  width: 100%;
`;


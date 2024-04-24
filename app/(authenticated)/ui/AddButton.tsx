import React from "react";
import styled from "styled-components";

type AddButtonProps = {
  label: string;
  // Callback function to be called when the button is clicked
  callback: () => void;
};

function AddButton({ label, callback }: AddButtonProps) {
  return <Add onClick={callback}>{label}</Add>;
}

export default AddButton;

const Add = styled.span`
  color: var(--primary-light);
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
`;


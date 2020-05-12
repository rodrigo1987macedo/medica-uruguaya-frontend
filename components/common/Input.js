import React from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border1};
  padding: 8px;
  margin: ${props => props.rightMargin && '0 15px 0 0'}
`

function Input({ placeholder, name, type, value, onChange, rightMargin }) {
  return (
    <InputWrapper
      placeholder={placeholder}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      rightMargin={rightMargin}
    />
  );
}

export default Input;

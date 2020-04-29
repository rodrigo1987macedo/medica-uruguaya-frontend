import React from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border1};
  padding: 8px;
`

function Input({ placeholder, name, type, value, onChange }) {
  return (
    <InputWrapper
      placeholder={placeholder}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
}

export default Input;

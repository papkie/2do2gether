import React, { useRef, useState, MouseEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 48px;
  width: 100%;
  padding: 0 0 0 10px;
  border: 1px solid #ddd;
  border-right: none;
`;

const Button = styled.button`
  height: 50px;
  text-transform: uppercase;
  font-size: 10px;
  color: #aaa;
  background: white;
  border: 1px solid #ddd;
  border-left: none;
  padding: 0 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-content: center;
`;

interface Props {
  link: string;
}

export default function LinkBox(props: Props) {
  const [copySuccess, setCopySuccess] = useState("");
  const textRef = useRef(null);

  function copyToClipboard(e: MouseEvent<HTMLButtonElement>) {
    if (textRef && textRef.current) {
      (textRef.current as any).select();
      document.execCommand("copy");
      setCopySuccess("Copied!");
    }
  }

  return (
    <Wrapper>
      <Input value={props.link} ref={textRef} readOnly onClick={() => location.href = props.link} />
      <Button onClick={copyToClipboard}>{copySuccess || "Copy"}</Button>
    </Wrapper>
  );
}

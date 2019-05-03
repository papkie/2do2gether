import React from "react";
import styled from "styled-components";

const Input = styled.input``;

export default function Item({
  id, 
  done,
  text,
  onChange
}: {
  id: number;
  done: boolean;
  text: string;
  onChange: (id: number, done: boolean, value: string) => void;
}) {
  return (
    <div>
      {done ? "v" : "x"} - <Input defaultValue={text} onChange={(e) => onChange(id, done, e.target.value)} />
    </div>
  );
}

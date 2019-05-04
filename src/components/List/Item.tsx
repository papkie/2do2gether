import React from "react";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  flex: auto;
`;

const Input = styled.input`
  height: 20px;
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  padding-left: 0.5em;
`;

const TodoButton = styled.div`
  width: 22px;
  height: 22px;
  margin-right: 0.5em;
  color: black;
  border: none;
  cursor: pointer;
  text-align: center;
  align-content: center;
  border: 1px solid gray;
  border-radius: 50%;
`;

const DoneButton = styled(TodoButton)`
  color: #cf9;
  background: #cf9;
`;

const DoneButtonDisabled = styled(TodoButton)`
  color: gray;
`;

const DeleteButton = styled.span`
  width: 22px;
  height: 22px;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 10px;
  line-height: 22px;
  padding-left: 5px;
  text-align: center;
`;

const DeleteButtonDisabled = styled(DeleteButton)`
  color: gray;
`;

export default React.forwardRef(function Item(
  {
    id,
    done,
    text,
    onChange,
    onEnter,
    onFocus,
    onDelete,
    onDone
  }: {
    id: number;
    done: boolean;
    text: string;
    onChange?: (id: number, value: string) => void;
    onEnter?: (id: number, value: string) => void;
    onFocus?: () => void;
    onDelete?: (id: number) => void;
    onDone?: (id: number, done: boolean) => void;
  },
  ref: React.Ref<HTMLInputElement | null>
) {
  return (
    <Wrapper>
      {onDone &&
        (done ? (
          <DoneButton onClick={() => onDone(id, !done)} />
        ) : (
          <TodoButton onClick={() => onDone(id, !done)} />
        ))}
      {!onDone && <DoneButtonDisabled>{done ? "v" : ""}</DoneButtonDisabled>}

      <Input
        value={text}
        onChange={e => onChange && onChange(id, e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onEnter && onEnter(id, (e.target as any).value);
          }
        }}
        onFocus={e => onFocus && onFocus()}
        ref={ref}
      />
      {onDelete && (
        <DeleteButton onClick={() => onDelete(id)}>x</DeleteButton>
      )}
      {!onDelete && <DeleteButtonDisabled>x</DeleteButtonDisabled>}
    </Wrapper>
  );
});

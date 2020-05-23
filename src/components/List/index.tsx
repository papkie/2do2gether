import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import firebase from "../../firebase";
import Item from "./Item";

interface Params {
  id: string;
}

interface ListItem {
  text: string;
  done: boolean;
}

export default function List({ match }: RouteComponentProps<Params>) {
  const [todos, setTodos] = useState<ListItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const focusItemRef = useRef<HTMLInputElement>(null);
  const [focusItemIndex, setFocusItemIndex] = useState(-1);
  const firebaseRef = firebase.database().ref("lists").child(match.params.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialized) {
        firebaseRef.on("value", (v) => {
          if (v) {
            setTodos(v.val());
          }
        });
        setInitialized(true);
      }
    };
    fetchData();
    if (focusItemIndex > -1 && focusItemRef && focusItemRef.current) {
      focusItemRef.current.focus();
      setFocusItemIndex(-1);
    }
  });

  async function updateTodos(updatedTodos: ListItem[]) {
    await setTodos(updatedTodos);
    await firebaseRef.set(updatedTodos);
  }

  const updateItemText = (id: number, text: string) => {
    const updatedTodos = _.cloneDeep(todos);
    _.set(updatedTodos, id + ".text", text);
    updateTodos(updatedTodos);
  };

  const updateItemDone = (id: number, done: boolean) => {
    const updatedTodos = _.cloneDeep(todos);
    _.set(updatedTodos, id + ".done", done);
    updateTodos(updatedTodos);
  };

  const addItemAfter = async (id: number) => {
    if (_.get(todos, id).text !== "") {
      const updatedTodos = _.cloneDeep(todos);
      updatedTodos.splice(id + 1, 0, {
        done: false,
        text: "",
      });
      setFocusItemIndex(id + 1);
      await updateTodos(updatedTodos);
    }
  };

  const addItemAtEnd = async () => {
    if (_.get(todos, todos.length - 1).text !== "") {
      const updatedTodos = _.cloneDeep(todos);
      updatedTodos.splice(todos.length, 0, {
        done: false,
        text: "",
      });
      setFocusItemIndex(todos.length);
      await updateTodos(updatedTodos);
    }
  };

  const deleteItem = (id: number) => {
    const updatedTodos = _.cloneDeep(todos);
    _.pullAt(updatedTodos, id);
    updateTodos(updatedTodos);
  };

  return (
    <Grid>
      {todos.map((todo, index) => (
        <Row key={index} center="xs">
          <Col xs={10} md={6}>
            <Item
              id={index}
              done={todo.done}
              text={todo.text}
              onChange={updateItemText}
              onDone={updateItemDone}
              onEnter={addItemAfter}
              onDelete={deleteItem}
              ref={index === focusItemIndex ? focusItemRef : undefined}
            />
          </Col>
        </Row>
      ))}
      <Row key={todos.length} center="xs">
        <Col xs={10} md={6}>
          <Item
            id={todos.length}
            done={false}
            text={""}
            onFocus={() => addItemAtEnd()}
          />
        </Col>
      </Row>
    </Grid>
  );
}

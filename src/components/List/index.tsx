import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import firebase from "../../firebase";
import Item from "./Item";
import _ from "lodash";

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

  const firebaseRef = firebase
    .database()
    .ref("lists")
    .child(match.params.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialized) {
        firebaseRef.on("value", v => {
          if (v) {
            setTodos(v.val());
          }
        });
        setInitialized(true);
      }
    };
    fetchData();
  });

  const updateItem = (id: number, done: boolean, text: string) => {
    const updatedTodos = _.cloneDeep(todos);
    _.set(updatedTodos, id, { done, text });
    setTodos(updatedTodos);
    firebaseRef.set(updatedTodos);
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <Item
          id={index}
          done={todo.done}
          text={todo.text}
          onChange={updateItem}
          key={index}
        />
      ))}
    </div>
  );
}

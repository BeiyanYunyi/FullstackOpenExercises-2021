import React, { useEffect } from "react";
import Anecdotes from "./components/Anecdotes";
import NewAnecdotes from "./components/NewAnecdotes";
import Notification from "./components/Notification";
import { initializeAnecdote } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdote());
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdotes />
    </div>
  );
};

export default App;

import { useSelector, useDispatch } from "react-redux";
import { votedis } from "../reducers/anecdoteReducer";
import { setnotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anec);
  const dispatch = useDispatch();
  const vote = (id, content) => {
    dispatch(votedis(id));
    dispatch(setnotification(content));
    setTimeout(() => {
      dispatch(setnotification(""))
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default Anecdotes;

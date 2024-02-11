import { newanecdis } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdoteService";

const NewAnecdotes = () => {
  const dispatch = useDispatch();
  const newanec = async (event) => {
    event.preventDefault();
    const anec = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(newanecdis(anec));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newanec}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default NewAnecdotes;

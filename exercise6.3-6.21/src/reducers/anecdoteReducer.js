import anecdoteService from "../services/anecdoteService";

export const newanecdis = (cont) => {
  return async (dispatch) => {
    const anec = await anecdoteService.createNew(cont);
    dispatch({ type: "new", data: anec });
  };
};

export const votedis = (id) => {
  return {
    type: "vote",
    data: id,
  };
};

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll();
    dispatch({ type: "init", data: anecs });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "vote": {
      return state.map((vote) => {
        if (vote.id === action.data) {
          return { ...vote, votes: vote.votes + 1 };
        }
        return vote;
      });
    }
    case "new": {
      return state.concat(action.data);
    }
    case "init": {
      return action.data;
    }

    default:
      break;
  }

  return state;
};

export default anecdoteReducer;

import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.anecdoteReducer.filter((a) =>
      a.content.toLowerCase().includes(state.filterReducer)
    )
  ).sort(function (a, b) {
    return b.votes - a.votes;
  });

  console.log(anecdotes);
  const vote = (id) => {
    const text = anecdotes.find((a) => a.id === id);
    const info = `you voted ${text.content}`;

    console.log("vote", text);
    dispatch(voteAnecdote(text));
    dispatch(setNotification(info, 5));
  };
  return (
    <div>
      <ul>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;

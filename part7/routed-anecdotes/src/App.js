import { useState } from 'react'
import {

  Routes,
  Route,
  Link,

  useMatch,
  Navigate,
} from "react-router-dom";
import { useField } from './hooks'

let timer;

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const Notification = ({ message }) => {
  const style = {
    backgroundColor: "red",
    color: 'black'
  }

  if (message === '') {
    return (null)
  }

  return (
    <div style={style}>
      <h2>{message}</h2>
    </div>
  )
}


const Anecdote = (props) => {
  console.log('anecdote', props)

  return (
    <div>
      <h1>{props.anecdote.content}</h1>
      <h2>
        has {props.anecdote.votes} votes
      </h2>
      <h2>author is : {props.anecdote.author}</h2>
      <h2>located at : {props.anecdote.info} </h2>

    </div>

  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>

      {anecdotes.map((a) => (
        <li key={a.id}>
          <Link
            to={`/anecdotes/${a.id}`}
            key={a.di}
          >
            {a.content}
          </Link></li>
      ))}
    </ul>
  </div>
)






const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })


  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>


      </form>
      <button type="button"
        onClick={
          () => {
            content.reset()
            author.reset()
            info.reset()
          }
        }
      >RESET</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`new anecdote added ${anecdote.content} by ${anecdote.author}`)
    clearTimeout(timer)
    timer = setTimeout(function () {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdoteById(parseInt(match.params.id))
    : null


  console.log('match')
  console.log('anecdote match', anecdote)
  /*
    console.log('match params id', match.params.id)
  */

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={notification ? <Navigate replace to="/" /> : <CreateNew addNew={addNew} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

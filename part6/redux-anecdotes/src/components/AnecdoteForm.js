import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const dispatch = useDispatch()

    const createNew = async (event) => {

        console.log('cre', event)
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        const info = `you created ${content}`
        event.target.anecdoteInput.value = ''

        dispatch(createAnecdote(content))
        dispatch(setNotification(info, 5))

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='anecdoteInput' /></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm
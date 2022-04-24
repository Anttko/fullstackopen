import { filterReducer } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const filterAnecdotes = event.target.value.toLowerCase()
        dispatch(filterReducer(filterAnecdotes))
    }
    const style = {
        marginBottom: 10
    }
    /*const ff = useSelector(state => state.filterReducer)
    console.log('', ff)*/

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter
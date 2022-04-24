import { filterReducer } from "../reducers/filterReducer"
import React from 'react'
import { connect } from 'react-redux';



const Filter = ({ filterReducer }) => {

    const handleChange = (event) => {
        const filterAnecdotes = event.target.value.toLowerCase()
        filterReducer(filterAnecdotes)
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

const mapDispatchToProps = {
    filterReducer
}

export default connect(null,mapDispatchToProps)(Filter)
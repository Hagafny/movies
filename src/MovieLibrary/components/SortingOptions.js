import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSortingMethod } from '../store/actions'

class SortingOptions extends Component {
    state = {
        sortingBy: ''
    }

    handleChange = e => {
        const { setSortingMethod } = this.props
        const sortingBy = e.target.value
        this.setState({ sortingBy })
        setSortingMethod(sortingBy)
    }

    render() {
        return (
            <select value={this.state.sortingBy} onChange={this.handleChange}>
                <option value="none"></option>
                <option value="name_asc">A -> Z</option>
                <option value="name_desc">Z -> A</option>
                <option value="rating">Rating</option>
            </select>
        )
    }
}

export default connect(null, { setSortingMethod })(SortingOptions)
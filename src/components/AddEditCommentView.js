
import React, { Component } from 'react';
import * as api from '../utils/api';

class AddEditCommentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    handleKeyPress = (event) => {

    }

    render() {
        return (
            <div className='add-edit-comment'>
                <form onSubmit={console.log()}>
                    <input name='comment' type='text' placeholder='Comment' value={this.state.title ? this.state.title : ''} onChange={this.handleKeyPress} />
                    <div className='clear-both'></div>
                    <button>Submit</button>
                    <div className='clear-both'></div>
                </form>
            </div>
        )
    }

}

export default AddEditCommentView;
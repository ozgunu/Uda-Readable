import React, { Component } from 'react';
import * as api from '../utils/api';

class SingleCommentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment : {}
        }
    }

    componentDidMount() {
        this.setState({comment: this.props.comment});
    }

    // Increase or decrease the voteScore for the comment
    changeVote = (action, id) => {
        if (action === 'upVote' || action === 'downVote') {
            api.voteComment(id, action).then(comment => {
                this.setState({comment});
            });
        }
    }

    render() {

        // Get the comment from the state
        const { comment } = this.state;

        return (
            <div>
                <div className='float-right'>
                    <div className='post-comment-vote' onClick={() => this.changeVote('upVote', comment.id)}><span className='green'>+</span></div>
                    <div className='post-comment-vote' onClick={() => this.changeVote('downVote', comment.id)}><span className='dark-red'>-</span></div>
                </div>
                <div className='post-comment'>
                    <div className='comment-info-bar'>
                        <div><span className='dark-red-strong'>Author: </span>{comment.author}</div>
                        <div><span className='dark-red-strong'>Date: </span>{(new Date(comment.timestamp)).toLocaleString()}</div>
                        <div><span className='dark-red-strong'>Vote Score: </span>{comment.voteScore}</div>
                    </div>
                    <div className='clear-both'></div>
                    <div className='comment-body'>{comment.body}</div>
                    <div className='comment-footer'>                        
                        <div><a href='#'>Edit</a></div>
                        <div><a href='#'>Delete</a></div>                        
                    </div>
                </div>
                <div className='clear-both'></div>
            </div>
        )
    }

}

export default SingleCommentView;
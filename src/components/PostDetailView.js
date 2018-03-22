import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';
import SingleCommentView from './SingleCommentView';

class PostDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: []
        }
    }

    componentDidMount() {
        let postId = (this.props.params) ? this.props.params.postId : '';
        if (postId) {
            api.fetchPost(postId).then(fetchedPost => {

                // If post has comments, fetch them as well
                if (fetchedPost.commentCount && fetchedPost.commentCount > 0) {
                    api.fetchPostComments(postId).then(fetchedComments => {
                        this.setState( {post: fetchedPost, comments: fetchedComments} );
                    })

                // Post has no comments
                } else {
                    this.setState( {post: fetchedPost} );
                }       

            });
        }
    }

    render() {

        const { post, comments } = this.state;
        const dateTime = (new Date(post.timestamp)).toDateString();
       
        return (
            <div className='main-content'>
                <h4>Post Details</h4>
                <div>                    
                    <div className='float-right'>                        
                        <Link to='/'>Main Page</Link>
                        <Link to={`/addEditPost/${post.id}`} style={{marginLeft: '10px'}}>Edit Post</Link>
                    </div>
                    <div className='clear-both'></div>
                </div>
                <div className='clear-both'></div>
                <div className='post-summary'>
                    <div className='post-title'>{post.title}</div>
                    <div className='post-info-bar'>
                        <div><span className='dark-red-strong'>Author: </span>{post.author}</div>
                        <div><span className='dark-red-strong'>Comments: </span>{post.commentCount}</div>
                        <div><span className='dark-red-strong'>Category: </span>{post.category}</div>
                    </div>
                    <div className='post-info-bar'>
                        <div><span className='dark-red-strong'>Date and Time: </span>{dateTime}</div>
                        <div><span className='dark-red-strong'>Vote Score: </span>{post.voteScore}</div>
                    </div>
                    <div className='post-body'>{post.body}</div>
                </div>

                <ul>
                    {comments.map(comment => (
                        <li key={'commentId-' + comment.id}>
                            <SingleCommentView comment={comment} />
                        </li>
                    ))}
                </ul>
            
            </div>
        )

    }



}

export default PostDetailView;
import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize'; 

class AddEditPostView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        let postId = (this.props.params) ? this.props.params.postId : null;
        if (postId) {
            api.fetchPost(postId).then(fetchedPost => {
                this.setState({post: fetchedPost});
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //const values = serializeForm(event.target, {hash: true});
        
        // Update an existing post
        if (this.state.post.id) {

        // Create a new post
        } else {

        }
    }

    handleKeyPress = (event) => {
        event.preventDefault();
        const propertyName = event.target.name;
        const value = event.target.value ? event.target.value.trim() : '';
        this.setState((prevState) => ({
            ...prevState,
            post: {
                ...prevState.post,
                [propertyName]: value
            }
        }));
    }

    render() {
        
        const { post } = this.state;

        return (
            <div>
                {post.id ? (
                    <h2>Edit Post</h2> ) : (
                    <h2>Add New Post</h2> )
                }
                <div className='add-edit-post'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Title: </label><input name='title' type='text' placeholder='Title' value={post.title} onChange={this.handleKeyPress} />
                        <div className='clear-both'></div>
                        <label>Body: </label><input name='body' type='textArea' placeholder='Body' value={post.body} onChange={this.handleKeyPress} />
                        <div className='clear-both'></div>
                        <label>Author: </label><input name='author' type='text' placeholder='Author' value={post.author} onChange={this.handleKeyPress} />
                        <div className='clear-both'></div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default AddEditPostView;
import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';

class DefaultView extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            posts: []
        }
    }

    // Fetch data from server
    componentDidMount() {
        api.fetchCategories().then(categories => {
            this.setState({categories});
        });
        api.fetchPosts().then(posts => {
            this.setState({posts});
        });
    }

    // Handle sort change
    handleSortChange = (event) => {        
        if (event.target.value === 'timeStamp') {
            // Sort posts by timestamp
            this.setState((prevState) => ({
                posts: prevState.posts.sort((postA, postB) => postB.timestamp - postA.timestamp)
            }));
        } else {
            // Sort posts by voteScore
            this.setState((prevState) => ({
                posts: prevState.posts.sort((postA, postB) => postB.voteScore - postA.voteScore)
            }));
        }
    }

    // Render
    render() {

        let filteredPosts = [];
        let categoryFromParams = (this.props.params) ? this.props.params.category : '';

        if (categoryFromParams) {
            filteredPosts = this.state.posts.filter(post => post.category === categoryFromParams);
        } else {
            filteredPosts = this.state.posts;
        }

        return ( 
            <div>
                <div className='main-content'>
                    {(categoryFromParams) && (
                        <h4>Posts for Category: {categoryFromParams} </h4>
                    )}
                     {(!categoryFromParams) && (
                        <h4>All Posts</h4>
                    )}
                    <div>
                        <div className='float-left'>Sort by
                            <select className='select' onChange={this.handleSortChange}>
                                <option value='timeStamp'>Time</option>
                                <option value='voteScore'>Vote Score</option>
                            </select>
                        </div>
                        <div className='float-right'>
                            <Link to='/addEditPost'>Add New Post</Link>
                        </div>
                        <div className='clear-both'></div>
                    </div>
                    <ul>
                        {filteredPosts.map(post => (
                            <li key={'postId-' + post.id}>
                                <div className='post-summary'>
                                    <Link to={`/post/${post.id}`}><div className='post-title'>{post.title}</div></Link>
                                    <div className='post-summary-info'>
                                        <p><strong><span className='dark-red'>Category: </span></strong>{post.category}</p>
                                        <p><strong><span className='dark-red'>Time: </span></strong>{(new Date(post.timestamp)).toDateString()}</p>
                                        <p><strong className='dark-red'>Vote Score: </strong>{post.voteScore}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='sidebar-right'>
                    <h4>Categories</h4>
                    <ul>
                        <li><Link to={'/'}>Show All</Link></li>
                        {this.state.categories.map(category => (
                            <li key={category.name}>
                                <Link to={`/category/${category.name}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        );
    }

}

export default DefaultView;
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
            // See what is selected by default, then sort and setState
            let select = document.getElementById('sortSelect');
            let selectedOption = select.options[select.selectedIndex].value;
            this.setState({posts: this.sortPosts(posts, selectedOption)});
        });
    }

    // Sort posts by timeStamp or voteScore
    sortPosts (posts, operation) {
        if (operation === 'timeStamp') {
            return posts.sort((postA, postB) => postB.timestamp - postA.timestamp);
        } else if (operation === 'voteScore') {
            return posts.sort((postA, postB) => postB.voteScore - postA.voteScore);
        }
    }

    // Handle sort change
    handleSortChange = (event) => {
        let operation = event.target.value;
        this.setState((prevState) => ({
            posts: this.sortPosts(prevState.posts, operation)
        }));
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
                        <h2>Posts for Category: {categoryFromParams} </h2>
                    )}
                     {(!categoryFromParams) && (
                        <h2>All Posts</h2>
                    )}
                    <div>
                        <div className='float-left'>Sort by
                            <select className='select' defaultValue='timeStamp' id='sortSelect' onChange={this.handleSortChange}>
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
                                        <p><strong><span className='dark-red'>Time: </span></strong>{(new Date(post.timestamp)).toLocaleString()}</p>
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
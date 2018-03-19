const api = 'http://localhost:3001';

const headers = {
  'Authorization': 'whatever-you-want'
}

// Fetch categories
export const fetchCategories = () =>
    fetch(`${api}/categories`, { method: 'GET', headers })
      .then(res => res.json())
      .then((data) => data.categories);
         
// Fetch posts
export const fetchPosts = () =>
    fetch(`${api}/posts`, { method: 'GET', headers })
      .then(res => res.json())
      .then((data) => data.posts);

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact);
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async () => {
        try {
            
            const res = await axios.get(`http://localhost:5000/api/posts?page=${page}`, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            setPosts((prevPosts) => [...prevPosts, ...res.data]);
            if (res.data.length === 0) setHasMore(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    const fetchPixabayImages = async () => {
        const apiKey = '44163396-0e7a9bb31a0c88141a2a0b5fa';
        const searchTerm = 'nature';
        const perPage = 10; 

        try {
            const res = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&per_page=${perPage}`);
            
            console.log(res.data); 
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchPixabayImages(); // Call the Pixabay API when component mounts
    }, [page]); // Update the dependency array as needed

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center my-4">Posts</h1>
            <div className="container mx-auto p-4">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p>{post.description}</p>
                    </div>
                ))}
                {!hasMore && <p className="text-center text-gray-500">No more posts</p>}
            </div>
        </div>
    );
};

export default PostList;

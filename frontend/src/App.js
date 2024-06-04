import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import PostList from './pages/PostList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/posts" element={<PostList />} />
            </Routes>
        </Router>
    );
}

export default App;

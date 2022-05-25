import React from 'react';

import { Routes, Route } from "react-router-dom";

import MainContent from './MainContent';
import DetailedNews from '../../Pages/DetailedNews/DetailedNews';
import CreateNews from '../../Pages/NewNews/CreateNews';

const Body = (props) => {
    return (
      <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/news/:id" element={<DetailedNews />} />
        <Route exact path="/admin/news/new" element={<CreateNews />} />
        <Route path="/*" element={<p>404 page not found</p>} />
      </Routes> 
    );
};

export default Body;
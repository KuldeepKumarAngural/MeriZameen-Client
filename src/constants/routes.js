import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../pages/authantication/Auth';
import { Home } from '../pages/home/Home';
import { Item } from '../pages/items/Item';
import { PostProperty } from '../pages/postAd/PostProperty';
import { PageNotFound } from '../pages/notFoundPage/PageNotFound';
import { useSelector } from 'react-redux';
import { selectUserData } from '../pages/authantication/authSlice';

export const APRoutes = () => {
  const ROUTES = [
    { name: '/', value: (index) => (isLoggedIn ? <Home key={index} updatePageTitle={updatePageTitle} /> : <Auth key={index} updatePageTitle={updatePageTitle} />) },
    { name: '/auth', value: (index) => (!isLoggedIn ? <Auth key={index} updatePageTitle={updatePageTitle} /> : <Home key={index} updatePageTitle={updatePageTitle} />) },
    { name: '/home', value: (index) => <Home key={index} updatePageTitle={updatePageTitle} /> },
    { name: '/home/:listId', value: (index) => <Item key={index} updatePageTitle={updatePageTitle} /> },
    { name: '/postAd', value: (index) => (isLoggedIn ? <PostProperty key={index} updatePageTitle={updatePageTitle} /> : <PageNotFound updatePageTitle={updatePageTitle} />) },
  ];
  const isLoggedIn = useSelector(selectUserData);
  const [pageTitle, updatePageTitle] = useState('');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Routes>
      {ROUTES.map((route, index) => (
        <Route path={route.name} element={route.value(index)} key={route.name} />
      ))}
      <Route path="*" element={<PageNotFound updatePageTitle={updatePageTitle} />} /> {/* Catch-all route */}
    </Routes>
  );
};

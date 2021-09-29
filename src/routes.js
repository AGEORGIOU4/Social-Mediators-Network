import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const About = React.lazy(() => import('./views/about/About'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Admins = React.lazy(() => import('./views/admins/Admins'))
const Login = React.lazy(() => import('./views/login/Login'))
const Logout = React.lazy(() => import('./views/logout/Logout'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Settings = React.lazy(() => import('./views/settings/Settings'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/admins', name: 'Admins', component: Admins },
  { path: '/login', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/settings', name: 'Settings', component: Settings },
]

export default routes

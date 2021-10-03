import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const About = React.lazy(() => import('./views/about/About'))
const SocialMediators = React.lazy(() => import('./views/social-mediators/Social-Mediators'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Blog = React.lazy(() => import('./views/blog/Blog'))
const Admins = React.lazy(() => import('./views/admins/Admins'))
const Login = React.lazy(() => import('./views/login/Login'))
const Logout = React.lazy(() => import('./views/logout/Logout'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const ProfileForm = React.lazy(() => import('./views/profile/Profile-Form'))
const Settings = React.lazy(() => import('./views/settings/Settings'))


const Draggable = React.lazy(() => import('./views/draggable/Draggable'))


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/social-mediators', name: 'Social Mediators', component: SocialMediators },
  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/admins', name: 'Admins', component: Admins },
  { path: '/login', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/profile-form', name: 'Profile Form', component: ProfileForm },
  { path: '/settings', name: 'Settings', component: Settings },

  { path: '/draggable', name: 'Draggable', component: Draggable },
]

export default routes

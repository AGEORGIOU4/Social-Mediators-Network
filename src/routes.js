import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

export default routes

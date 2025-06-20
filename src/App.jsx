import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import BoardsPage from './pages/Board/BoardsPage'
import TasksPage from './pages/Tasks/TasksPage'
import BoardDetailPage from './pages/Board/BoardDetailPage'
import TaskCreationPage from './pages/Board/TaskCreationPage'
import { Toaster } from 'react-hot-toast';
import TaskEditionPage from './pages/Board/TaskEditionPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/boards' element={<BoardsPage />} />
      <Route path='/boards/:id' element={<BoardDetailPage />} />
      <Route path='/boards/:id/task' element={<TaskCreationPage />} />
      <Route path='/boards/:id/task/:taskId' element={<TaskEditionPage />} />
      <Route path='/tasks' element={<TasksPage />} />
      
    </Routes>
    <Toaster />
    </>
  )
}

export default App

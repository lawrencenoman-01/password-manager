/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './styles/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Detail from './pages/Detail'
import Form from './pages/Form'
import Category from './pages/Category'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/detailUser/:id' element={<Detail />} />
        <Route path='/addForm' element={<Form />} />
        <Route path="/work" element={<Category category="work" />} />
        <Route path="/family" element={<Category category="family" />} />
        <Route path="/personal" element={<Category category="personal" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

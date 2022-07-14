import { Routes, Route } from 'react-router-dom'
import SingleUserPage from './scrooling/SingleUser'
import UsersListPage from './scrooling/UsersList'

function App() {

  return (
    <div className="root-container">
      <Routes>
        <Route path='/' element={<UsersListPage/>}/>
        <Route path='/user/:id' element={<SingleUserPage/>} />
      </Routes>
    </div>
  )
}

export default App

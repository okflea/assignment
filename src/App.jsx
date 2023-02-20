import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homescreen from './screens/HomeScreen/Homescreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import UsersProvider from './utils/Store'
function App() {

  return (
    <BrowserRouter>
      <UsersProvider>
        <Routes>
          <Route path='/' element={<Homescreen/>}/>
          <Route path='/profile/:userSlug' element={<ProfileScreen/>}/>
        </Routes>
      </UsersProvider>
    </BrowserRouter>
  )
}

export default App

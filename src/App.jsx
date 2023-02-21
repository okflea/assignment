import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homescreen from './screens/HomeScreen/Homescreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import UsersProvider from './utils/Store'
function App() {
//different routes are setup .
  //profile pages will have a url like '/profile/rohit-bis'
  // which might help us in the future if we need to hit another api endpoint with 
  // other info like post ,gallery and todo data
  // these 'name slugs' can be easily extracted by useParams hook or useLocation hook or window.location
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

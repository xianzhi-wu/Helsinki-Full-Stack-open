import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'

import anecdoteService from './services/anecdotes'

import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  anecdoteService.getAll().then(anecdotes =>
    dispatch(setAnecdotes(anecdotes))
  )
  
  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
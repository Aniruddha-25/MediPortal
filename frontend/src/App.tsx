import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import { fetchMe, getToken, logout, type User } from './api/auth'
import { useToast } from './components/toast-context'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  // Only block on a session check when there is actually a token to check.
  const [loading, setLoading] = useState(() => getToken() !== null)
  const toast = useToast()

  // On load, restore the session if a token is already stored.
  useEffect(() => {
    if (!getToken()) return
    fetchMe()
      .then(setUser)
      .catch((err: Error) => {
        setUser(null)
        toast.error(err.message)
      })
      .finally(() => setLoading(false))
  }, [toast])

  async function handleLogout() {
    await logout()
    setUser(null)
    toast.info('You have been signed out.')
  }

  if (loading) {
    return <div className="app-loading">Loading…</div>
  }

  if (!user) {
    return <LoginPage onLoggedIn={setUser} />
  }

  return (
    <div className="app-shell">
      <h1>Welcome, {user.first_name || user.username} 👋</h1>
      <p>You are signed in to MediPortal.</p>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  )
}

export default App

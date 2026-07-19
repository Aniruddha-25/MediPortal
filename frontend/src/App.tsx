import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import { fetchMe, getToken, logout, type User } from './api/auth'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // On load, restore the session if a token is already stored.
  useEffect(() => {
    if (!getToken()) {
      setLoading(false)
      return
    }
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function handleLogout() {
    await logout()
    setUser(null)
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

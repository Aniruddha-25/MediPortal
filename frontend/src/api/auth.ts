// Talks to the Django/DRF auth API. Override the base URL with VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

const TOKEN_KEY = 'mediportal.token'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Turn a DRF error body into a single readable message.
 * DRF returns shapes like { non_field_errors: [...] } or { username: [...] }.
 */
function extractError(body: unknown, fallback: string): string {
  if (body && typeof body === 'object') {
    const values = Object.values(body as Record<string, unknown>)
    for (const value of values) {
      if (Array.isArray(value) && value.length) return String(value[0])
      if (typeof value === 'string') return value
    }
  }
  return fallback
}

export async function login(username: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(extractError(body, 'Login failed. Please try again.'))
  }

  setToken(body.token)
  return body.user as User
}

export async function fetchMe(): Promise<User> {
  const token = getToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(`${API_URL}/api/auth/me/`, {
    headers: { Authorization: `Token ${token}` },
  })
  if (!res.ok) {
    clearToken()
    throw new Error('Session expired. Please log in again.')
  }
  return (await res.json()) as User
}

export async function logout(): Promise<void> {
  const token = getToken()
  if (token) {
    await fetch(`${API_URL}/api/auth/logout/`, {
      method: 'POST',
      headers: { Authorization: `Token ${token}` },
    }).catch(() => {
      /* ignore network errors on logout */
    })
  }
  clearToken()
}

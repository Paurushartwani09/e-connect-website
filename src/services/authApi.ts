// ── Auth / Token Manager ────────────────────────────────
//
// The backend issues a JWT with a 15-minute TTL.
// This module:
//   1. Fetches a fresh token from the login endpoint.
//   2. Caches it in memory (never in localStorage — avoids XSS exposure).
//   3. Proactively refreshes it 2 minutes before expiry so API calls
//      never hit a 401 mid-session.
//
// Usage in other services:
//   import { getToken } from './authApi'
//   const token = await getToken()
// ────────────────────────────────────────────────────────

const AUTH_URL = 'https://selcttest.e-connectsolutions.com/Gateway/api/Auth/Login'

// ── Credentials for the "Recruitment External User" service account ──
// Move these to a .env file:  VITE_AUTH_USERNAME / VITE_AUTH_PASSWORD
const AUTH_USERNAME = import.meta.env.VITE_AUTH_USERNAME as string
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD as string

// Refresh 2 minutes before actual expiry to give in-flight requests time
const REFRESH_BUFFER_MS = 2 * 60 * 1000

// ── In-memory token cache ─────────────────────────────────
interface TokenCache {
  token:     string
  expiresAt: number   // ms since epoch
}

let cache: TokenCache | null = null
let refreshTimer: ReturnType<typeof setTimeout> | null = null

// ── Parse expiry from JWT payload ────────────────────────
function parseExpiry(jwt: string): number {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]))
    // `exp` is seconds since epoch (standard JWT claim)
    if (typeof payload.exp === 'number') return payload.exp * 1000
  } catch {
    // fall through to fallback
  }
  // Fallback: treat token as valid for 15 minutes from now
  return Date.now() + 15 * 60 * 1000
}

// ── Fetch a fresh token from the backend ─────────────────
async function fetchFreshToken(): Promise<string> {
  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: AUTH_USERNAME,
      password: AUTH_PASSWORD,
    }),
  })

  if (!res.ok) {
    throw new Error(`Auth failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  // Accept any of these common field names the backend might return
  const token: string =
    json.token      ??
    json.Token      ??
    json.accessToken ??
    json.AccessToken ??
    json.jwt         ??
    json.JWT         ??
    json.data?.token ??
    json.data?.Token ??
    ''

  if (!token) {
    throw new Error('Auth response did not contain a token. Check field name mapping in authApi.ts.')
  }

  return token
}

// ── Schedule proactive refresh ────────────────────────────
function scheduleRefresh(expiresAt: number): void {
  if (refreshTimer) clearTimeout(refreshTimer)

  const delay = expiresAt - Date.now() - REFRESH_BUFFER_MS
  if (delay <= 0) return   // already near expiry — next getToken() call will refresh

  refreshTimer = setTimeout(async () => {
    try {
      await refreshToken()
    } catch {
      // Silent — next getToken() call will retry
      cache = null
    }
  }, delay)
}

// ── Refresh token and update cache ───────────────────────
async function refreshToken(): Promise<string> {
  const token     = await fetchFreshToken()
  const expiresAt = parseExpiry(token)
  cache = { token, expiresAt }
  scheduleRefresh(expiresAt)
  return token
}

// ── In-flight deduplication — prevents multiple parallel login calls ──
let inflightRequest: Promise<string> | null = null

/**
 * Returns a valid JWT token, fetching or refreshing as needed.
 * Multiple concurrent callers share the same in-flight request.
 */
export async function getToken(): Promise<string> {
  // Return cached token if still valid
  if (cache && Date.now() < cache.expiresAt - REFRESH_BUFFER_MS) {
    return cache.token
  }

  // Deduplicate concurrent requests
  if (inflightRequest) return inflightRequest

  inflightRequest = refreshToken().finally(() => {
    inflightRequest = null
  })

  return inflightRequest
}

/**
 * Clears the cached token. Call on logout or 401 error.
 */
export function clearToken(): void {
  cache = null
  if (refreshTimer) {
    clearTimeout(refreshTimer)
    refreshTimer = null
  }
}

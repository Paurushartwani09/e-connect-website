// ── E-Connect Job Board API ─────────────────────────────
const API_URL   = 'https://recr.e-connectsolutions.com/Gateway/api/Gateway'
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNUm9sZXMiOiIxIiwiV1JvbGVzIjoiMCIsIkRlcGFydG1lbnRJZCI6IjAiLCJOYW1lIjoiUmVjcnVpdG1lbnQgRXh0ZXJuYWwgVXNlciIsIlVzZXJObyI6IjEzNjM5IiwiU2Vzc2lvbklkIjoiOGIwMmI3MzQtNmMwMS00NzZhLWFlNDYtMzYwYTVmNjdjOGRiIiwiZXhwIjoxNzgzMTQ1Nzg1LCJpc3MiOiJodHRwOi8vMTkzLjE2LjEwMC4xODE6OTYiLCJhdWQiOlsiaHR0cHM6Ly9yZWNyLmUtY29ubmVjdHNvbHV0aW9ucy5jb20iXX0.KGzqH1vQomAEwrd_ssecE-WpFi_NJMGcsUgDuWIJQxo'

// ── List response shape ──────────────────────────────────
export interface ApiJob {
  postId:         number
  postName:       string
  location:       string    // e.g. " Jaipur$$ "
  locationId:     number | null
  workExperience: number    // years as integer
  publishOn:      string    // "04-Jun-2026"
  republishOn:    string
  isRepublished:  string    // "Y" | "N"
}

// ── Detail response shape ────────────────────────────────
export interface ApiJobDetail {
  id:                number
  postId:            number
  postName:          string
  statusId:          number
  candidatedetails:  string   // HTML
  location:          string
  locationId:        number | null
  qualifications:    string   // "B.Tech$$MCA"
  skills:            string   // "Design-Minded$$Self-Starter"
  responsibilities:  string   // HTML
  technicalExpertise:string   // "Restful APIs$$..."
  qnc:               null
  message:           string
  workExperience:    number
  sourceId:          null
}

// ── Fetch all jobs (list) ────────────────────────────────
export async function fetchJobs(filters?: {
  workExperience?: string[]
  postId?:         string
  location?:       string
}): Promise<ApiJob[]> {
  const body = {
    apiKey: 'job.board.getAll',
    data: {
      filters:  { workExperience: filters?.workExperience ?? [] },
      filters1: { postId: filters?.postId ?? '', location: filters?.location ?? '' },
    },
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${JWT_TOKEN}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
  const json = await res.json()
  const raw = json.data ?? json.Data ?? json.result ?? json.Result ?? []
  return Array.isArray(raw) ? raw : []
}

// ── Fetch single job detail by postId ────────────────────
export async function fetchJobDetail(postId: number): Promise<ApiJobDetail | null> {
  const body = { apiKey: `job.board.getViewById.${postId}` }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${JWT_TOKEN}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Detail API error: ${res.status}`)
  const json = await res.json()
  // Response: { data: [ {...} ], data1: false, v: null }
  const arr: ApiJobDetail[] = json.data ?? json.Data ?? []
  return arr.length > 0 ? arr[0] : null
}

// ── Helpers ──────────────────────────────────────────────

/** " Jaipur$$ Bhopal$$ " → "Jaipur, Bhopal" */
export function cleanLocation(raw: string): string {
  return raw.split('$$').map(s => s.trim()).filter(Boolean).join(', ') || 'Udaipur, Rajasthan'
}

/** 3 → "3+ Years",  0 → "Fresher" */
export function formatExp(years: number): string {
  if (!years || years === 0) return 'Fresher'
  return `${years}+ Years`
}

/** "B.Tech$$MCA" → ["B.Tech", "MCA"] */
export function splitTags(raw: string): string[] {
  return raw.split('$$').map(s => s.trim()).filter(Boolean)
}

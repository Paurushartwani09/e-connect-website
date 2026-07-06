// ── E-Connect Job Board API ─────────────────────────────
const API_URL   = 'https://selcttest.e-connectsolutions.com/Gateway/api/Gateway'
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNUm9sZXMiOiIxIiwiV1JvbGVzIjoiMCIsIkRlcGFydG1lbnRJZCI6IjAiLCJOYW1lIjoiUmVjcnVpdG1lbnQgRXh0ZXJuYWwgVXNlciIsIlVzZXJObyI6IjEzNTMwIiwiU2Vzc2lvbklkIjoiODRmZjZlODktMTRmYi00ZTk3LWJhMDEtNThmMmQ5YjMyMTU0IiwiZXhwIjoxNzgzNDE2OTUyLCJpc3MiOiJodHRwOi8vMTkzLjE2LjEwMC4xNzo5NiIsImF1ZCI6WyJodHRwOi8vMTkzLjE2LjEwMC4xNzo5MSIsImh0dHBzOi8vc2VsY3R0ZXN0LmUtY29ubmVjdHNvbHV0aW9ucy5jb20iXX0.xNvUg9HIdxOusCHPVEaIdKDJI_HMEcdyprYy7Ue9cAU'

const HEADERS = {
  'Content-Type':  'application/json',
  'Authorization': `Bearer ${JWT_TOKEN}`,
}

// ── List response shape ──────────────────────────────────
export interface ApiJob {
  postId:         number
  postName:       string
  location:       string
  locationId:     number | null
  workExperience: number
  publishOn:      string
  republishOn:    string
  isRepublished:  string
}

// ── Detail response shape ────────────────────────────────
export interface ApiJobDetail {
  id:                number
  postId:            number
  postName:          string
  statusId:          number
  candidatedetails:  string | null
  location:          string
  locationId:        number | null
  qualifications:    string | null
  skills:            string | null
  responsibilities:  string | null
  technicalExpertise:string | null
  qnc:               null
  message:           string
  workExperience:    number
  sourceId:          null
}

// ── Config option — handles any field name the API returns ─
export interface ConfigOption {
  // The API may return different key names per endpoint
  // We accept all variants and pick the right one in getOptionLabel
  [key: string]: unknown
  id?:                   number | string
  qualificationId?:      number
  locationId?:           number
  skillId?:              number
  qualificationName?:    string
  locationName?:         string
  skillName?:            string
  name?:                 string
  label?:                string
  text?:                 string
  value?:                string
  displayName?:          string
  title?:                string
}

/** Strip trailing/leading $$ separators that the API sometimes returns in labels */
function cleanLabel(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const cleaned = raw.split('$$').map(s => s.trim()).filter(Boolean).join(', ')
  return cleaned || undefined
}


export function getOptionLabel(o: ConfigOption): string {
  return (
    cleanLabel(o.qualificationName as string | undefined) ??
    cleanLabel(o.locationName      as string | undefined) ??
    cleanLabel(o.skillName         as string | undefined) ??
    cleanLabel(o.displayName       as string | undefined) ??
    cleanLabel(o.name              as string | undefined) ??
    cleanLabel(o.label             as string | undefined) ??
    cleanLabel(o.text              as string | undefined) ??
    cleanLabel(o.title             as string | undefined) ??
 
    
    cleanLabel(Object.entries(o).find(
      ([k, v]) => typeof v === 'string' && !['id','Id','ID'].some(s => k.endsWith(s)) && (v as string).trim() !== ''
    )?.[1] as string | undefined) ??
    String(o.id ?? o.qualificationId ?? o.locationId ?? o.skillId ?? '')
  )
}


export function getOptionId(o: ConfigOption): string {
  return String(
    o.id ?? o.qualificationId ?? o.locationId ?? o.skillId ?? ''
  )
}

// ── Generic API call ──────────────────────────────────────
async function post(body: object): Promise<unknown[]> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
  const json = await res.json()
  const raw = json.data ?? json.Data ?? json.result ?? json.Result ?? []
  return Array.isArray(raw) ? raw : []
}

// ── Fetch all jobs ────────────────────────────────────────
export async function fetchJobs(filters?: {
  workExperience?: string[]
  postId?:         string
  location?:       string
}): Promise<ApiJob[]> {
  const raw = await post({
    apiKey: 'job.board.getAll',
    data: {
      filters:  { workExperience: filters?.workExperience ?? [] },
      filters1: { postId: filters?.postId ?? '', location: filters?.location ?? '' },
    },
  })
  return raw as ApiJob[]
}

// ── Fetch single job detail ───────────────────────────────.0
export async function fetchJobDetail(postId: number): Promise<ApiJobDetail | null> {
  const raw = await post({ apiKey: `job.board.getViewById.${postId}` })
  const arr = raw as ApiJobDetail[]
  return arr.length > 0 ? arr[0] : null
}

// ── Config dropdowns ──────────────────────────────────────
export async function fetchQualifications(): Promise<ConfigOption[]> {
  return (await post({ apiKey: 'config.qualification.getAll.A' })) as ConfigOption[]
}

export async function fetchLocations(): Promise<ConfigOption[]> {
  return (await post({ apiKey: 'config.officeLocation.getByTypeId.0' })) as ConfigOption[]
}

export async function fetchSkills(): Promise<ConfigOption[]> {
  return (await post({ apiKey: 'config.skillSet.getByTypeId.1' })) as ConfigOption[]
}

// ── String helpers ────────────────────────────────────────

/** " Jaipur$$ Bhopal$$ " → "Jaipur, Bhopal". Handles null/undefined. */
export function cleanLocation(raw: string | null | undefined): string {
  if (!raw) return 'Udaipur, Rajasthan'
  return raw.split('$$').map(s => s.trim()).filter(Boolean).join(', ') || 'Udaipur, Rajasthan'
}

/** 3 → "3+ Years",  0 → "Fresher" */
export function formatExp(years: number): string {
  if (!years || years === 0) return 'Fresher'
  return `${years}+ Years`
}

/** "B.Tech$$MCA" → ["B.Tech", "MCA"]. Safely handles null/undefined. */
export function splitTags(raw: string | null | undefined): string[] {
  if (!raw) return []
  return raw.split('$$').map(s => s.trim()).filter(Boolean)
}

/** Strips all $$ occurrences from HTML strings returned by the API. */
export function cleanHtml(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw.replace(/\$\$/g, '').replace(/\s{2,}/g, ' ').trim()
}

// ── Candidate submission interfaces ──────────────────────

export interface CandidateMasterPayload {
  EmailId:       string
  PhoneNo:       string
  candidateName: string
  postId:        number
}

export interface CandidateApplicationPayload {
  AppSourceId:            string
  CurrentCtc:             number
  EmailId:                string
  IsWhether:              string            // "Fresher" | "Experienced"
  OverallExp:             number
  PhoneNo:                string
  availabilityForWork:    null
  base64Data:             string            // "data:application/pdf;base64,..."
  candidateLocations:     string[]          // ["Jaipur"]
  candidateName:          string
  candidateQualifications: number[]         // [27] — qualification IDs
  candidateSkills:        number[]          // [15] — skill IDs
  currentCompany:         string
  currentJobProfile:      string
  currentLocation:        string
  documentName:           string
  isSaved:                string            // "N"
  postId:                 number
}

/** Step 1 — Create/find candidate master record */
export async function createCandidateMaster(
  payload: CandidateMasterPayload
): Promise<unknown> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ apiKey: 'candidate.master.create', data: payload }),
  })
  if (!res.ok) {
    let detail = ''
    try { detail = JSON.stringify(await res.json()) } catch { /* ignore */ }
    throw new Error(`candidate.master.create failed: ${res.status}${detail ? ' — ' + detail : ''}`)
  }
  const json = await res.json()
  // Some APIs return a non-2xx wrapped in a 200 with an error message
  if (json?.status === false || json?.success === false) {
    throw new Error(json?.message ?? json?.Message ?? 'candidate.master.create returned an error')
  }
  return json
}

/** Step 2 — Submit the full job application */
export async function createCandidateApplication(
  payload: CandidateApplicationPayload
): Promise<unknown> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ apiKey: 'candidate.application.create', data: payload }),
  })
  if (!res.ok) {
    let detail = ''
    try { detail = JSON.stringify(await res.json()) } catch { /* ignore */ }
    throw new Error(`candidate.application.create failed: ${res.status}${detail ? ' — ' + detail : ''}`)
  }
  const json = await res.json()
  if (json?.status === false || json?.success === false) {
    throw new Error(json?.message ?? json?.Message ?? 'candidate.application.create returned an error')
  }
  return json
}

/** Convert a File to base64 string: "data:application/pdf;base64,..." */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

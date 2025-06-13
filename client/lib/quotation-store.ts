export interface QuotationItem {
  id: number
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

export interface Quotation {
  id: string
  client: string
  project: string
  value: number
  status: string
  date: string
  items: QuotationItem[]
}

// Default to local backend if env var not provided
const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function loadQuotations(): Promise<Quotation[]> {
  try {
    const res = await fetch(`${base}/api/quotations`, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()) as Quotation[]
  } catch (err) {
    console.error('Failed to load quotations', err)
    return []
  }
}

export async function saveQuotation(q: Quotation): Promise<Quotation> {
  try {
    const res = await fetch(`${base}/api/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q),
    })
    if (!res.ok) {
      const msg = await res.text()
      throw new Error(`Save failed: ${msg}`)
    }
    return res.json() as Promise<Quotation>
  } catch (err) {
    console.error('Failed to save quotation', err)
    throw err
  }
}

export async function getQuotation(id: string): Promise<Quotation | undefined> {
  try {
    const res = await fetch(`${base}/api/quotations/${id}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return (await res.json()) as Quotation
  } catch (err) {
    console.error('Failed to load quotation', err)
    return undefined
  }
}

export async function deleteQuotation(id: string) {
  try {
    await fetch(`${base}/api/quotations/${id}`, { method: 'DELETE' })
  } catch (err) {
    console.error('Failed to delete quotation', err)
  }
}


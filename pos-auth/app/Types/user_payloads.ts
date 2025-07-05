export type StoreUserPayload = {
  full_name?: string
  email: string
  password: string
  role_code: string
  restaurant_id?: number | null
  status?: string // 'active' | 'blocked' si prefieres un literal
}

export type UpdateUserPayload = Partial<StoreUserPayload>

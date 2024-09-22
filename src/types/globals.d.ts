export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user"
      email?: string
    }
  }
}

import type { Access } from 'payload'

type StaffUser =
  | {
      role?: 'admin' | 'editor'
    }
  | null
  | undefined

export const canPublish: Access = ({ req }) => {
  return (req.user as StaffUser)?.role === 'admin'
}

export const canAccessDrafts: Access = ({ req }) => {
  const role = (req.user as StaffUser)?.role

  return role === 'admin' || role === 'editor'
}

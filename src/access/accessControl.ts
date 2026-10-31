import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'

type StaffUser =
  | {
      id: string | number
      role?: Role
    }
  | null
  | undefined

export const isAdmin = (user: StaffUser): boolean => user?.role === 'admin'

export const isEditor = (user: StaffUser): boolean => user?.role === 'editor'

export const isStaff = (user: StaffUser): boolean => isAdmin(user) || isEditor(user)

export const adminOnly: Access = ({ req }) => isAdmin(req.user as StaffUser)

export const staffOnly: Access = ({ req }) => isStaff(req.user as StaffUser)

export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req.user as StaffUser)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const adminFieldOnly: FieldAccess = ({ req }) => isAdmin(req.user as StaffUser)

export const adminOrEditorCreateDraft: Access = ({ req, data }) => {
  const user = req.user as StaffUser

  if (isAdmin(user)) {
    return true
  }

  if (isEditor(user)) {
    return data?._status !== 'published'
  }

  return false
}

export const adminPublishEditorDraftUpdate: Access = ({ req, data }) => {
  const user = req.user as StaffUser

  if (isAdmin(user)) {
    return true
  }

  if (isEditor(user)) {
    return data?._status !== 'published'
  }

  return false
}
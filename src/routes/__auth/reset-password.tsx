import { ResetPasswordForm } from '@features/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/reset-password')({
  component: ResetPasswordForm,
})

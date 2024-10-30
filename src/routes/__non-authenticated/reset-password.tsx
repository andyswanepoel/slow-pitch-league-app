import { createFileRoute } from '@tanstack/react-router'
import { ResetPasswordForm } from '@features/auth'

export const Route = createFileRoute('/__non-authenticated/reset-password')({
  component: ResetPasswordForm,
})

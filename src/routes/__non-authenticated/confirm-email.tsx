import { createFileRoute } from '@tanstack/react-router'
import { ResendConfirmationEmail } from '@features/auth'

export const Route = createFileRoute('/__non-authenticated/confirm-email')({
  component: ResendConfirmationEmail,
})

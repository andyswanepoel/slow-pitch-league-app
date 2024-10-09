import { createFileRoute } from '@tanstack/react-router'
import { LogInForm } from '@features/auth'

export const Route = createFileRoute('/__auth/login')({
  component: LogInForm,
})

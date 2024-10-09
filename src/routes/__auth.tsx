import { RedirectAuthenticatedUserHome } from '@features/auth'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth')({
  component: () => (
    <RedirectAuthenticatedUserHome>
      <Outlet />
    </RedirectAuthenticatedUserHome>
  ),
})

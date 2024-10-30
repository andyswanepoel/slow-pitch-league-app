import { RedirectUnauthenticatedUserToLogin } from "@features/auth";
import { PageWrapper } from "@libs/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated")({
  component: () => (
    <RedirectUnauthenticatedUserToLogin>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </RedirectUnauthenticatedUserToLogin>
  )
});

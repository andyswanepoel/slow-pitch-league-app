interface Link {
  id: string;
  displayName: string;
  to: string;
}
export const AUTHENTICATED_LINKS: Link[] = [
  { id: "my-team", displayName: "My Team", to: "/my-team" },
  { id: "schedule", displayName: "Schedule", to: "/schedule" },
  { id: "standings", displayName: "Standings", to: "/standings" }
];
export const PUBLIC_LINKS: Link[] = [
  { id: "about", displayName: "About", to: "/about" },
  { id: "standings", displayName: "Standings", to: "/standings" }
];

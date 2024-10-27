CREATE TABLE teams (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    manager_id UUID UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES public.users(id) ON DELETE SET NULL 
);

ALTER TABLE users 
ADD CONSTRAINT fk_team 
FOREIGN KEY (team_id) 
REFERENCES teams(id) 
ON DELETE SET NULL;

CREATE TRIGGER on_public_team_updated
BEFORE UPDATE ON public.teams FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();
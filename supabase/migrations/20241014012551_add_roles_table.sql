CREATE TABLE roles (
    id UUID PRIMARY KEY,
    role TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER on_public_role_updated
BEFORE UPDATE ON public.roles FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();
CREATE TABLE user_role (
    id UUID PRIMARY KEY,
    user_id UUID,
    role_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE
);

CREATE TRIGGER on_public_user_role_updated
BEFORE UPDATE ON public.user_role FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();
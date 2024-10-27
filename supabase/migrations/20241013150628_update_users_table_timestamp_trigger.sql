CREATE FUNCTION public.handle_updating_timestamp () RETURNS trigger
SET
  search_path = '' AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

CREATE TRIGGER on_public_user_updated
BEFORE UPDATE ON public.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();
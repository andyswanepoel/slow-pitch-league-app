CREATE FUNCTION public.handle_new_user () RETURNS trigger
SET
  search_path = '' AS $$
BEGIN
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'first_name', NULL), 
        COALESCE(new.raw_user_meta_data->>'last_name', NULL)
    );
    RETURN new;
END; 
$$ LANGUAGE plpgsql SECURITY definer;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user ();
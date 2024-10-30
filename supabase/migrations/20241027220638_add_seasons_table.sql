CREATE TABLE seasons (
    id UUID PRIMARY KEY,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER on_public_season_updated
BEFORE UPDATE ON public.seasons FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();

ALTER TABLE games 
ADD season_id UUID;


ALTER TABLE games 
ADD CONSTRAINT fk_team 
FOREIGN KEY (season_id) 
REFERENCES seasons(id) 
ON DELETE SET NULL;
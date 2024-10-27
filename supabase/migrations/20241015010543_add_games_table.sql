CREATE TABLE games (
    id UUID PRIMARY KEY,
    game_time TIMESTAMPTZ,
    location TEXT,
    home_team_id UUID,
    away_team_id UUID,
    home_team_runs INTEGER,
    away_team_runs INTEGER,
    score_validated_by_home_team BOOLEAN DEFAULT FALSE,
    score_validated_by_away_team BOOLEAN DEFAULT FALSE,
    game_cancelled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_home_team FOREIGN KEY (home_team_id) REFERENCES public.teams(id) ON DELETE SET NULL,
    CONSTRAINT fk_away_team FOREIGN KEY (away_team_id) REFERENCES public.teams(id) ON DELETE SET NULL 
);

CREATE TRIGGER on_public_game_updated
BEFORE UPDATE ON public.games FOR EACH ROW
EXECUTE PROCEDURE public.handle_updating_timestamp ();
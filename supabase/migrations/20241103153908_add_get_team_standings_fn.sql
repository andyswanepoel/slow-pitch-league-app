CREATE OR REPLACE FUNCTION get_team_standings(season_id UUID)
RETURNS TABLE (
    team TEXT,
    wins INTEGER,
    losses INTEGER,
    draws INTEGER,
    total_runs_for INTEGER,
    total_runs_against INTEGER
)
SET
  search_path = '' AS $$
BEGIN
    RETURN QUERY
    SELECT
        team,
        SUM(CASE WHEN is_win THEN 1 ELSE 0 END) AS wins,
        SUM(CASE WHEN is_loss THEN 1 ELSE 0 END) AS losses,
        SUM(CASE WHEN is_draw THEN 1 ELSE 0 END) AS draws,
        SUM(runs_for) AS total_runs_for,
        SUM(runs_against) AS total_runs_against
    FROM (
        SELECT
               home_team_id AS team,
            CASE 
                WHEN home_team_runs > away_team_runs THEN true 
                ELSE false 
            END AS is_win,
            CASE 
                WHEN home_team_runs < away_team_runs THEN true 
            ELSE false 
            END AS is_loss,
            CASE 
                WHEN home_team_runs = away_team_runs THEN true 
                ELSE false 
            END AS is_draw,
            
            home_team_runs AS runs_for,
            away_team_runs AS runs_against

        FROM games
        WHERE games.season_id = season_id

        UNION ALL

        SELECT
            away_team_id AS team,
            CASE 
                WHEN away_team_runs > home_team_runs THEN true 
                ELSE false 
            END AS is_win,
            CASE 
                WHEN away_team_runs < home_team_runs THEN true 
                ELSE false 
            END AS is_loss,
            CASE 
                WHEN away_team_runs = home_team_runs THEN true 
                ELSE false 
            END AS is_draw,

            home_team_runs AS runs_against,
            away_team_runs AS runs_for

        FROM games
        WHERE games.season_id = season_id

    ) AS results
    GROUP BY team
    ORDER BY wins DESC, total_runs_for DESC, total_runs_against ASC, team;
END;
$$ LANGUAGE plpgsql SECURITY definer;

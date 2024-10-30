CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE teams
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

ALTER TABLE roles
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

ALTER TABLE user_role
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

ALTER TABLE games
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

ALTER TABLE seasons
ALTER COLUMN id SET DEFAULT uuid_generate_v4();
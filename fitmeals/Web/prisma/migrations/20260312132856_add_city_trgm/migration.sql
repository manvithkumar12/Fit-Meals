CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX restaurant_city_trgm_idx
ON "Restaurant"
USING gin (city gin_trgm_ops);
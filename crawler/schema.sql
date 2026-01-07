DROP TABLE IF EXISTS links CASCADE;

DROP TABLE IF EXISTS page_keywords CASCADE;

DROP TABLE IF EXISTS keywords CASCADE;

DROP TABLE IF EXISTS pages CASCADE;

CREATE TABLE
    pages (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL UNIQUE,
        crawled_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    keywords (
        id SERIAL PRIMARY KEY,
        keyword TEXT NOT NULL,
        norm_keyword TEXT NOT NULL UNIQUE
    );

CREATE TABLE
    page_keywords (
        keyword_id BIGINT NOT NULL REFERENCES keywords (id) ON DELETE CASCADE,
        page_id BIGINT NOT NULL REFERENCES pages (id) ON DELETE CASCADE,
        frequency INT NOT NULL,
        PRIMARY KEY (keyword_id, page_id)
    );

CREATE TABLE
    links (
        from_page BIGINT NOT NULL REFERENCES pages (id) ON DELETE CASCADE,
        to_page BIGINT NOT NULL REFERENCES pages (id) ON DELETE CASCADE,
        PRIMARY KEY (from_page, to_page),
        CHECK (from_page <> to_page)
    );

CREATE INDEX idx_keywords_norm ON keywords (norm_keyword);

CREATE INDEX idx_page_keywords_keyword ON page_keywords (keyword_id);

CREATE INDEX idx_links_to_page ON links (to_page);

CREATE INDEX idx_links_from_page ON links (from_page);

-- TRUNCATE TABLE
--     links,
--     page_keywords,
--     keywords,
--     pages
-- RESTART IDENTITY
-- CASCADE;
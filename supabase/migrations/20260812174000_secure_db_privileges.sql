-- Revoke write/modify privileges from the anonymous role (anon) on site_content
REVOKE INSERT, UPDATE, DELETE ON TABLE public.site_content FROM anon;

-- Revoke modify/delete privileges from the anonymous role (anon) on leads (anon can only INSERT leads)
REVOKE UPDATE, DELETE ON TABLE public.leads FROM anon;

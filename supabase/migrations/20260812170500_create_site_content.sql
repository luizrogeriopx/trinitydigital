-- Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Grant privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read site content" 
  ON public.site_content 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Authenticated users can write/update site content" 
  ON public.site_content 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

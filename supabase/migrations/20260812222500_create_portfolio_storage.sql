-- Create a public bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for public reading
CREATE POLICY "Public Read Portfolio"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'portfolio');

-- Policies for authenticated admin upload, update and deletion
CREATE POLICY "Admin Insert Portfolio"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio' AND public.is_admin());

CREATE POLICY "Admin Update Portfolio"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio' AND public.is_admin())
  WITH CHECK (bucket_id = 'portfolio' AND public.is_admin());

CREATE POLICY "Admin Delete Portfolio"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio' AND public.is_admin());

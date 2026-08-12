-- 1. Create the admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Allow authenticated read access to admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- 2. Create the is_admin helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql;

-- 3. Create the trigger function to automatically promote users to admin
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS trigger SECURITY DEFINER AS $$
DECLARE
  passed_key TEXT;
BEGIN
  -- Read system_key from raw_user_meta_data
  passed_key := new.raw_user_meta_data->>'system_key';
  
  IF passed_key = 'trinityadmin' THEN
    -- Insert into admin_users
    INSERT INTO public.admin_users (user_id)
    VALUES (new.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Clean up system_key from raw_user_meta_data to avoid storing it in plaintext
    new.raw_user_meta_data := new.raw_user_meta_data - 'system_key';
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- 4. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_signup();

-- 5. Secure RLS policies on leads table
DROP POLICY IF EXISTS "Authenticated can read leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can delete leads" ON public.leads;

CREATE POLICY "Admins can read leads" 
  ON public.leads 
  FOR SELECT 
  TO authenticated 
  USING (public.is_admin());

CREATE POLICY "Admins can update leads" 
  ON public.leads 
  FOR UPDATE 
  TO authenticated 
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete leads" 
  ON public.leads 
  FOR DELETE 
  TO authenticated 
  USING (public.is_admin());

-- 6. Secure RLS policies on site_content table
DROP POLICY IF EXISTS "Authenticated users can write/update site content" ON public.site_content;

CREATE POLICY "Admins can modify site content" 
  ON public.site_content 
  FOR ALL 
  TO authenticated 
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

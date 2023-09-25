import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tjhuthxkcdgezllhicae.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqaHV0aHhrY2RnZXpsbGhpY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2Mzk2MzEsImV4cCI6MjAxMTIxNTYzMX0.iobQ9yrY6Osceg-GjE3h097XUzFr9qdYzzIS9kgZk1c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import{NextResponse}from"next/server";import{createSupabaseAdminClient}from"@/lib/supabase/server";
export async function GET(){try{const{data,error}=await createSupabaseAdminClient().from("available_collection_slots").select("id,starts_at,ends_at").order("starts_at").limit(30);if(error)throw error;return NextResponse.json(data)}catch{return NextResponse.json([])}}

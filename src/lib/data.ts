import{demoProducts}from"./demo";import{createSupabaseServerClient}from"./supabase/server";import{Product}from"./types";
export async function getProducts():Promise<Product[]>{const s=await createSupabaseServerClient();if(!s)return demoProducts;const{data,error}=await s.from("products_public").select("*").order("sort_order");if(error)throw error;return data as Product[]}
export async function getProduct(slug:string){return(await getProducts()).find(p=>p.slug===slug)??null}

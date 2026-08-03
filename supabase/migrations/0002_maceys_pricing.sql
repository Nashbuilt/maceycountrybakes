insert into public.categories(name,slug,sort_order) values
  ('Gift Boxes','gift-boxes',1),
  ('Cupcakes','cupcakes',2),
  ('Banana Loaves','banana-loaves',3),
  ('Dinner Rolls','dinner-rolls',4)
on conflict (slug) do update set name=excluded.name,sort_order=excluded.sort_order;

with catalogue(id,category_slug,name,slug,short_description,description,price_pence,stock,sort_order) as (values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'::uuid,'gift-boxes','Macey Country Treat Box','macey-country-treat-box','A hand-picked gift box filled with Macey’s favourites.','Includes scones, cupcakes, a banana loaf slice and a selection of sweet treats.',2000,12,1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'::uuid,'cupcakes','Luxury Celebration Cupcakes — Box of 6','luxury-celebration-cupcakes-6','Six beautifully finished cupcakes for a special occasion.','Perfect for birthdays, baby showers, christenings and gifts.',1400,12,1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'::uuid,'cupcakes','Luxury Celebration Cupcakes — Box of 12','luxury-celebration-cupcakes-12','Twelve beautifully finished cupcakes for larger celebrations.','Perfect for birthdays, baby showers, christenings and gifts.',2800,8,2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'::uuid,'cupcakes','Classic Cupcakes — Box of 6','classic-cupcakes-6','Six homemade classic cupcakes.','Soft homemade cupcakes with a classic finish.',1200,15,3),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5'::uuid,'cupcakes','Classic Cupcakes — Box of 12','classic-cupcakes-12','Twelve homemade classic cupcakes.','Soft homemade cupcakes with a classic finish.',2200,10,4),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6'::uuid,'banana-loaves','Mini Banana Loaf','mini-banana-loaf','A personal-sized homemade banana loaf.','Choose Classic Banana, Banana & Chocolate Chip, or Banana & Walnut.',400,20,1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa7'::uuid,'banana-loaves','Large Banana Loaf','large-banana-loaf','A full homemade banana loaf for sharing.','Choose Classic Banana, Banana & Chocolate Chip, or Banana & Walnut.',800,12,2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa8'::uuid,'banana-loaves','Banana Loaf Slice','banana-loaf-slice','A thick slice of homemade banana loaf.','A generous individual slice of Macey’s homemade banana loaf.',300,24,3),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa9'::uuid,'dinner-rolls','Homemade Enriched Dinner Rolls — 9','enriched-dinner-rolls-9','Nine soft, fluffy enriched dinner rolls.','Made with fresh milk, powdered milk, eggs and butter.',750,10,1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa10'::uuid,'dinner-rolls','Homemade Enriched Dinner Rolls — 12','enriched-dinner-rolls-12','Twelve soft, fluffy enriched dinner rolls.','Made with fresh milk, powdered milk, eggs and butter.',1000,10,2)
)
insert into public.products(id,category_id,name,slug,short_description,description,price_pence,stock,is_visible,is_available,sort_order)
select c.id,cat.id,c.name,c.slug,c.short_description,c.description,c.price_pence,c.stock,true,true,c.sort_order
from catalogue c join public.categories cat on cat.slug=c.category_slug
on conflict (slug) do update set
  category_id=excluded.category_id,name=excluded.name,short_description=excluded.short_description,
  description=excluded.description,price_pence=excluded.price_pence,stock=excluded.stock,
  is_visible=true,is_available=true,sort_order=excluded.sort_order,updated_at=now();

insert into public.product_allergens(product_id,allergen_id)
select p.id,a.id from public.products p cross join public.allergens a
where p.slug in ('macey-country-treat-box','luxury-celebration-cupcakes-6','luxury-celebration-cupcakes-12','classic-cupcakes-6','classic-cupcakes-12','mini-banana-loaf','large-banana-loaf','banana-loaf-slice','enriched-dinner-rolls-9','enriched-dinner-rolls-12')
and a.name in ('Gluten','Milk','Egg')
on conflict do nothing;

insert into public.product_allergens(product_id,allergen_id)
select p.id,a.id from public.products p cross join public.allergens a
where p.slug in ('mini-banana-loaf','large-banana-loaf','banana-loaf-slice') and a.name='Nuts'
on conflict do nothing;

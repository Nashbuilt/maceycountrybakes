begin;

update public.products
set
  category_id = (select id from public.categories where slug = 'cakes'),
  name = 'Chocolate Cake',
  slug = 'chocolate-cake',
  short_description = 'A generous homemade chocolate cake, made for sharing.',
  description = 'A generous homemade chocolate cake, made by hand and finished with chocolate.',
  price_pence = 3000,
  stock = greatest(stock, 1),
  is_visible = true,
  is_available = true,
  sort_order = 1,
  updated_at = now()
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1';

update public.products
set
  category_id = (select id from public.categories where slug = 'scones'),
  name = 'Classic Scones — 6',
  slug = 'classic-scones-6',
  short_description = 'Six tender homemade scones.',
  description = 'Six classic homemade scones, baked until golden and ready for cream and jam.',
  price_pence = 1000,
  stock = greatest(stock, 1),
  is_visible = true,
  is_available = true,
  sort_order = 2,
  updated_at = now()
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3';

update public.products
set
  category_id = (select id from public.categories where slug = 'scones'),
  name = 'Classic Scone — 1',
  slug = 'classic-scone',
  short_description = 'One tender homemade scone.',
  description = 'One classic homemade scone, baked until golden and ready for cream and jam.',
  price_pence = 200,
  stock = greatest(stock, 1),
  is_visible = true,
  is_available = true,
  sort_order = 1,
  updated_at = now()
where id = '11111111-1111-1111-1111-111111111111';

update public.products
set is_visible = false, is_available = false, updated_at = now()
where id in (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5'
);

commit;

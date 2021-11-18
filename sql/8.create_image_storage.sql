insert into storage.buckets (id, name)
values ('auction_images', 'auction_images');

-- Row level security
create policy "Give users access to own folder cdpjr6_0" on storage.objects for
  insert with check (
    bucket_id = 'auction-images' and auth.uid():: text = (storage.foldername(name)) [ 1 ]
  );

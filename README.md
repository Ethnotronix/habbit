# Habbit

Next.js ve Tailwind CSS kullanılarak hazırlanmış basit bir alışkanlık takip uygulaması.

## Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
 npm run dev
  ```
3. Tarayıcınızdan `http://localhost:3000` adresine giderek uygulamayı kullanabilirsiniz.

### Ortam Değişkenleri

`NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değişkenlerini `.env` dosyanıza ekleyerek Supabase bağlantısını tanımlayın. Örnek için `.env.example` dosyasına bakabilirsiniz.

Giriş yapan kullanıcıların alışkanlıkları Supabase üzerinde saklanır. Giriş yapılmadığında veriler tarayıcıdaki `localStorage`'da tutulmaya devam eder.


### Supabase Tablosu

`habits` tablosunun `user_id` sütununa yanlışlıkla `UNIQUE` kısıtı eklendiğinde her kullanıcı için sadece tek satır eklenebilir ve aşağıdaki gibi bir hata alınır:

```
duplicate key value violates unique constraint "habits_user_id_key"
```

Aşağıdaki sorgu kısıtlamayı kaldırıp her kullanıcı için birden fazla alışkanlık saklamaya olanak tanır:

```sql
ALTER TABLE IF EXISTS habits DROP CONSTRAINT IF EXISTS habits_user_id_key;
CREATE TABLE IF NOT EXISTS habits (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL,
  target integer NOT NULL,
  frequency text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  lastreset bigint NOT NULL,
  CONSTRAINT habits_user_id_id_key UNIQUE (user_id, id)
);
```

Bu sorgu `db/schema.sql` dosyasında da bulunmaktadır.

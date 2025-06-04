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

Uygulama çalışabilmek için oturum açmış bir kullanıcıya ihtiyaç duyar ve bütün alışkanlık verileri her zaman Supabase üzerinde saklanır.


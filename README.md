# Arizalar reestri: o'rnatish (taxminan 20 daqiqa)

## 1. Supabase (baza va rasmlar)
1. supabase.com → loyihangizni oching → chapdagi **SQL Editor** → **New query**.
2. `supabase_setup.sql` faylidagi hamma matnni joylab **Run** bosing ("Success" chiqishi kerak).
3. **Authentication → Users → Add user → Create new user**: email va parol kiriting, **"Auto Confirm User"** ni yoqing. Har xodim uchun shunday user yarating.
4. **Authentication → Sign In / Providers → Email**: **"Allow new users to sign up"** (ochiq ro'yxatdan o'tish) ni **o'chiring**. Aks holda begona odam ham hisob ocha oladi.

## 2. GitHub
1. github.com → **New repository** (nomi: `arizalar-sayt`, **Private**).
2. **uploading an existing file** havolasini bosing va shu papkadagi **hamma fayl va `public` papkasini** sudrab tashlang (`node_modules` bo'lmasin). **Commit changes**.

## 3. Render (sayt)
1. render.com → **New → Web Service** → GitHub reponi tanlang.
2. Sozlamalar: Runtime **Node**, Build Command `npm install`, Start Command `npm start`, Instance type **Free**.
3. **Environment** bo'limida qo'shing:
   - `ANTHROPIC_API_KEY` = (console.anthropic.com dan olgan kalitingiz; faqat shu yerga qo'ying)
4. **Create Web Service**. Tayyor bo'lgach `https://....onrender.com` havola chiqadi.

## 4. iPhone'da ikonka
Safari'da havolani oching → Ulashish (⬆️) → **Bosh ekranga qo'shish**.

## Eslatma
- Bepul tarifda sayt 15 daqiqa ishlatilmasa uxlaydi, birinchi ochilish 30-50 soniya olishi mumkin. Doimiy tez ishlashi uchun Render'ning pullik tarifi ($7/oy) kerak.
- Modelni almashtirish: Render Environment'da `CLAUDE_MODEL`.

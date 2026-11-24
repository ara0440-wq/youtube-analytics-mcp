# YouTube & Shorts Analytics MCP — To'liq Qo'llanma (O'zbek tilida)

Bu papkada loyihani ishga tushirish, GitHub va npm'ga chiqarish uchun hamma narsa tayyor.

---

## 1-QADAM: Kerakli dasturlar
Kompyuteringizda quyidagi 2 ta dastur bo'lishi kerak:
1. **Node.js (v20 yoki undan yuqori)** — https://nodejs.org saytidan LTS versiyasini yuklab o'rnating.
2. **Git** — https://git-scm.com saytidan yuklab o'rnating.

---

## 2-QADAM: Loyihani o'rnatish va ishga tayyorlash (Build)
- **Windows'da:** `scripts/install_and_build.bat` faylini ustiga 2 marta bosing.
- **Mac / Linux'da:** Terminalda `bash scripts/install_and_build.sh` buyrug'ini bering.

Yoki oddiy terminalda shu papka ichida quyidagi 2 ta buyruqni yozing:
```bash
npm ci
npm run build
```
Shundan keyin `build/index.js` fayli avtomatik yaratiladi.

---

## 3-QADAM: Claude Desktop'da sinab ko'rish
1. Claude Desktop sozlamalarini oching: `Settings -> Developer -> Edit Config`.
2. `claude_desktop_config.json` fayli ochiladi.
3. Shu papkadagi `claude_desktop_config.example.json` ichidagi kodni nusxalab oling va `/TO_LIQ_MANZIL/` qismini o'z kompyuteringizdagi manzilga almashtiring.
4. Claude Desktop'ni yopib, qayta oching.
5. Claude'ga yozing:
   > "Mana bu YouTube Shorts'ning birinchi 10 soniyasini (hook) tahlil qilib ber: [VIDEO_HAVOLASI]"

*Eslatma:* `get_video_transcript` va `get_shorts_hook` vositalari **API kalitsiz ham** ishlaydi. Ko'rishlar, teglar va izohlarni olish uchun Google Cloud Console'dan bepul **YouTube Data API v3** kalitini olib `YOUTUBE_API_KEY` joyiga yozasiz.

### Codex

Build tayyor bo'lgach, quyidagi buyruqdagi manzilni o'zingizdagi `build/index.js` faylining to'liq manziliga almashtiring.

```sh
codex mcp add youtube-analytics -- node "/TO_LIQ_MANZIL/youtube-analytics-mcp/build/index.js"
codex mcp list
```

Codex'da yangi sessiya oching va YouTube havolasini yuborib, ilk 10 soniya subtitrini olishni so'rang.

### Gemini CLI

Gemini CLI'ni ishlatadigan papkangizda quyidagi buyruqlarni bajaring. Fayl manzilini o'zingizdagi to'liq manzilga almashtiring.

```sh
gemini mcp add --scope project --env 'YOUTUBE_API_KEY=$YOUTUBE_API_KEY' youtube-analytics node "/TO_LIQ_MANZIL/youtube-analytics-mcp/build/index.js"
gemini mcp list
```

Gemini CLI'ni oching, kerak bo'lsa hisobingizga kiring va papkaga ishonch bildiring. `/mcp` buyrug'i vositalarni ko'rsatadi. Gemini veb-ilovasidagi Connected Apps orqali ulash uchun xizmatga yetib boradigan MCP URL kerak.

---

## 4-QADAM: GitHub'ga yuklash (Open-Source qilish)
1. https://github.com/new sahifasiga kiring.
2. Repository name: `youtube-analytics-mcp` deb yozing, **Public** qilib belgilang va **Create repository** bosing.
3. Shu papkada terminal ochib quyidagilarni ketma-ket kiriting (`SIZNING_USERNAME` o'rniga GitHub loginingizni yozing):

```bash
git init
git add .
git commit -m "feat: initial release of YouTube & Shorts Analytics MCP"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/youtube-analytics-mcp.git
git push -u origin main
```

---

## 5-QADAM: npm'ga chiqarish (hamma `npx` bilan ishlata olishi uchun)
1. https://npmjs.com saytida akkaunt oching.
2. `package.json` faylidagi `"name"` qismini o'zingizga moslang (masalan: `"@sizning-username/youtube-analytics-mcp"`).
3. Terminalda bajaring:
```bash
npm login
npm publish --access public
```

---

## 6-QADAM: Yulduzcha (Stars) yig'ish uchun kataloglarga qo'shish
GitHub'ga chiqargandan keyin havolangizni quyidagi joylarga yuboring:
1. **Smithery.ai** va **mcp.so** kataloglari
2. GitHub'dagi **`awesome-mcp-servers`** ro'yxatlariga Pull Request (PR) yuboring
3. **Reddit** (`r/ClaudeAI`, `r/cursor`, `r/opensource`) va **YouTube Shorts / Instagram Reels**'da demo video bilan ulashing (tayyor ssenariylar `02_VIDEO_SSENARIY_VA_PROMPTS.md` faylida).

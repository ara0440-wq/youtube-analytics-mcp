# Video Ssenariylar va AI Promptlar (Animatsion + Realniy Demo)

Loyihangizni YouTube Shorts, Instagram Reels va GitHub README'da tez tarqatish uchun 2 xil tayyor video rejasi.

---

## 1-VIDEO: ANIMATSION VIDEO (YouTube Shorts / Reels — 35 soniya)

**Maqsad:** Odamlarning e'tiborini tortish va GitHub havolaga o'tkazish.

### Kadrlar va Matn (O'zbekcha)
- **0-4 soniya (Hook):**
  - *Vizual:* Qora fon, markazda YouTube Shorts ikonkasi va qizil neon chiziqlar bilan o'ralgan AI miya/agent silueti.
  - *Ovoz (Voiceover):* "Nega ba'zi Shorts'lar 1 million ko'rish yig'adi, sizniki esa 500 tadan o'tmaydi?"
- **4-12 soniya (Muammo):**
  - *Vizual:* Dasturchi/kontentchi 10 ta ochiq brauzer oynasi va uzun izohlar orasida charchab qolgan animatsion sahna.
  - *Ovoz:* "Chunki viral videolarning birinchi 10 soniyasi va izohlarini qo'lda tahlil qilishga soatlab vaqt ketadi."
- **12-25 soniya (Yechim — sizning MCP loyihangiz):**
  - *Vizual:* Claude interfeysiga bitta YouTube havolasi tashlanadi -> MCP server 4 ta modulni (Transcript, 10s Hook, Tags, Top Comments) chaqmoq tezligida chiqarib beradi.
  - *Ovoz:* "Shuning uchun men bepul ochiq kodli YouTube Analytics MCP serverini yasadim. Endi Claude'ga shunchaki havola berasiz — u hook, teglar va eng top izohlarni soniyalar ichida tahlil qilib beradi."
- **25-35 soniya (CTA):**
  - *Vizual:* GitHub yulduzcha animatsiyasi + `npx youtube-analytics-mcp` buyrug'i.
  - *Ovoz:* "Kod 100% bepul va GitHub'da ochiq. Havola bio va izohlarda — yulduzcha bosib qo'yishni unutmang!"

### AI Video / Rasm Generator Promptlari (Inglizcha)
1. **Hook Scene:** `Sleek minimalist dark cyber studio animation, glowing red YouTube Shorts play icon floating in mid-air, electric blue AI neural lines scanning the video timeline, dramatic volumetric lighting, 9:16 vertical, 4k, ultra crisp motion graphics`
2. **Solution Scene:** `High-tech dark UI hologram showing an AI terminal extracting video hooks, viral tags, and top comments in real time with glowing green metrics and rising retention graphs, sleek fintech/tech thriller aesthetic, 9:16 vertical, 60fps`

---

## 2-VIDEO: REALNIY DEMO VIDEO (15-25 soniya — GitHub README GIF va Shorts uchun)

**Maqsad:** Loyiha haqiqatda ishlashini ko'rsatish (dasturchilar real demo ko'rmasa yulduzcha bosmaydi).

### Qanday yozib olasiz? (OBS Studio yoki ekran yozish)
1. **0-5 soniya:** Claude Desktop oynasini oching. Istalgan mashhur YouTube Shorts havolasini kiriting va yozing:
   `Analyze the first 10 seconds hook and top 10 comments of this video: [URL]`
2. **5-15 soniya:** Claude sizning `get_shorts_hook` va `get_top_comments` vositalaringizni ishga tushirib, aniq tahlil chiqarayotganini ko'rsating.
3. **15-20 soniya:** GitHub sahifangizni va `npx` o'rnatish buyrug'ini ko'rsating.

*Maslahat:* Shu realniy videoning 10 soniyalik tezlashtirilgan **GIF** variantini yasab, GitHub'dagi `README.md` faylining eng tepasiga joylashtiring.

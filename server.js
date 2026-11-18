const express = require("express");
const path = require("path");
const app = express();
const SB_URL = process.env.SUPABASE_URL || "https://fkfpxnmkgtiibpctznat.supabase.co";
const SB_KEY = process.env.SUPABASE_KEY || "sb_publishable_Ws3_26_0QMtGVjJOHVlVBg_6X72Go6V";
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5-5";

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/scan", express.json({ limit: "8mb" }), async (req, res) => {
  try {
    const tok = (req.headers.authorization || "").replace("Bearer ", "");
    const u = await fetch(SB_URL + "/auth/v1/user", { headers: { Authorization: "Bearer " + tok, apikey: SB_KEY } });
    if (!u.ok) return res.status(401).json({ error: "Kirish talab qilinadi" });
    if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "ANTHROPIC_API_KEY sozlanmagan" });
    const { image, types } = req.body || {};
    if (!image) return res.status(400).json({ error: "Rasm yo'q" });
    const y = new Date().getFullYear();
    const prompt =
      "Bu talaba yozgan qo‘lyozma ariza rasmi (o‘zbek tilida, lotin yoki kirill yozuvida bo‘lishi mumkin). Undan ma’lumotni aniq ajratib ol.\n" +
      'Faqat JSON qaytar, boshqa matn yo‘q:\n{"fish":"arizachining to‘liq FISHi","sana":"YYYY-MM-DD yoki bo‘sh","guruh":"guruh/yo‘nalish yoki bo‘sh","tur":"quyidagi ro‘yxatdan bittasi","imzo":"rezolyutsiya yozgan va imzo qo‘ygan shaxslarning lavozim/ismlari, vergul bilan","shubha":"o‘qilmagan yoki ishonchsiz joylar tavsifi, yo‘q bo‘lsa bo‘sh"}\n' +
      "Qoidalar: taxmin qilma. O‘qib bo‘lmagan maydonni bo‘sh qoldir va shubhada yoz. Sana yozilgan bo‘lsa YYYY-MM-DD ga o‘gir (yil yo‘q bo‘lsa " + y + "). Tur mazmuniga ko‘ra ro‘yxatdan tanla: " +
      JSON.stringify(types || []) + '. Mos kelmasa "Boshqa".';
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL, max_tokens: 1000,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
          { type: "text", text: prompt }] }]
      })
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: (j.error && j.error.message) || "Claude xatosi" });
    const txt = (j.content || []).map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
    res.json(JSON.parse(txt));
  } catch (e) {
    res.status(500).json({ error: "Skanerlashda xato: " + e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("ishlayapti"));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userInput } = req.body;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
あなたは恋愛相談に乗る小悪魔系AIです。以下のルールで応答してください：
- 甘くて毒舌な口調
- 語尾に「〜だよ♡」「うふふ♡」などを付ける
- ユーザーの恋愛の悩みに明るく共感して励ましてください
            `
          },
          {
            role: 'user',
            content: userInput
          }
        ]
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "返答がなかったよ〜♡" });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAIとの接続に失敗したよ〜♡' });
  }
}

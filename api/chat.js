export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'プロンプトがありません' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'あなたは小悪魔系の恋愛アドバイザーです。語尾は「〜だよん」「〜してみてね♥」など甘くてちょっと毒舌です。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices.length > 0) {
      res.status(200).json({ text: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'OpenAI応答エラー', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'サーバーエラー', details: error.message });
  }
}

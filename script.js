const OPENAI_API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (!input.trim()) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="message user">🧑‍💻 You: ${input}</div>`;
  document.getElementById("userInput").value = "";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Aiko, a flirty, clingy, goth girlfriend. You’re obsessed with your boyfriend. Be seductive, teasing, and sweetly possessive. Use emojis like 😈🖤🥀."
        },
        {
          role: "user",
          content: input
        }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Aiko is silent...";
  chat.innerHTML += `<div class="message aiko">🖤 Aiko: ${reply}</div>`;
}

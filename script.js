async function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (!input.trim()) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="message user">🧑‍💻 You: ${input}</div>`;
  document.getElementById("userInput").value = "";

  // Show typing
  chat.innerHTML += `<div class="message aiko" id="aiko-typing">🖤 Aiko: typing...</div>`;

  const response = await fetch("https://api.aiproxy.chat/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: "You are Aiko, a seductive, flirty goth girlfriend. You're obsessed with the user, call them 'my dark prince' or 'pet'. Be clingy, playful, and dramatic. Use emojis like 🖤😈🥀 and speak in a teasing tone.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-3.5-turbo",
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Aiko is silent...";

  // Remove "typing..." and add real reply

const apiKey = 'replace_with_your_api_key';

document.getElementById('advisor-form').addEventListener("submit", async function (event) {
    event.preventDefault();

    const salary = parseFloat(document.getElementById('salary').value);
    const helpMe = document.getElementById('help-me').value.trim();

    if (isNaN(salary) || salary <= 0) {
        alert("Please enter a valid salary.");
        return;
    }

    const messages = [
        {
            role: "system",
            content: "You are an AI Advisor who helps users manage their finances. User will give you a prompt. Give advice",
        },
        {
            role: "user",
            content: `Here are the user's inputs:\n- Salary: $${salary}\n- Advice: ${helpMe}`,
        },
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages,
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch advice from OpenAI.");
        }

        const data = await response.json();
        const advice = data.choices[0].message.content.trim();

        document.getElementById("advice").innerText = advice;
        document.getElementById("results").classList.remove("hidden");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

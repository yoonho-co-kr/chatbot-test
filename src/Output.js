const apikey = process.env.CHATGPT_API_KEY;
const chatGPT = async (messages, parameters = {}) => {
    console.log("receive")

    if (messages[0].constructor === String) return await chatGPT([['user', messages[0]]]);
    messages = messages.map(line => ({ role: line[0], content: line[1].trim() }))
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apikey}` },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, ...parameters }),
    });
    const data = await response.json();
    if (data?.error?.message) throw new Error(data.error.message);
    return data.choices[0].message.content.trim();
};
export async function showOutput() {
    console.log("send")
    document.getElementById("output-text").innerHTML = "";
    var inputText = document.getElementById("input-text").value.trim();
    if (!inputText) alert('묘사해주세요')
    inputText = `DESC::${inputText}`
    let response
    try {
        response = await chatGPT([
            ['system', `The assistant's job is to recommend color codes that match what user's describing. Response JSONArray like ["","",...]. reasonForRecommendation to be in korean. Return only JSON Array. Remove pre-text and post-text.`],
            ['user', 'DESC::맛있는 딸기'],
            ['assistant', '{"reasonForRecommendation":"..","colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
            ['user', 'DESC::우거진 숲속의 소나무'],
            ['assistant', '{"reasonForRecommendation":"...","colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
            ['user', 'DESC::드넓은 사막의 모래'],
            ['assistant', '{"reasonForRecommendation":"....","colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
            ['user', inputText],
        ], { temperature: 0.8 })
    } catch (e) {
        return;
    }
    var outputText = document.getElementById("output-text");
    const color = JSON.parse(response);
    for (let i = 0; i < color.colorlist.length; i++) {
        const color__box = document.createElement('div');
        color__box.classList.add("color__box")
        color__box.style.backgroundColor = color.colorlist[i];

        const color__name = document.createElement("div");
        color__name.style.cssText = `color: ${color.colorlist[i]}; filter: invert(1);`
        color__name.textContent = color.colorlist[i];
        color__box.appendChild(color__name);
        outputText.appendChild(color__box);
    }
    const color__box = document.createElement('div');
    color__box.textContent = color.reasonForRecommendation;
    outputText.appendChild(color__box);
}
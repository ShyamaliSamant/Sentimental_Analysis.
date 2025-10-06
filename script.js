async function analyzeSentiment() {
    const text = document.getElementById("userText").value;
    const resultDiv = document.getElementById("result");

    if(text.trim() === "") {
        resultDiv.innerHTML = "Please enter some text!";
        resultDiv.style.color = "red";
        return;
    }

    resultDiv.innerHTML = "Analyzing...";
    resultDiv.style.color = "black";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict-sentiment", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (data && data[0]) {
            const sentiment = data[0].label;
            const score = (data[0].score * 100).toFixed(2);

            let color = "black";
            if (sentiment === "POSITIVE") color = "green";
            else if (sentiment === "NEGATIVE") color = "red";
            else color = "orange";

            resultDiv.innerHTML = `Sentiment: ${sentiment} (${score}%)`;
            resultDiv.style.color = color;
        } else {
            resultDiv.innerHTML = "Unable to analyze sentiment.";
            resultDiv.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Error connecting to backend.";
        resultDiv.style.color = "red";
    }
}

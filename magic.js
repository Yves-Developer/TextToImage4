var img = document.getElementById('img');
var btn = document.getElementById('btn');
var prompt = document.getElementById('prompt');
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
btn.onclick = async function(){
  query({"inputs": prompt.value}).then((response) => {
    const objurl = URL.createObjectURL(response);
    img.src = objurl;
 });
};
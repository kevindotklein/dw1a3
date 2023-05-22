let boxPreview = document.getElementById("box-preview");

let inputTopL = document.getElementById("input-top-l");
let inputTopR = document.getElementById("input-top-r");
let inputBottonR = document.getElementById("input-bottom-r");
let inputBottonL = document.getElementById("input-bottom-l");

let copyButton = document.getElementById("btn-copy");

inputTopL.onchange = updatePreview;
inputTopR.onchange = updatePreview;
inputBottonR.onchange = updatePreview;
inputBottonL.onchange = updatePreview;

copyButton.onclick = copyProperty;

function updatePreview(){
	validateFields();

	let property = "border-radius: " + 
		inputTopL.value + "px " + inputTopR.value + "px " + 
		inputBottonR.value + "px " + inputBottonL.value + "px;";

	document.getElementById("input-prop").value = property;

	boxPreview.style = property;
}

function validateFields(){
	let inputs = [
		inputTopL,
		inputTopR,
		inputBottonR,
		inputBottonL
	];
	for(valor of inputs){
		if(valor.value.length === 0 || valor.value < 0)
			valor.value = 0;
		else if(valor.value > 150)
			valor.value = 150;
	}
}

function copyProperty(){
	let inputProp = document.getElementById("input-prop");
	if(inputProp.value.length === 0) return;

	inputProp.select();
	inputProp.setSelectionRange(0, 99999);
	document.execCommand("copy");
}
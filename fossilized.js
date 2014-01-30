function changeDisplay(playerChoice){
	var tDisplay=document.getElementById('textDisplay');
	var playerChoice;
	if (playerChoice === 1){
	tDisplay.value = "You are in the Salt Desert, with nothing but white sand in all directions.";
	}
	else{
	tDisplay.value = "playerChoice was invalid.";
	}
}
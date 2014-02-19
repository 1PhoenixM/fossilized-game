//Global vars
map = [];
inventory = [];
Locations = [];
Items = [];
visitedLocations = [];
//Global versions of currentLocation and dir.
traceLocation = 0;
traceDir = 0;
//DOM elements
tDisplay = document.getElementById('textDisplay');
tInputText = document.getElementById('textInput').value.toLowerCase();

//Prototypes
function Locale(id){
	this.id = id;
	this.locName = "";
	this.desc = "";
	this.item = "";
	this.toString = function(){
		return "Locale id = " + this.id + "locName=" + this.locName + "desc=" + this.desc + "item=" + this.item + "]";
	}
}

function Item(id){
	this.id = id;
	this.itemName = "";
	this.desc = "";
	this.toString = function(){
		return "Item id = " + this.id + "itemName=" + this.itemName + "desc=" + this.desc + "]";
	}
}



function welcome(){
	date = new Date();
	var tDisplay = document.getElementById('textDisplay');
	tDisplay.value="Welcome to Fossilized 1.0. Type 'h' for help and a list of commands.\n";
	//Displays the first location.
	navigate(1, 's');
	startingHours=date.getHours();
	startingMinutes=date.getMinutes();
	startingSeconds=date.getSeconds();
}

function enterConfirm(){
	//Allows enter key to be used instead of button click.
	if (event.keyCode == 13) {
	document.getElementById('confirmButton').click()
	document.getElementById('textInput').value=""
}
}

function chooseCommands(buttondir){
	//If buttondir is noDir, then the button being used must be the Confirm button for the text input.
	if (buttondir === 'noDir'){
		doStuff();
	}
	navigate(traceLocation, buttondir);
}


function doStuff(){
	tDisplay = document.getElementById('textDisplay');
	tInputText = document.getElementById('textInput').value.toLowerCase();
	if (tInputText === 'n' || tInputText  === 'e' || tInputText === 'w' || tInputText  === 's'){
		navigate(traceLocation, tInputText);
	}
	else if (tInputText === 'take'){
		tDisplay.value =  tDisplay.value + "\n>>>Take what?\n";
		tDisplay.scrollTop = tDisplay.scrollHeight;
		buttonDisable();
	}
	else if ((tInputText === 'take water' && traceLocation === 4) || (tInputText === 'take sundial' && traceLocation === 1) || (tInputText === 'take coin'  && traceLocation === 3) || (tInputText === 'take shovel'  && traceLocation === 6) || (tInputText === 'take aqua gem'  && traceLocation === 8)){
		tDisplay.value =  tDisplay.value + "\n>>>The " + Locations[traceLocation].item.itemName  + " was taken.\n";  
		inventory.push(Locations[traceLocation].item.itemName);
		tDisplay.scrollTop = tDisplay.scrollHeight;
		buttonDisable();
	}
	else if (tInputText === 'h'){
		tDisplay.value = tDisplay.value + "\nTo play this game, navigate through the locations using the text box underneath this one or the directional buttons. Text box commands include 'n' to go north, 'e' for east, 's' for south, and 'w' for west. 'i' accesses your current inventory of items, and 'h' displays this help at any time. Click CONFIRM or press the Enter key to confirm a command once you've typed it. Have fun!\n";
		tDisplay.scrollTop = tDisplay.scrollHeight;
		buttonDisable();
	}
	else if (tInputText === 'i'){
		if(!(inventory[0])){
			tDisplay.value = tDisplay.value + '\nYou have no items in your inventory yet... use the "take <item>" command to add items you find to your inventory.\n';
			tDisplay.scrollTop = tDisplay.scrollHeight;
			buttonDisable();
		}
		else{
			tDisplay.value = tDisplay.value + '\n*Inventory:' + inventory.toString(); + '\n\n';
			tDisplay.scrollTop = tDisplay.scrollHeight;
			buttonDisable();
		}
	}
	else
	{
		//If no known command was entered:
		tDisplay.value = tDisplay.value + " \nYou are asking the impossible... Type 'h' and click CONFIRM (or press Enter) for a list of valid commands.\n";
		tDisplay.scrollTop = tDisplay.scrollHeight;
		buttonDisable();
	}
}

function navigate(currentLocation, direction){

	tDisplay = document.getElementById('textDisplay');

	//Resetting the buttons.
	document.getElementById('north').disabled=false;
	document.getElementById('east').disabled=false;
	document.getElementById('south').disabled=false;
	document.getElementById('west').disabled=false;
	
	date = new Date();
	fullTime = '>' + date;

	Item0 = new Item(0);
	Item0.itemName = "Water";
	Item0.desc = "\n>>>Will you take some?\n";

	Item1 = new Item(1);
	Item1.itemName = "Sundial";
	Item1.desc = "\n>>>There's a small SUNDIAL buried here. Take it?\n";

	Item2 = new Item(2);
	Item2.itemName = "Coin";
	Item2.desc = "\n>>>By the fence is an old-looking COIN. Take it?\n";

	Item3 = new Item(3);
	Item3.itemName = "Shovel";
	Item3.desc = "\n>>>A rusty SHOVEL was found. Take it?\n";

	Item4 = new Item(4);
	Item4.itemName = "Aqua Gem";
	Item4.desc = "";


	Items = [Item0, Item1, Item2, Item3, Item4];


	Location0 = new Locale(0);
	Location0.locName = "The Salt Desert";
	Location0.desc = tDisplay.value + '\n' + fullTime + "\n>>You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.\n";
	Location0.item = "undefined";


	Location1 = new Locale(1);
	Location1.locName ="North Salt Desert";
	Location1.desc = tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...\n";
	Location1.item = Items[1];
 

	Location2 = new Locale(2);
	Location2.locName = "East Salt Desert";
	Location2.desc = tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.\n";
	Location2.item = "undefined";
 

	Location3 = new Locale(3);
	Location3.locName = "Tylavian Border";
	Location3.desc = tDisplay.value +  '\n' + fullTime +  "\n>>A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + " impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" + " you are able to read.\n";
	Location3.item = Items[2];


	Location4 = new Locale(4);
	Location4.locName = "Stone Oasis";
	Location4.desc = tDisplay.value +  '\n' + fullTime +  "\n>>THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several" + " small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + " provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's WATER!\n";
	Location4.item = Items[0];


	Location5 = new Locale(5);
	Location5.locName = "Salt Cliff";
	Location5.desc = tDisplay.value +  '\n' + fullTime +  "\n>>SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," + " an expanse of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" + " clearly visible from up here. A southerly path seems to lead down the cliff.\n";
	Location5.item = "undefined";


	Location6 = new Locale(6);
	Location6.locName = "Cliff Path";
	Location6.desc = tDisplay.value +  '\n' + fullTime +  "\n>>The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.\n";
	Location6.item = Items[3];


	Location7 = new Locale(7);
	Location7.locName = "Badlands";
	Location7.desc = tDisplay.value +  '\n' + fullTime +  "\n>>You've reached the badlands. You hear the sound of drilling in the distance.\n";
	Location7.item = "undefined";


	Location8 = new Locale(8);
	Location8.locName = "Aqua Cave";
	Location8.desc = tDisplay.value +  '\n' + fullTime +  "\n>>Within the cave, you find one AQUA GEM! Congratulations! You've won this game.";
	Location8.item = Items[4];


	Locations = [Location0, Location1, Location2, Location3, Location4, Location5, Location6, Location7, Location8];


	
	//Direction list
	
	switch (direction){
		case "n":
			dir = 0;
			break;
		case "e":
			dir = 1;
			break;
		case "s":
			dir = 2;
			break;
		case "w":
			dir = 3;
			break;
		default:
			dir = 4; //not a valid direction
			break;
	}
	
	traceDir = dir;
	
	//Mapping
	//Two-dimensional array outputs next location based on direction, of the form:
	//map array order = locations array order, e.g. map[0] = cases for Locations[0].
	//cases for [n, e, s, w]
	map = [
	[1, 2, 3, 4],
	[-1, -1, 0, 7],
	[-1, 5, -1, 0],
	[0, -1, -1, -1],
	[7, 0, -1, -1],
	[-1, -1, 6, 2],
	[5, -1, -1, 8],
	[-1, 1, 4, -1],
	[-1, 6, -1, -1]
	];
	
	currentLocation = Locations[map[currentLocation][dir]].id;
	var itemCheck = inventory.indexOf(Locations[currentLocation].item.itemName);

	if(Locations[currentLocation].item === 'undefined' || (Locations[currentLocation].item !== 'undefined' && itemCheck !== -1)){
		updateDisplay = Locations[currentLocation].desc;
		tDisplay.value = updateDisplay;
		tDisplay.scrollTop = tDisplay.scrollHeight;
	}
		
	else if (Locations[currentLocation].item !== 'undefined' && itemCheck === -1){
		updateDisplay = Locations[currentLocation].desc;
		updateItem = Items[Locations[currentLocation].item.id].desc;
		tDisplay.value = updateDisplay + updateItem;
		tDisplay.scrollTop = tDisplay.scrollHeight;
	}
	
	traceLocation = currentLocation;
	var locationCheck = visitedLocations.indexOf(Locations[currentLocation].locName);
	
	if (locationCheck === -1){
	document.getElementById('score').innerHTML = parseFloat(document.getElementById('score').innerHTML) + 5;
	}
	
	visitedLocations.push(Locations[currentLocation].locName);

	if(currentLocation === 8){
		finalHours=date.getHours();
		finalMinutes=date.getMinutes();
		finalSeconds=date.getSeconds();
		hours=finalHours - startingHours;
		minutes=Math.abs(finalMinutes - startingMinutes);
		seconds=Math.abs(finalSeconds - startingSeconds);
		tDisplay.value = tDisplay.value + ' Assuming you didn\'t play for longer than a day (I hope not), your time was: ' + hours + ' hour(s), ' + minutes + ' minute(s), and  ' + seconds + ' second(s). Refresh the page to play again!' ;
		tDisplay.scrollTop = tDisplay.scrollHeight;
		document.getElementById('textInput').disabled = true;
		document.getElementById('north').disabled = true;
		document.getElementById('east').disabled = true;
		document.getElementById('south').disabled = true;
		document.getElementById('west').disabled = true;
		document.getElementById('confirmButton').disabled = true;
	}	
	buttonDisable();
}

function buttonDisable(){
	if(map[traceLocation][0] === -1){
		document.getElementById('north').disabled = true;
	}	

	if(map[traceLocation][1] === -1){
		document.getElementById('east').disabled = true;
	}	

	if(map[traceLocation][2] === -1){
		document.getElementById('south').disabled = true;
	}	

	if(map[traceLocation][3] === -1){
		document.getElementById('west').disabled = true;
	}	
}
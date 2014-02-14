//Global vars
map = [];
inventory = [];
Locations = [];
Items = [];
traceLocation = 0;
traceDir = 0;
tDisplay = document.getElementById('textDisplay');
tInputText = document.getElementById('textInput').value.toLowerCase();
commandDisplay = '\n<' + tInputText + '\n>';

Item0 = {
id:0,
itemName:"Water",
desc:"\n>>>Will you take some?\n",
};
Item1 = {
id:1,
itemName:"Small Sundial",
desc:"\n>>>There's a small SUNDIAL buried here. Take it?\n",
};
Item2 = {
id:2,
itemName:"Coin",
desc:"\n>>>By the fence is an old-looking COIN. Take it?\n",
};
Item3 = {
id:3,
itemName:"Shovel",
desc:"\n>>>A rusty SHOVEL was found. Take it?\n",
};
Item4 = {
id:4,
itemName:"Aqua Gem",
desc:"",
};


Items = [Item0, Item1, Item2, Item3, Item4];

Location0 = {
id:0, 
locName:"The Salt Desert",
desc:tDisplay.value + '\n' + fullTime + "\n>>You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.\n",
item:"undefined", 
visited:false, 
};
Location1 = {
id:1, 
locName:"North Salt Desert",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...\n",
item:Items[1], 
visited:false, 
};
Location2 = {
id:2, 
locName:"South Salt Desert",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.\n",
item:"undefined", 
visited:false, 
};
Location3 = {
id:3, 
locName:"Tylavian Border",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + " impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" + " you are able to read.\n",
item:Items[2], 
visited:false, 
};
Location4 = {
id:4, 
locName:"Stone Oasis",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several" + " small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + " provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's WATER!\n",
item:Items[0], 
visited:false, 
};
Location5 = {
id:5, 
locName:"Salt Cliff",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," + " an expansive of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" + " clearly visible from up here. A southerly path seems to lead down the cliff.\n",
item:"undefined", 
visited:false, 
};
Location6 = {
id:6, 
locName:"Cliff Path",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.\n",
item:Items[3], 
visited:false, 
};
Location7 = {
id:7, 
locName:"Badlands",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>You've reached the badlands. You hear the sound of drilling in the distance.\n",
item:"undefined", 
visited:false, 
};
Location8 = {
id:8, 
locName:"Aqua Cave",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>Within the cave, you find one AQUA GEM! Congratulations! You've won this game.",
item:Items[4], 
visited:false, 
};

Locations = [Location0, Location1, Location2, Location3, Location4, Location5, Location6, Location7, Location8];


function welcome(){
date = new Date();
var tDisplay = document.getElementById('textDisplay');
tDisplay.value="Welcome to Fossilized 1.0. Type 'h' for help and a list of commands.\n";
navigate(1, 's');
startingHours=date.getHours();
startingMinutes=date.getMinutes();
startingSeconds=date.getSeconds();
}

function enterConfirm(){
if (event.keyCode == 13) {
document.getElementById('confirmButton').click()
document.getElementById('textInput').value=""
}
}

function chooseCommands(buttondir){
document.getElementById('north').disabled=false;
document.getElementById('east').disabled=false;
document.getElementById('south').disabled=false;
document.getElementById('west').disabled=false;
tInputText = document.getElementById('textInput').value.toLowerCase();
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
	}
	else if ((tInputText === 'take water' && traceLocation === 4) || (tInputText === 'take sundial' && traceLocation === 1) || (tInputText === 'take coin'  && traceLocation === 3) || (tInputText === 'take shovel'  && traceLocation === 6) || (tInputText === 'take aqua gem'  && traceLocation === 8)){
	tDisplay.value =  tDisplay.value + "\n>>>The " + Locations[traceLocation].item.itemName  + " was taken.\n";  
	inventory.push(Locations[traceLocation].item.itemName);
	}
	else if (tInputText === 'h'){
	tDisplay.value = tDisplay.value + "\nTo play this game, navigate through the locations using the text box underneath this one or the directional buttons. Text box commands include 'n' to go north, 'e' for east, 's' for south, and 'w' for west. 'i' accesses your current inventory of items, and 'h' displays this help at any time. Click CONFIRM or press the Enter key to confirm a command once you've typed it. Have fun!\n";
	}
	else if (tInputText === 'i'){
		if(inventory === []){
		tDisplay.value = tDisplay.value + '\nYou have no items in your inventory yet... use the "take <item>" command to add items you find to your inventory.\n';
		}
		else{
		tDisplay.value = tDisplay.value + '\n*Inventory:' + inventory.toString(); + '}\n';
		}
	}
	else
	{
	tDisplay.value = tDisplay.value + " \nYou are asking the impossible... Type 'h' and click CONFIRM (or press Enter) for a list of valid commands.\n";
	}
}

function navigate(currentLocation, direction){

tDisplay = document.getElementById('textDisplay');
tDisplay.scrollTop = tDisplay.scrollHeight;

date = new Date();
fullTime = '>' + date;

var Item0 = {
id:0,
itemName:"Water",
desc:"\n>>>Will you take some?\n",
};
var Item1 = {
id:1,
itemName:"Small Sundial",
desc:"\n>>>There's a small SUNDIAL buried here. Take it?\n",
};
var Item2 = {
id:2,
itemName:"Coin",
desc:"\n>>>By the fence is an old-looking COIN. Take it?\n",
};
var Item3 = {
id:3,
itemName:"Shovel",
desc:"\n>>>A rusty SHOVEL was found. Take it?\n",
};
var Item4 = {
id:4,
itemName:"Aqua Gem",
desc:"",
};


Items = [Item0, Item1, Item2, Item3, Item4];

Location0 = {
id:0, 
locName:"The Salt Desert",
desc:tDisplay.value + '\n' + fullTime + "\n>>You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.\n",
item:"undefined", 
visited:false, 
};
Location1 = {
id:1, 
locName:"North Salt Desert",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...\n",
item:Items[1], 
visited:false, 
};
Location2 = {
id:2, 
locName:"South Salt Desert",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.\n",
item:"undefined", 
visited:false, 
};
Location3 = {
id:3, 
locName:"Tylavian Border",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + " impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" + " you are able to read.\n",
item:Items[2], 
visited:false, 
};
Location4 = {
id:4, 
locName:"Stone Oasis",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several" + " small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + " provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's WATER!\n",
item:Items[0], 
visited:false, 
};
Location5 = {
id:5, 
locName:"Salt Cliff",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," + " an expansive of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" + " clearly visible from up here. A southerly path seems to lead down the cliff.\n",
item:"undefined", 
visited:false, 
};
Location6 = {
id:6, 
locName:"Cliff Path",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.\n",
item:Items[3], 
visited:false, 
};
Location7 = {
id:7, 
locName:"Badlands",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>You've reached the badlands. You hear the sound of drilling in the distance.\n",
item:"undefined", 
visited:false, 
};
Location8 = {
id:8, 
locName:"Aqua Cave",
desc:tDisplay.value +  '\n' + fullTime +  "\n>>Within the cave, you find one AQUA GEM! Congratulations! You've won this game.",
item:Items[4], 
visited:false, 
};

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
	

	//tDisplay.scrollTop = tDisplay.scrollHeight;
	
	
	currentLocation = Locations[map[currentLocation][dir]].id;

	if(Locations[currentLocation].item === 'undefined'){
	updateDisplay = Locations[currentLocation].desc;
	tDisplay.value = updateDisplay;
	}
		
	else if (Locations[currentLocation].item !== 'undefined'){
	updateDisplay = Locations[currentLocation].desc;
	updateItem = Items[Locations[currentLocation].item.id].desc;
	tDisplay.value = updateDisplay + updateItem;
	}
	
	
	traceLocation = currentLocation;

	
if (Locations[currentLocation].visited === false){
document.getElementById('score').innerHTML = parseFloat(document.getElementById('score').innerHTML) + 5;
Locations[currentLocation] = {visited:true,};
}
//should score be global instead? maybe not. it's probably the object syntax resetting it. make a constructor and the problem should be fixed.
if(currentLocation === 8){
finalHours=date.getHours();
finalMinutes=date.getMinutes();
finalSeconds=date.getSeconds();
hours=finalHours - startingHours;
minutes=finalMinutes - startingMinutes;
seconds=finalSeconds - startingSeconds;
tDisplay.value = tDisplay.value + ' Assuming you didn\'t play for longer than a day (I hope not), your time was: ' + hours + ' hour(s), ' + minutes + ' minute(s), and  ' + seconds + ' second(s). Refresh the page to play again!' ;
document.getElementById('textInput').disabled = true;
document.getElementById('north').disabled = true;
document.getElementById('east').disabled = true;
document.getElementById('south').disabled = true;
document.getElementById('west').disabled = true;
document.getElementById('confirmButton').disabled = true;
}
	
if(map[currentLocation][0] === -1){
document.getElementById('north').disabled = true;
}	

if(map[currentLocation][1] === -1){
document.getElementById('east').disabled = true;
}	

if(map[currentLocation][2] === -1){
document.getElementById('south').disabled = true;
}	

if(map[currentLocation][3] === -1){
document.getElementById('west').disabled = true;
}	
	
}


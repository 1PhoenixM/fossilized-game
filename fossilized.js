//Global vars
//locations = [];
map = [];
inventory = [];
traceLocation = 0;

function enterConfirm(){
if (event.keyCode == 13) {
document.getElementById('confirmButton').click()
document.getElementById('textInput').value=""
}
}

function chooseCommands(buttondir){
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
	tDisplay.value =  "The " + "Item.itemName"+ " was taken.";
	}
	else
	{
	tDisplay.value = tDisplay.value + "You are asking the impossible...";
	}
}

function navigate(currentLocation, direction){
	
tDisplay = document.getElementById('textDisplay');

	//Location List
	//locations[0] = "You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.";
	//locations[1] = "An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...";
	//locations[2] = "An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.";
	//locations[3] = "A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + 
							//" impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" +
							//" you are able to read.";
	//locations[4] = "THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several"  +  
							//" small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + 
							//" provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's water.";				
	//locations[5] = "SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," +
							//" an expansive of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" +
							//" clearly visible from up here. A southerly path seems to lead down the cliff.";
	//locations[6] = "The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.";
	//locations[7] = "You are getting close to heat exhaustion. In the distance, there's something on the horizon, but it could be just a mirage.";
	//locations[8] = "Within the cave, you find one Aqua Gem! Congratulations! You've won this game.";
	//mention aqua gem earlier when water taken
	
var Location0 = {
id:0, 
locName:"The Salt Desert",
desc:"You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.",
item:"undefined", 
visited:false, 
};
var Location1 = {
id:1, 
locName:"North Salt Desert",
desc:"An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...",
item:"Item1", 
visited:false, 
};
var Location2 = {
id:2, 
locName:"South Salt Desert",
desc:"An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.",
item:"undefined", 
visited:false, 
};
var Location3 = {
id:3, 
locName:"Tylavian Border",
desc:"A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + " impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" + " you are able to read.",
item:"Item2", 
visited:false, 
};
var Location4 = {
id:4, 
locName:"Stone Oasis",
desc:"THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several" + " small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + " provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's water.",
item:"Item0", 
visited:false, 
};
var Location5 = {
id:5, 
locName:"Salt Cliff",
desc:"SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," + " an expansive of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" + " clearly visible from up here. A southerly path seems to lead down the cliff.",
item:"undefined", 
visited:false, 
};
var Location6 = {
id:6, 
locName:"Cliff Path",
desc:"The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.",
item:"Item3", 
visited:false, 
};
var Location7 = {
id:7, 
locName:"Badlands",
desc:"You are getting close to heat exhaustion. In the distance, there's something on the horizon, but it could be just a mirage.",
item:"undefined", 
visited:false, 
};
var Location8 = {
id:8, 
locName:"Aqua Cave",
desc:"Within the cave, you find one Aqua Gem! Congratulations! You've won this game.",
item:"Item4", 
visited:false, 
};
var Item0 = {
id:0,
itemName:"Water",
desc:"Will you take some?",
};
var Item1 = {
id:1,
itemName:"Small Sundial",
desc:"There's a small sundial buried here. Take it?",
};
var Item2 = {
id:2,
itemName:"Coin",
desc:"By the fence is an old-looking coin. Take it?",
};
var Item3 = {
id:3,
itemName:"Shovel",
desc:"A rusty shovel was found. Take it?",
};
var Item4 = {
id:4,
itemName:"Aqua Gem",
desc:"",
};

Locations = [Location0, Location1, Location2, Location3, Location4, Location5, Location6, Location7, Location8];

Items = [Item0, Item1, Item2, Item3, Item4];
	
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
	
	//Mapping
	//Two-dimensional array outputs next location based on direction, of the form:
	//map array order = locations array order, e.g. map[0] = cases for Locations[0].
	//cases for [n, e, s, w]
	map = [
	[1, 2, 3, 4],
	[-1, -1, 0, 7],
	[-1, 5, -1, 0],
	[0, -1, -1, -1],
	[7, 1, -1, -1],
	[-1, -1, 6, 2],
	[5, -1, -1, 8],
	[-1, 1, 4, -1],
	[-1, 6, -1, -1]];
	
	currentLocation = Locations[map[currentLocation][dir]].id;
	updateDisplay = Locations[currentLocation].desc;
	tDisplay.value = updateDisplay;
	traceLocation = currentLocation;
	
if (Locations[currentLocation].visited === false){
document.getElementById('score').innerHTML = parseFloat(document.getElementById('score').innerHTML) + 5;
Locations[currentLocation] = {visited:true,};
}
	
}

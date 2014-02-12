//Global vars
locations = [];
map = [];
inventory = [];
//locid = 0;


function chooseCommands(buttondir){
tInput = document.getElementById('textInput').value.toLowerCase();
tInput = buttondir;
	if (buttondir !== 'n' || buttondir !== 'e' || buttondir !== 'w' || buttondir !== 's'){
	doStuff();
	}
	navigate(0, buttondir);
}

function doStuff(){
tDisplay = document.getElementById('textDisplay');
tInput = document.getElementById('textInput').value.toLowerCase();
	if (tInput === 'take'){
	tDisplay.value =  "The " + "item.name"+ " was taken.";
	}
	else
	{
	tDisplay.value = tDisplay.value + "You are asking the impossible...";
	}
}

function navigate(currentLocation, direction){
	
tDisplay = document.getElementById('textDisplay');

	//Location List
	locations[0] = "You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.";
	locations[1] = "An hour's hike has led you no closer to civilization. The Salt Desert stretches in all directions...";
	locations[2] = "An hour's hike shows no difference in the horizon, but as you go, the ground becomes more and more uneven.";
	locations[3] = "A fifteen-minute trek leads you, unceremoniously, to an impassable barbed-wire fence, too high to climb and virtually" + 
							" impenetrable. A metal sign on the fence reads 'TYLAVIAN BORDER' in three different languages, only one of which" +
							" you are able to read.";
	locations[4] = "THE STONE OASIS: That's what the sign says, anyway. This small oasis features a ring of several"  +  
							" small huts constructed entirely of gray stone, all adorned with brightly colored awnings that" + 
							" provide shade. A stone fountain is located in the center of this ring. It runs sluggishly, but hey, it's water.";				
	locations[5] = "SALT CLIFF: You are at the top of a sheer white cliff. It's a long way down, but it does give a good view of the Carbonic Valley," +
							" an expansive of dark gray sand that stretches as far as the eye can see. There is sparse human activity, but a cluster of tents is" +
							" clearly visible from up here. A southerly path seems to lead down the cliff.";
	locations[6] = "The path is rocky and treacherous. There is a small opening in the cliff, leading into some sort of dark cave.";
	locations[7] = "You are getting close to heat exhaustion. In the distance, there's something on the horizon, but it could be just a mirage.";
	locations[8] = "Within the cave, you find one Aqua Gem! Congratulations! You've won this game.";
	//mention aqua gem earlier when water taken
	
	/*var Location0 = {
'id':0, 
'name':"The Salt Desert",
'desc':"You are in the Salt Desert, with nothing but white sand in all directions. The sun is beating down from above.",
 'item', 
 'visited', 
 'toString()'};
var Item0 = {
'id':0,
 'name':"Water",
 'desc':"Will you take some?",
 'toString()'};*/
	
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
		dir = 4;
		break;
	}
	
	//Mapping
	//Two-dimensional array outputs next location based on direction, of the form:
	//map array order = locations array order, e.g. map[0] = cases for locations[0].
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
	
	currentLocation = locations[map[0][dir]];
	tDisplay.value = currentLocation;
	
}

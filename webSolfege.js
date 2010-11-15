(function(){
var BASS = "bass";
var notes = ["E","F","G","A","B","C","D","E","F"];

var ctx = Raphael("partoche", 600, 200);

function createScore(){
	var score = {};
	var pathPortee = "";
	for(var i = 5; i>0; i--){
		var currentY = i*10;
		pathPortee += " M0 "+currentY+"L600 "+currentY;
	}
	pathPortee += "M0 10L0 50";

	score.portee = ctx.path(pathPortee);
	score.clef = BASS;
	
	score.addNote = function(Note){
		switch(score.clef){
			case BASS:
				
			break;
		}
	}
	
	return score;	
}

createScore();


})();

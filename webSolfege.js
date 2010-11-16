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
	var notes = [];
	
	score.addNote = function(note){
		notes.push(note);
		var it = notes.length;
		ctx.circle(it*20, 60-note*5, 5)
/*		switch(score.clef){
			case BASS:
				
			break;
		}*/
	}
	
	return score;	
}

var score = createScore();
score.addNote(1);
score.addNote(2);
score.addNote(3);
score.addNote(4);
score.addNote(5);

})();

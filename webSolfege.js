
head.js(
   {raphael: "raphael.js"},
   {jquery:"jquery-1.4.4.min.js"}
);


head.ready(function(){
  var BASS = "bass";
  var nb2Notes = ["E","F","G","H","A","B","C","D"];
/*  var notes2nb = {
    "E":0,
    "F":1,
    "G":2,
    "A":3,
    "B":4,
    "C":5,
    "D":6,
    "E":7,
    "F":0,
    "G":1,
    "A":2,
    "B":3;
  };
  */

  var ctx = Raphael("partoche", 600, 200);
  var current = -1;

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
	
	  var valueNoteCurrent = function(){
	    return nb2Notes[notes[current].valeur%8];
	  }
	  
	  var randomValueNoteNotCurrent = function(n, valueToExclude){
	    //Return 2 values (from 0 to 7) that is different from the one given
	    if(n === 0){
	      return [];
	    }
	    
      var tab = randomValueNoteNotCurrent(n-1, valueToExclude);
      
      var t = Math.floor(Math.random()*7-n);
      
      var valToAdd = 0;
      tab.push(valToAdd);
      
      return tab;
	  }
	
	  score.addNote = function(valeurNote){
		  var note = {
			  valeur:valeurNote
		  };
		  notes.push(note);
		  var it = notes.length;
		  note.noteDrawn = ctx.circle(it*20, 60-valeurNote*5, 4).attr("fill","#000");
		  note.changeValeur = function( nouvelleValeur ){
		    note.noteDrawn.translate(0 , (valeurNote-nouvelleValeur)*5);
		    note.valeur = nouvelleValeur;
		    return note;
		  };
		  note.select = function(){
		    note.noteDrawn.attr("fill","#F00");
		    return note;
		  };
		  note.unSelect = function(){
		    note.noteDrawn.attr("fill","#000");
		    return note;
		  };
		  return score;
	  }
	
	  score.current = function(idx){
      if(idx !== undefined && typeof idx === "number"){
        for(var i = notes.length-1; i >= 0; i-- ){
	        notes[i].unSelect();
	      }
	      notes[idx].select();
	      current=idx;
	      return score;
	    }
	    return current;
	  };
	  
	  score.next = function(){
	    score.current(current+1>=notes.length?0:current+1);
	    return score;
	  };
	  
	  score.changeValeur = function(idx, valeur){
	    notes[idx-1].changeValeur(valeur);
	    return score;
	  };
	  
	  score.getQuestion = function(){
	    //Return an array of three possible answers
	    var res = [];
	    
	    valueNoteCurrent();
	    
	    
	    res.push("A");
	    res.push("B");
	    res.push(valueNoteCurrent());
	    
	    return res;
	  }
	  

	  
	  score.isAnswerRight = function(valueAnswered){
	    //return true if the value is correct depending
      return valueNoteCurrent() === valueAnswered;
	  }
	
	  return score;	
  }

  var score = createScore();
  
  function refreshAnswers(){
    var ans = score.getQuestion();
    $.each(ans, function(idx, val){
      $(".answer:nth-child("+(idx+1)+")").val(val).text(val);
    });
  }
  
  $("#start").click(function(){
    score.addNote(0).addNote(1).addNote(2).addNote(3).addNote(4)
      .addNote(5).addNote(6).addNote(7).addNote(8)
      .addNote(9).addNote(10).changeValeur(5, 2).next();
    $("#answers").show();
    $(this).hide();
    refreshAnswers();
  });
  
  $(".answer").click(function(){
    var buttonClicked = $(this);
    
    if(score.isAnswerRight(buttonClicked.val())){
      $("#goodAnswer").show(100, function(){
        $(this).hide(400);
      });
    }
    else{
      $("#badAnswer").show(100, function(){
        $(this).hide(400);
      });
    }
    
    score.next();
    refreshAnswers();
  });
});

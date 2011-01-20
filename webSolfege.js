head.js("raphael.js","jquery-1.4.4.min.js");

head.ready(function(){
  
  window.scrollTo(0,0);
  
  var NB_NOTES_SCORE=20;
  var SPACE_BTW_NOTES=30;
  var CURRENT_LANG="fr";
  
  var libelleNotesHandler = {
    langs:{"en":{"A":"A", "B":"B", "C":"C", "D":"D", "E":"E", "F":"F", "G":"G"},
      "fr":{"A":"La", "B":"Si", "C":"Do", "D":"Re", "E":"Mi", "F":"Fa", "G":"Sol"}
    },
    getTranslation: function(note){
      return libelleNotesHandler.langs[CURRENT_LANG][note];
    },
  };

  function getRand(i){
    return Math.floor(Math.random()*i);
  }

  function createScore(nbNotesInScore){
	  var score = {}, 
	    current = -1, 
	    ctx = Raphael("partoche", 600, 120),
	    nb2Notes = ["E","F","G","A","B","C","D"];
	  
	  var pathPortee = "";
	  for(var i = 5; i>0; i--){
		  var currentY = i*10;
		  pathPortee += " M0 "+currentY+"L3000 "+currentY;
	  }
	  pathPortee += "M0 10L0 50";

	  score.portee = ctx.path(pathPortee);
	  
	  var clef = ctx.set();
	  clef.push(
	  //Source wikimedia commons
	    ctx.path("M 248.25999,536.80200 C 248.26766,537.17138 248.11044,537.54065 247.82878,537.78185 C 247.46853,538.11076 246.91933,538.17813 246.47048,538.01071 C 246.02563,537.83894 245.69678,537.39883 245.67145,536.92060 C 245.63767,536.54689 245.75685,536.15479 246.02747,535.88867 C 246.28257,535.61680 246.66244,535.48397 247.03147,535.50645 C 247.41131,535.51452 247.77805,535.70601 248.00489,536.01019 C 248.17962,536.23452 248.26238,536.51954 248.25999,536.80200 z ")
	      .attr("fill", "#000").scale(1.5).translate(5,-3),
      ctx.path("M 248.25999,542.64502 C 248.26772,543.01469 248.11076,543.38446 247.82878,543.62585 C 247.46853,543.95476 246.91933,544.02213 246.47048,543.85472 C 246.02537,543.68288 245.69655,543.24237 245.67145,542.76389 C 245.63651,542.38990 245.76354,542.00308 246.02700,541.73300 C 246.27663,541.45454 246.66060,541.32790 247.02845,541.34950 C 247.51230,541.36282 247.95159,541.69251 248.15162,542.12465 C 248.22565,542.28740 248.26043,542.46657 248.25999,542.64502 z ")
        .attr("fill","#000").scale(1.5).translate(5,0),
      ctx.path("M 243.97900,540.86798 C 244.02398,543.69258 242.76360,546.43815 240.76469,548.40449 C 238.27527,550.89277 235.01791,552.47534 231.69762,553.53261 C 231.25590,553.77182 230.58970,553.45643 231.28550,553.13144 C 232.62346,552.52289 234.01319,552.00050 235.24564,551.18080 C 237.96799,549.49750 240.26523,546.84674 240.82279,543.61854 C 241.14771,541.65352 241.05724,539.60795 240.56484,537.67852 C 240.20352,536.25993 239.22033,534.79550 237.66352,534.58587 C 236.25068,534.36961 234.74885,534.85905 233.74057,535.88093 C 233.47541,536.14967 232.95916,536.89403 233.04435,537.74747 C 233.64637,537.27468 233.60528,537.32732 234.09900,537.10717 C 235.23573,536.60031 236.74349,537.32105 237.02700,538.57272 C 237.32909,539.72295 237.09551,541.18638 235.96036,541.79960 C 234.77512,542.44413 233.02612,542.17738 232.36450,540.90866 C 231.26916,538.95418 231.87147,536.28193 233.64202,534.92571 C 235.44514,533.42924 238.07609,533.37089 240.19963,534.13862 C 242.38419,534.95111 243.68629,537.21483 243.89691,539.45694 C 243.95419,539.92492 243.97896,540.39668 243.97900,540.86798 z ")
        .attr("fill","#000").scale(1.5)
	  ).translate(-220,-518);
	  
	  var notes = [];
	
	  var valueNoteCurrent = function(){
	    return nb2Notes[notes[current].valeur%7];
	  }
	  
	  var randomValueNoteNotCurrent = function(n, valueToExclude){
	    var resultat = [];
	    var copieNotes = nb2Notes.slice(0);
	    
	    for(var i = copieNotes.length-1; i>=0; i--){
	      if(copieNotes[i]===valueToExclude){
	        resultat.push(copieNotes[i]);
          copieNotes.splice(i,1);
          break;
	      }
	    }
      
      for (var i = n; i >0; i-- ){
        indiceNote = getRand(copieNotes.length);
        resultat.push(copieNotes[indiceNote]);
        copieNotes.splice(indiceNote,1);
      }
      
      for (var i = getRand(resultat.length); i > 0; i--){
        resultat.push(resultat.shift());
      }
      
      return resultat;
	  }
	
	  score.addNote = function(valeurNote){
		  var note = {
			  valeur:valeurNote,
			  hidden:true
		  };
		  notes.push(note);
		  var it = notes.length;
		  note.noteDrawn = ctx.set();
		  var isUp = (valeurNote>6);
		  var X = it*SPACE_BTW_NOTES;
		  var queueNote = ctx.path("M"+(X+34)+" "+(60-valeurNote*5)+"L"+(X+34)+" "+(60-valeurNote*5+(22*(isUp?1:-1))));
		  note.noteDrawn.push(
		    ctx.circle(X+30, 60-valeurNote*5, 4),
		    queueNote
		  ).attr("fill","#000").attr("stroke","#000");
		  
		  var labelNote = ctx.text(X+30, 80, libelleNotesHandler.getTranslation(nb2Notes[valeurNote%7]));
		  
		  note.changeValeur = function( nouvelleValeur ){
		    if(isUp && nouvelleValeur<=6){
		      queueNote.translate(0,-22);
		    }
		    else {
		      if(!isUp && nouvelleValeur>6){
		        queueNote.translate(0,22);
		      }
		    }
		    isUp = nouvelleValeur>6;
		    note.noteDrawn.translate(0 , (note.valeur-nouvelleValeur)*5);
		    note.valeur = nouvelleValeur;
		    labelNote.attr("text",libelleNotesHandler.getTranslation(nb2Notes[nouvelleValeur%7]));
		    note.isLabelHidden(true);
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
		  note.changeLabelColor = function(color){
		    labelNote.attr("fill", color);
		  }
		  note.resetLabel = function(){
		    labelNote.attr("fill","#000");
		    note.isLabelHidden(flase);
		  }
		  note.isLabelHidden = function(valueSetter){
		    if(typeof valueSetter === "boolean" ){
		      if(valueSetter){
		        labelNote.hide();
		      }
		      else {
		        labelNote.show();
		      }
		      note.hidden = valueSetter;
		      return note;
		    }
		    return note.hidden;
		  }
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
	    return notes[current];
	  };
	  
	  score.next = function(){
	    score.current(current+1>=notes.length?0:current+1);
	    return score;
	  };
	  
	  score.changeValeur = function(idx, valeur){
	    notes[idx].changeValeur(valeur);
	    return score;
	  };
	  
	  score.getQuestion = function(){
	    //Return an array of three possible answers
      var res = randomValueNoteNotCurrent(2, valueNoteCurrent());
	    return res;
	  }
	  
	  score.isAnswerRight = function(valueAnswered){
	    //return true if the value is correct depending
      return valueNoteCurrent() === valueAnswered;
	  }
	  
	  score.getLibelle4Note = function(note){
	    return libelleNotesHandler.getTranslation(note);
	  }
	  
	  score.hasNext = function(){
	    return current+1<notes.length;
	  }
	  
	  for(var i = nbNotesInScore; i>0; i--){
	    score.addNote(getRand(11));
	  }
	
	  return score;	
  }

  var score = createScore(NB_NOTES_SCORE);
  
  var points = 0;
  
  function refreshAnswers(){
    var ans = score.getQuestion();
    $.each(ans, function(idx, val){
      $(".answer:nth-child("+(idx+1)+")").val(val).text(score.getLibelle4Note(val));
    });
  }
  
  $("#start").click(function(){
    $("#intro").fadeOut(400);
  
    for(var i=NB_NOTES_SCORE-1; i>-1; i--){
      score.changeValeur(i, getRand(11));
    }
    score.next();
    points = 0;
    $("#answers").show();
    $("#partochePanel").show();
    $("#pointPanel").hide();
    $(this).hide();
    refreshAnswers();
  });
  
  $(".answer").click(function(){
    var buttonClicked = $(this);
    
    var lastNote = score.current().isLabelHidden(false);
    if(score.isAnswerRight(buttonClicked.val())){
      lastNote.changeLabelColor("#0F0");
      $("#goodAnswer").fadeIn(100, function(){
        $(this).fadeOut(400);
        points++;
      });
    }
    else{
      lastNote.changeLabelColor("#F00");
      $("#badAnswer").fadeIn(100, function(){
        $(this).fadeOut(400);
      });
    }
    
    if(!score.hasNext()){
      var panelPoint = $("#pointPanel");
      panelPoint.find("#points").text(points);
      panelPoint.find("#scoreWidth").text(NB_NOTES_SCORE);
      $("#answers").hide();
      $("#partochePanel").hide();
      panelPoint.show();
      $("#start").show();
    }else{
      score.next();
      refreshAnswers();
    }
    
    
  });
});

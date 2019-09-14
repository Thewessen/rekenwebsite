var GlobalVar =	{
	subject: "",
	niveau: 1,
	niveaus: [1,2,3,4,5,6],
	i: 1,
	wrong: 0,
	respons1: "",
	respons2: "",
	primes: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,97,101],
	a: [],
	b: [],
	c: [],
	d: [],
	e: [],
	f: [],
	getNiveaus: function()	{
		this.niveaus = [];
		for(var prop in Oefening) {
			if(!Oefening.hasOwnProperty(prop)) continue;
			this.niveaus.push(Oefening[prop]["niveau"]);
		};
	},
	setNiveaus: function()	{
		var i = 0;
		for(var prop in Oefening) {
			if(!Oefening.hasOwnProperty(prop)) continue;
			Oefening[prop]["niveau"] = this.niveaus[i];
			i++;
		};
	},
	responsreset:	function()	{
		this.respons1 = "";
		this.respons2 = "";
	},
	reset: function()	{
		this.i = 1;
		this.wrong = 0;
		this.respons1 = "";
		this.respons2 = "";
		this.a = [];
		this.b = [];
		this.c = [];
		this.d = [];
		this.e = [];
		this.f = [];
	}
};

function PushGetallen(getallen) {
	var globalvars = ['a','b','c','d','e','f'];
	for(g=0;(g<globalvars.length)&&(g<getallen.length);g++) {
		GlobalVar[globalvars[g]].push(getallen[g]);
	};
};

function FillDots(respons,antwoord) {
	var dots = respons;
	for(i=0;i<antwoord.toString().length-respons.toString().length;i++) {
		dots += ".";
	};
	return dots; 
};

function RandomInt(a,b)	{
	return Math.floor((Math.random() * (b-a)) + a);
};

function SameExercise(getallen)	{
	for(i=0;i<GlobalVar.a.length;i++)	{ 
		if ((getallen[0] === GlobalVar.a[i])&&(getallen[1] === GlobalVar.b[i])&&(getallen[2] === GlobalVar.c[i])&&(getallen[3] === GlobalVar.d[i])&&(getallen[4] === GlobalVar.e[i])&&(getallen[5] === GlobalVar.f[i])) {
			return true;
		};
	};
	return false;
};

function Intro(onderwerp)	{
	GlobalVar.subject = onderwerp;
	var niveaus = Oefening[GlobalVar.subject].settings.length;
	var text = "<p>Deze oefening bestaat uit " + niveaus + " niveaus. De niveaus lopen op in moeilijkheidsgraad.</p><ul>";
	for(i=1;i<niveaus+1;i++)	{
		text += "<li>Niveau " + i + ": " + Oefening[GlobalVar.subject]["niveau" + i] + "</li>";
	};
	text += "</ul>";
	$("#Uitleg").html(text);
	$("#start").show();
};

function AddNiveaus()	{
	$("#niveaus").html("");
	for(i=1;i<Oefening[GlobalVar.subject].settings.length+1;i++)	{
		$("#niveaus").append("<span id='niveau" + i + "'>&#9734;</span>");
		$("#niveau" + GlobalVar.niveau).addClass("current");
	};
};

function AddQuestions() {
	GlobalVar.reset();
	$("#Uitleg").html(Oefening[GlobalVar.subject].uitleg());
	for(GlobalVar.i=1;GlobalVar.i<6;GlobalVar.i++)	{
		if(GlobalVar.subject=="doorelkaar")	{
			var niveau = GlobalVar.niveau;
			var subject = GlobalVar.subject;
			var a = Oefening[GlobalVar.subject].settings[GlobalVar.niveau-1].length;
			GlobalVar.niveau = Oefening[subject].settings[niveau-1][0]; 
			GlobalVar.subject = Oefening[subject].settings[niveau-1][RandomInt(1,a)]; 
		};
		Oefening[GlobalVar.subject].getallen();
		$("#Questions").append("<div id='Question" + GlobalVar.i + "' class='question'>" + Oefening[GlobalVar.subject].vraag() + "</div>");
		$("#Question" + GlobalVar.i).hide();
		if(subject=="doorelkaar")	{
			GlobalVar.niveau = niveau;
			GlobalVar.subject = subject;
		};
	};
	GlobalVar.i = 1;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	NextQuestion();
};

function NextQuestion()	{
	GlobalVar.responsreset();
	$("#Question" + GlobalVar.i).show();
	if(GlobalVar.subject=="tellernoemer") { 
		Oefening['tellernoemer'].antwoord(); 
		$("#Invul").show();
	};
};

function UserInput(x)	{
	if (GlobalVar.respons1.toString().length!=GlobalVar.e[GlobalVar.i-1].toString().length)	{
		if	(isNaN(x))	{
			GlobalVar.respons1 += x;
		} else	{
			GlobalVar.respons1 = GlobalVar.respons1.toString() + x;
		};
		$("#Answer" + GlobalVar.i).html(Oefening[GlobalVar.subject].antwoord());
		$("#AnswerFrac" + GlobalVar.i).html(Oefening[GlobalVar.subject].antwoord());
		if (GlobalVar.respons1.toString().length==GlobalVar.e[GlobalVar.i-1].toString().length)	{
			$("#Answer" + GlobalVar.i).removeClass("box");
			$("#Answer" + GlobalVar.i + "b").addClass("box");
		};
	} else if	(GlobalVar.respons2.toString().length!=GlobalVar.f[GlobalVar.i-1].toString().length)	{
		if	(isNaN(x))	{
			GlobalVar.respons2 += x;
		} else	{
			GlobalVar.respons2 = GlobalVar.respons2.toString() + x;
		};
		$("#Answer" + GlobalVar.i + "b").html(Oefening[GlobalVar.subject].antwoord());
		$("#AnswerFrac" + GlobalVar.i).html(Oefening[GlobalVar.subject].antwoord());
	} else {
		$("#Answer" + GlobalVar.i + "b").removeClass("box");
	};
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	if	((GlobalVar.respons2.toString().length==GlobalVar.f[GlobalVar.i-1].toString().length)&&(GlobalVar.respons1.toString().length==GlobalVar.e[GlobalVar.i-1].toString().length))	{
		Validate();
	};
};

function Validate()	{
	$("#Answer" + GlobalVar.i).removeClass("box");
	$("#Answer" + GlobalVar.i + "b").removeClass("box");
	if(GlobalVar.respons1==""&&GlobalVar.respons2=="")	{
		for(i=1;i<GlobalVar.i;i++)	{ $("#Question" + i).hide(); };
		$("#Question" + GlobalVar.i).append(" <img class='check' src='../icons/question.png' alt='Voorbeeld'>");
		$("#Voorbeeld").append(Oefening[GlobalVar.subject].voorbeeld());
		$("#ok").show(); 
		GlobalVar.wrong++;
	} else if(Oefening[GlobalVar.subject].check())	{
		$("#Question" + GlobalVar.i).append(" <img class='check' src='../icons/correct.png' alt='Goed!'>");
	} else	{
		$("#Question" + GlobalVar.i).append(" <img class='check' src='../icons/wrong.png' alt='Fout!'>");
		$("#Question" + GlobalVar.i).append(" <span class='text antwoord'>Het juiste antwoord is " + Oefening[GlobalVar.subject].correctie() + "</span>");
		GlobalVar.wrong++;
	};
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	switch(true)	{
		case (GlobalVar.wrong>1):
			$("#Questions").append("<span class='text'><p>Je hebt meer dan 1 fout antwoord. Begin opnieuw...</p></span>");
			$("#ok").show(); 
			break;
		case (GlobalVar.i-GlobalVar.wrong==4):
			if(GlobalVar.niveau == Oefening[GlobalVar.subject].settings.length)	{
				$("#Questions").append("<img class='verylarge greatjob' src='../icons/greatjob.png'>");
				$("#Questions").append("<span class='text'><p>Je hebt het hoogste niveau voltooid!</p></span>" );
			} else	{
//				$("#niveau" + GlobalVar.niveau).removeClass('current');
				GlobalVar.niveau++;
				$("#niveau" + GlobalVar.niveau).addClass('current');
				$("#Questions").append("<img class='verylarge greatjob' src='../icons/greatjob.png'>");
				$("#Questions").append("<span class='text'><p>Je zit nu op niveau " + GlobalVar.niveau + ".</p></span>");
				$("#ok").show(); 
			};
			break;
		case (GlobalVar.respons1==""&&GlobalVar.respons2==""):
			break;
		default:
			GlobalVar.i++;
			NextQuestion();
			return;
	};
	$("#Invul").hide();
	$("#buttons").hide();
};
		
function OK()	{
	$("#buttons").show();
	$("#ok").hide();
	$("#Voorbeeld").empty();
	var diff = GlobalVar.i - GlobalVar.wrong;
	if((GlobalVar.wrong==1)&&(GlobalVar.i-GlobalVar.wrong!=4)) {
		$("#Question" + GlobalVar.i).append(" <span class='text antwoord'>Het juiste antwoord is " + Oefening[GlobalVar.subject].correctie() + "</span>");
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		for(i=1;i<GlobalVar.i;i++)	{ $("#Question" + i).show(); };
		GlobalVar.i++;
		NextQuestion();
	} else {
		$("#Questions").empty();
		AddQuestions(GlobalVar.subject);
	};
};

function Wissen()	{
	GlobalVar.responsreset();
	$("#Answer" + GlobalVar.i).html(Oefening[GlobalVar.subject].antwoord());
	$("#Answer" + GlobalVar.i + "b").html(FillDots("",GlobalVar.f[GlobalVar.i-1]));
	$("#Answer" + GlobalVar.i).addClass("box");
	$("#Answer" + GlobalVar.i + "b").removeClass("box");
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
};

function Start()	{
	AddNiveaus();
	AddQuestions();
	$("#start").hide();
	$("#buttons").show();
};

var Oefening = {
	tellernoemer:	{
		uitleg:	function()	{
			return "Vul de teller en de noemer in van de onderstaande breuk.";
		},
		vraag:	function()	{
			return 	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]);
		},
		check:	function()	{
			if ((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1]) && (GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1]))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[10,10,0,""],[99,99,0,""]],
		niveau: 1,
		niveau1: "Getallen tot 10.",
		niveau2: "Getallen tot 100.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				getallen.push(getallen[0]);
				getallen.push(getallen[1]);
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var teller = "De teller is het <strong>bovenste getal</strong> van de breuk.";
			var noemer = "De noemer is het <strong>onderste getal</strong> van de breuk.";
			return "<p>" + teller + "</p>" + "<p>" + noemer + "</p>" + "<p>" + this.correctie() + ".</p>"; 
		},
		antwoord: function()	{
			if (GlobalVar.respons1=="")	{
				$("#Invul").html("<p>De teller is <span class='input box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span> en de noemer is <span class='input'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span></p>");
			} else if (GlobalVar.respons1.toString().length==GlobalVar.e[GlobalVar.i-1].toString().length) {
				$("#Invul").html("<p>De teller is <span class='input'>" + GlobalVar.respons1 + "</span> en de noemer is <span class='input box'>" + FillDots(GlobalVar.respons2,GlobalVar.e[GlobalVar.i-1]) + "</span></p>");
			} else if (GlobalVar.respons2=="")	{
				$("#Invul").html("<p>De teller is <span class='input box'>" + FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]) + "</span> en de noemer is <span class='input'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span></p>");
			} else {
				$("#Invul").html("<p>De teller is <span class='input'>" + GlobalVar.respons1 + "</span> en de noemer is <span class='input box'>" + FillDots(GlobalVar.respons2,GlobalVar.e[GlobalVar.i-1]) + "</span></p>");
			};
		},
		correctie: function()	{
			 return "Teller: " + GlobalVar.e[GlobalVar.i-1] + ", noemer: " + GlobalVar.f[GlobalVar.i-1];
		}
	},

	grootte:	{
		uitleg:	function()	{
			return "Vul in: groter dan (&gt;), kleiner dan (&lt;) of gelijk aan (=).";
		},
		vraag:	function()	{
			return 	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " <span id='Answer" + GlobalVar.i + "' class='input box'>.</span> " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]);
		},
		check:	function()	{
			if(GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[20,20,0,0],[10,10,5,6],[100,100,0,2]],
		niveau: 1,
		niveau1: "Teller en noemer tot 20, gelijknamige breuken.",
		niveau2: "Teller en noemer tot 10, eenvoudig ongelijknamige breuken.",
		niveau3: "Teller en noemer tot 100, ongelijknamige breuken.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				if	(getallen[0]/getallen[1]<getallen[2]/getallen[3])	{
					getallen.push("<");
				} else if (getallen[0]/getallen[1]>getallen[2]/getallen[3])	{
					getallen.push(">");
				} else	{
					getallen.push("=");
				};
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var text = "<p>" + vbGelijknamig() + "</p>";
			var oplossing = "Je vergelijkt de tellers met elkaar: "
			oplossing +=  Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + GlobalVar.e[GlobalVar.i-1] + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]);
			oplossing += ", omdat " + GlobalVar.a[GlobalVar.i-1] + " " + GlobalVar.e[GlobalVar.i-1] + " " + GlobalVar.c[GlobalVar.i-1] + ".";
			return text + "<p>" + oplossing + "</p>";
		},
		antwoord: function()	{
			if (GlobalVar.respons1=="")	{
				return "...";
			} else	{
				return GlobalVar.respons1;
			}
		},
		correctie: function()	{
			return GlobalVar.e[GlobalVar.i-1];
		}
	},

	vereenvoudigen:	{
		uitleg:	function()	{
			return "Vereenvoudig de volgende breuken <strong>zo ver mogelijk.</strong>";
		},
		vraag:	function()	{
			return	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " = " + Breuk("<span id='Answer" + GlobalVar.i + "' class='inputbreuk teller onderstreep box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span>","<span id='Answer" + GlobalVar.i + "b' class='inputbreuk'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span>");
		},
		check:	function()	{
			if ((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1]))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[10,10,10,3],[20,20,10,3],[100,100,15,3]],
		niveau: 1,
		niveau1: "Vereenvoudigen tot een breuk met noemer tot 5.",
		niveau2: "Vereenvoudigen tot een breuk met noemer tot 10",
		niveau3: "Vereenvoudigen tot een breuk met noemer tot 10, grote getallen.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				var vereenvoudigd = Vereenvoudig(getallen[0],getallen[1]);
				getallen.push(vereenvoudigd[0]);
				getallen.push(vereenvoudigd[1]);
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			return "<p>" + vbVereenvoudig(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + "</p>";
		},
		antwoord: function()	{
			if (GlobalVar.respons2.toString().length=="")	{
				return FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]);
			}	else	{
				return FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]);
			};
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	},
	gelijknamig:	{
		uitleg:	function()	{
			return "Maak de breuken gelijknamig. De breuken moeten dezelfde uitkomst geven.";
		},
		vraag:	function()	{
			return	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + "<span class='text'> is hetzelfde als </span><span id='AnswerFrac" + GlobalVar.i + "' class='input'>" + this.antwoord() + "</span>";	
			;
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[10,10,4,1],[10,10,10,1],[100,100,12,1]],
		niveau: 1,
		niveau1: "Noemer tot 10, veelvouden tot 4.",
		niveau2: "Noemer tot 10, veelvouden tot 10.",
		niveau3: "Noemer tot 40, veelvouden tot 20.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				getallen.push(getallen[2]);
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var a = GlobalVar.a[GlobalVar.i-1];
			var b = GlobalVar.b[GlobalVar.i-1];
			var c = GlobalVar.c[GlobalVar.i-1];
			var d = GlobalVar.d[GlobalVar.i-1];
			text = "<p>" + vbGelijknamig() + "</p>";
			text += "<p>" + Frac(a,b) + " is hetzelfde als " + Frac(c,d) + "</p>"
			return text;
		},
		antwoord: function()	{
			var a = "";
			if(GlobalVar.e[GlobalVar.i-1].toString().length<3) { a = "\\dots";
			} else { a = FillDots("",GlobalVar.e[GlobalVar.i-1]) };
			if (GlobalVar.respons1=="")	{
				return Frac(a,GlobalVar.d[GlobalVar.i-1]);
			} else	{
				return Frac(FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]),GlobalVar.d[GlobalVar.i-1]);
			}
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]);
		}
	},
	optellen:	{
		uitleg: 	function()	{
			var text = "Maak de breuken eerst gelijknamig voor je ze bij elkaar optelt.";
			if	(GlobalVar.niveau<3)	{
				return	text + "<br>Je hoeft de breuk nog <strong>niet</strong> te vereenvoudigen.";
			}	else	{
				return	text + "<br>Vereenvoudig de breuk daarna <strong>zo ver mogelijk</strong>.";
			};
		},
		vraag:	function()	{
			return	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " + " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Breuk("<span id='Answer" + GlobalVar.i + "' class='inputbreuk teller onderstreep box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span>","<span id='Answer" + GlobalVar.i + "b' class='inputbreuk'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span>");
		},
		check:	function()	{
			if(((GlobalVar.niveau<3)&&((GlobalVar.respons1/GlobalVar.respons2)==(GlobalVar.e[GlobalVar.i-1]/GlobalVar.f[GlobalVar.i-1])))||((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1])))	{
				return true;
			} else	{
				return false;
			};
		},
		settings: [[10,10,0,0],[100,100,0,0],[10,10,0,2],[20,20,0,2],[100,100,0,2]],
		niveau: 1,
		niveau1: "Kleine getallen, gelijknamig.",
		niveau2: "Grote getallen, gelijknamig.",
		niveau3: "Kleine getallen, ongelijknamig.",
		niveau4: "Grote getallen, ongelijknamig.",
		niveau5: "Hele grote getallen, ongelijknamig.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				if (GlobalVar.niveau<3)	{
					getallen.push(getallen[0]+getallen[2]);
					getallen.push(getallen[1]);
				} else {
					var vereenvoudigd = Vereenvoudig(getallen[0]*getallen[3] + getallen[1]*getallen[2],getallen[1]*getallen[3]);
					getallen.push(vereenvoudigd[0]);
					getallen.push(vereenvoudigd[1]);
				};
			} while(SameExercise(getallen));
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var text = "<p>" + vbGelijknamig() + "</p>";
			var vereenvoudiging = "";
			if(GlobalVar.niveau>2)	{
				vereenvoudiging = "<p>" + vbVereenvoudig(GlobalVar.a[GlobalVar.i-1] + GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + "</p>";
			};
			var oplossing = "Nu mag je de tellers bij elkaar optellen: <br>";
			oplossing += Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " + " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Frac(GlobalVar.a[GlobalVar.i-1] + " + " + GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " = " + Frac(GlobalVar.a[GlobalVar.i-1] + GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]);
			return text + "<p>" + oplossing + "</p>" + vereenvoudiging;
		},
		antwoord:	function()	{
			if (GlobalVar.respons2.toString().length=="")	{
				return FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]);
			}	else	{
				return FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]);
			};
		},
		correctie: function()	{
			 return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	},
	aftrekken:	{
		uitleg:	function()	{
			var text = "Maak de breuken eerst gelijknamig voor je ze van elkaar afhaalt.";
			if (GlobalVar.niveau<3)	{
				return text + "<br>Je hoeft de breuk nog <strong>niet</strong> te vereenvoudigen.";
			} else	{
				return text + "<br>En vereenvoudig de breuk daarna <strong>zo ver mogelijk</strong>.";
			}
		},
		vraag:	function()	{
			return	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " - " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Breuk("<span id='Answer" + GlobalVar.i + "' class='inputbreuk teller onderstreep box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span>","<span id='Answer" + GlobalVar.i + "b' class='inputbreuk'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span>");
		},
		check:	function()	{
			if(((GlobalVar.niveau<3)&&((GlobalVar.respons1/GlobalVar.respons2)==(GlobalVar.e[GlobalVar.i-1]/GlobalVar.f[GlobalVar.i-1])))||((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1])))	{
				return true;
			} else	{
				return false;
			};
		},
		settings: [[10,10,0,0],[100,100,0,0],[10,10,0,2],[20,20,0,2],[100,100,0,2]],
		niveau: 1,
		niveau1: "Kleine noemers, gelijknamig.",
		niveau2: "Grote noemers, gelijknamig.",
		niveau3: "Kleine noemers, ongelijknamig.",
		niveau4: "Grote noemers, ongelijknamig.",
		niveau5: "Hele grote noemers, ongelijknamig.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				if	((getallen[0]/getallen[1])<(getallen[2]/getallen[3]))	{ getallen = draaiOm(getallen); };
				if	((getallen[0]*getallen[3] - getallen[1]*getallen[2])==0)	{ getallen[0]++; };
				if (GlobalVar.niveau<3)	{
					getallen.push(getallen[0]-getallen[2]);
					getallen.push(getallen[1]);
				} else {
					var vereenvoudigd = Vereenvoudig(getallen[0]*getallen[3] - getallen[1]*getallen[2],getallen[1]*getallen[3]);
					getallen.push(vereenvoudigd[0]);
					getallen.push(vereenvoudigd[1]);
				};
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var text = "<p>" + vbGelijknamig() + "</p>";
			var vereenvoudiging = "";
			if(GlobalVar.niveau>2)	{
				vereenvoudiging = "<p>" + vbVereenvoudig(GlobalVar.a[GlobalVar.i-1] - GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + "</p>";
			};
			var oplossing = "Nu mag je de tellers bij van elkaar afhalen: <br>";
			oplossing += Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " - " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Frac(GlobalVar.a[GlobalVar.i-1] + " - " + GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " = " + Frac(GlobalVar.a[GlobalVar.i-1] - GlobalVar.c[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]);
			return text + "<p>" + oplossing + "</p>" + vereenvoudiging;
		},
		antwoord: function()	{
			if (GlobalVar.respons2.toString().length=="")	{
				return FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]);
			}	else	{
				return FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]);
			};
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	},

	vermenigvuldigen:	{
		uitleg:	function()	{
			var text = "Vermenigvuldig de onderstaande breuken met elkaar.";
			if (GlobalVar.niveau<3)	{
				return text + "<br>Je hoeft de breuk nog <strong>niet</strong> te vereenvoudigen.";
			} else	{
				return text + "<br>En vereenvoudig de breuk daarna <strong>zo ver mogelijk</strong>.";
			};
		},
		vraag:	function()	{
			return	Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " \\(\\times\\) " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Breuk("<span id='Answer" + GlobalVar.i + "' class='inputbreuk teller onderstreep box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span>","<span id='Answer" + GlobalVar.i + "b' class='inputbreuk'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span>");
		},
		check:	function()	{
			if (((GlobalVar.niveau<3)&&((GlobalVar.respons1/GlobalVar.respons2)==(GlobalVar.e[GlobalVar.i-1]/GlobalVar.f[GlobalVar.i-1])))||((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1])))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[5,5,0,5],[10,10,0,5],[20,20,0,5],[50,50,0,5],[100,100,0,5]],
		niveau: 1,
		niveau1: "Noemers tot 5.",
		niveau2: "Noemers tot 10.",
		niveau3: "Noemers tot 20.",
		niveau4: "Noemers tot 50.",
		niveau5: "Noemers tot 100.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				if (GlobalVar.niveau<3)	{
					getallen.push(getallen[0]*getallen[2]);
					getallen.push(getallen[1]*getallen[3]);
				} else	{
					var vereenvoudigd = Vereenvoudig(getallen[0]*getallen[2],getallen[1]*getallen[3]);
					getallen.push(vereenvoudigd[0]);
					getallen.push(vereenvoudigd[1]);
				};
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var a = GlobalVar.a[GlobalVar.i-1];
			var b = GlobalVar.b[GlobalVar.i-1];
			var c = GlobalVar.c[GlobalVar.i-1];
			var d = GlobalVar.d[GlobalVar.i-1];
			var text = "<p>Vermenigvuldig tellers en de noemers met elkaar.<br>";
			text += Frac(a,b) + "\\(\\times\\)" + Frac(c,d) + " = ";
			text += Frac(a + "\\times" + c,b + "\\times" + d) + " = ";
			text += Frac(a*c,b*d) + "</p>";
			var vereenvoudiging = "";
			if(GlobalVar.niveau>2)	{
				vereenvoudiging = "<p>" + vbVereenvoudig(a*c,b*d) + "</p>";
			};
			return text + vereenvoudiging;
		},
		antwoord: function()	{
			if (GlobalVar.respons2.toString().length=="")	{
				return FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]);
			}	else	{
				return FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]);
			};
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	},

	delen:	{
		uitleg:	function()	{
			var text = "Deel de onderstaande breuken door elkaar.";
			if (GlobalVar.niveau<3)	{
				return text + "<br>Je hoeft de breuk nog <strong>niet</strong> te vereenvoudigen.";
			} else {
				return text + "<br>En vereenvoudig de breuk daarna <strong>zo ver mogelijk</strong>.";
			};
		},
		vraag:	function()	{
			return Frac(GlobalVar.a[GlobalVar.i-1],GlobalVar.b[GlobalVar.i-1]) + " \\(\\div\\) " + Frac(GlobalVar.c[GlobalVar.i-1],GlobalVar.d[GlobalVar.i-1]) + " = " + Breuk("<span id='Answer" + GlobalVar.i + "' class='inputbreuk teller onderstreep box'>" + FillDots("",GlobalVar.e[GlobalVar.i-1]) + "</span>","<span id='Answer" + GlobalVar.i + "b' class='inputbreuk'>" + FillDots("",GlobalVar.f[GlobalVar.i-1]) + "</span>");
		},
		check:	function()	{
			if (((GlobalVar.niveau<3)&&((GlobalVar.respons1/GlobalVar.respons2)==(GlobalVar.e[GlobalVar.i-1]/GlobalVar.f[GlobalVar.i-1])))||((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1])))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[10,10,0,4],[12,12,0,4],[15,15,0,4],[20,20,0,4],[100,15,0,4]],
		niveau: 1,
		niveau1: "Noemers tot 5.",
		niveau2: "Noemers tot 10.",
		niveau3: "Noemers tot 20.",
		niveau4: "Noemers tot 50.",
		niveau5: "Noemers tot 100.",
		getallen:	function()	{
			do {
				getallen = Breuken(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2],this.settings[GlobalVar.niveau-1][3]);
				if	((getallen[0]/getallen[1])>(getallen[2]/getallen[3]))	{ getallen = draaiOm(getallen); };
				if (GlobalVar.niveau<3)	{
					getallen.push(getallen[0]*getallen[3]);
					getallen.push(getallen[1]*getallen[2]);
				} else {
					var vereenvoudigd = Vereenvoudig(getallen[0]*getallen[3],getallen[1]*getallen[2]);
					getallen.push(vereenvoudigd[0]);
					getallen.push(vereenvoudigd[1]);
				};
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function()	{
			var a = GlobalVar.a[GlobalVar.i-1];
			var b = GlobalVar.b[GlobalVar.i-1];
			var c = GlobalVar.c[GlobalVar.i-1];
			var d = GlobalVar.d[GlobalVar.i-1];
			var text = "<p>Delen door een breuk is vermenigvuldigen met het omgekeerde.<br>";
			text += Frac(a,b) + " : " + Frac(c,d) + " = ";
			text += Frac(a,b) + "\\(\\times\\)" + Frac(d,c) + "</p>";
			text += "<p>Vermenigvuldig de tellers en noemers met elkaar.<br>"
			text += Frac(a,b) + "\\(\\times\\)" + Frac(d,c) + " = ";
			text += Frac(a + "\\times" + d,b + "\\times" + c) + " = ";
			text += Frac(a*d,b*c) + "</p>";
			var vereenvoudiging = "";
			if(GlobalVar.niveau>2)	{
				vereenvoudiging = "<p>" + vbVereenvoudig(a*d,b*c) + "</p>";
			};
			return text + vereenvoudiging;
		},
		antwoord: function()	{
			if (GlobalVar.respons2.toString().length=="")	{
				return FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]);
			}	else	{
				return FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]);
			};
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	},

	doorelkaar:	{
		uitleg:	function()	{
			var text = "Optellen, aftrekken, vermenigvuldigen en delen door elkaar. Veel succes!";
			if (GlobalVar.niveau<5) {
				return text + "<br>Je hoeft antwoorden nog <strong>niet</strong> te vereenvoudigen.";
			} else {
				return text + "<br>En vereenvoudig je antwoord <strong>zo ver mogelijk</strong>.";
			};	
		},
		vraag:	function()	{
			//steeds anders
			return	;
		},
		check:	function()	{
			if (((GlobalVar.niveau<3)&&((GlobalVar.respons1/GlobalVar.respons2)==(GlobalVar.e[GlobalVar.i-1]/GlobalVar.f[GlobalVar.i-1])))||((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1])))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[1,"optellen","aftrekken"],[1,"vermenigvuldigen","delen"],[2,"optellen","aftrekken"],[2,"vermenigvuldigen","delen"],[3,"optellen","aftrekken"],[3,"vermenigvuldigen","delen"],[4,"optellen","aftrekken"],[4,"vermenigvuldigen","delen"],[5,"optellen","aftrekken"],[5,"vermenigvuldigen","delen"]],
		niveau: 1,
		niveau1: "Optellen en aftrekken (niveau 1)",
		niveau2: "Vermenigvuldigen en delen (niveau 1)",
		niveau3: "Optellen en aftrekken (niveau 2)",
		niveau4: "Vermenigvuldigen en delen (niveau 2)",
		niveau5: "Optellen en aftrekken (niveau 3)",
		niveau6: "Vermenigvuldigen en delen (niveau 3)",
		niveau7: "Optellen en aftrekken (niveau 4)",
		niveau8: "Vermenigvuldigen en delen (niveau 4)",
		niveau9: "Optellen en aftrekken (niveau 5)",
		niveau10: "Vermenigvuldigen en delen (niveau 5)",
		getallen:	function()	{
			//steeds anders
		},
		antwoord: function()	{
			if(GlobalVar.e[GlobalVar.i-1].toString().length<3) { a = "\\dots";
			} else { a = FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]) };
			if(GlobalVar.f[GlobalVar.i-1].toString().length<3) { b = "\\dots"; 
			} else { b = FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]) };
			if (GlobalVar.respons1=="")	{
				return Frac(a,b);
			} else if(GlobalVar.respons2=="")	{
				return Frac(FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]),b);
			}	else	{
				return Frac(FillDots(GlobalVar.respons1,GlobalVar.e[GlobalVar.i-1]),FillDots(GlobalVar.respons2,GlobalVar.f[GlobalVar.i-1]));
			};
		},
		correctie: function()	{
			return Frac(GlobalVar.e[GlobalVar.i-1],GlobalVar.f[GlobalVar.i-1]);
		}
	}
};

function Breuken(g,h,n,v)	{
	// a/b en c/d met a<b, c<d, 2<b<g en 2<d<h
	// variatie 0: b=d (gelijknamig)
	// variatie 1: d=b*n en c=a*n met 2<n<9 (eenvoudig ongelijknamig)
	// variatie 2: b!=d (ongelijknamig)
	// variatie 3: b=b*n en a=a*n, met 2<n<9(te vereenvoudigen)
	// variatie 4: a*d!=b*c 
	// variatie 5: a*c!=b*d
	// variatie 6: d=b*x met 2<x<n
	
	var b = RandomInt(2,g);
	var a = RandomInt(1,b-1);
	var d = RandomInt(2,h);
	var c = RandomInt(1,d-1);
	var x = RandomInt(2,n);
	switch(v)	{
		case 0:
			d = b;
			c = RandomInt(1,b-a);
			break;
		case 1:
			d=b*x;
			c=a*x;
			break;
		case 2:
			if (b==d)	{ b++; };
			break;
		case 3:
			a=a*x;
			b=b*x;
			break;
		case 4:
			if (a/b==c/d)	{ b++; };
			break;
		case 5:
			if (a/d==c/b)	{ b++; };
			break;
		case 6:
			d=b*x;
			c=RandomInt(1,d-1);
			break;
		default:
			break;
	};
	return [a,b,c,d];
};

function Frac(x,y)	{
	return '\\(\\frac{' + x + '}{' + y + '}\\)';
};

function Breuk(a,b) {
	return "<div class='breuk placeholder'><div class='breuk'>" + a + b + "</div></div>";
}

//function Vereenvoudig(x,y)	{
//	var teller = x;
//	var noemer = y;
//	GlobalVar.e.push(0);
//	GlobalVar.f.push(0);
//	for(i=0;i<GlobalVar.primes.length;)	{
//		if((x % GlobalVar.primes[i]==0)&&(y % GlobalVar.primes[i]==0))	{
//			GlobalVar.e[GlobalVar.e.length-1] = x / GlobalVar.primes[i];
//			GlobalVar.f[GlobalVar.f.length-1] = y / GlobalVar.primes[i];
//			x = GlobalVar.e[GlobalVar.e.length-1];
//			y = GlobalVar.f[GlobalVar.f.length-1];
//		}
//		else	{
//			GlobalVar.e[GlobalVar.e.length-1] = x;
//			GlobalVar.f[GlobalVar.f.length-1] = y;
//			i++;
//		};
//	};
//};

function Vereenvoudig2(x,y)	{
	for(i=0;i<GlobalVar.primes.length;)	{
		if((x % GlobalVar.primes[i]==0)&&(y % GlobalVar.primes[i]==0))	{
			x = x / GlobalVar.primes[i];
			y = y / GlobalVar.primes[i];
		} else	{
			i++;
		};
	};
	return [x,y];
};

function draaiOm(getallen)	{
	var x = getallen[2];
	var y = getallen[3];
	getallen[2] = getallen[0];
	getallen[3] = getallen[1];
	getallen[0] = x;
	getallen[1] = y;
	return getallen;
};

function vbGelijknamig()	{
	var a = GlobalVar.a[GlobalVar.i-1];
	var b = GlobalVar.b[GlobalVar.i-1];
	var c = GlobalVar.c[GlobalVar.i-1];
	var d = GlobalVar.d[GlobalVar.i-1];
	if(b==d)	{ return "Deze breuken zijn gelijknamig, omdat de noemers hetzelfde zijn."; }
	else	{
		var text = "Breuken gelijknamig maken door: <br>";
		var x = Vereenvoudig2(b,d)[0];
		var y = Vereenvoudig2(b,d)[1];
		var breuk1 = "";
		var breuk2 = "";
		if(y!=1) {
			breuk1 = Frac(a,b) + " teller en noemer vermenigvuldigen met " + y + ". ";
			breuk1 += Frac(a + "\\times" + y,b + "\\times" + y) + " = " + Frac(a*y,b*y) + "<br>";
		}
		if(x!=1) {
			breuk2 = Frac(c,d) + " teller en noemer vermenigvuldigen met " + x + ". ";
			breuk2 += Frac(c + "\\times" + x,d + "\\times" + x) + " = " + Frac(c*x,d*x) + "<br>";
		}
		GlobalVar.a[GlobalVar.i-1] = a*y;
		GlobalVar.b[GlobalVar.i-1] = b*y;
		GlobalVar.c[GlobalVar.i-1] = c*x;
		GlobalVar.d[GlobalVar.i-1] = d*x;
		return text + breuk1 + breuk2;
	};
};

function Vereenvoudig(a,b)	{
	var GGD = 1;
	for(i=0;i<GlobalVar.primes.length;)	{
		if((a % GlobalVar.primes[i]==0)&&(b % GlobalVar.primes[i]==0))	{
			GGD = GGD * GlobalVar.primes[i];
			a = a / GlobalVar.primes[i];
			b = b / GlobalVar.primes[i];
		} else {
			i++;
		};
	};
	return [a,b];
};


function vbVereenvoudig(a,b)	{
	var GGD = 1;
	var x = a;
	var y = b;
	for(i=0;i<GlobalVar.primes.length;)	{
		if((x % GlobalVar.primes[i]==0)&&(y % GlobalVar.primes[i]==0))	{
			GGD = GGD * GlobalVar.primes[i];
			x = x / GlobalVar.primes[i];
			y = y / GlobalVar.primes[i];
		} else	{
			i++;
		};
	};
	if(GGD==1)	{
		return "Deze breuk kun je niet verder vereenvoudigen."
	} else {
		var text = "Vereenvoudigen door de teller en noemer te delen door " + GGD + ".<br>";
		text += Frac(a,b) + " = " + Frac(a + " : " + GGD,b + " : " + GGD) + " = " + Frac(x,y);
		return text;
	};
};

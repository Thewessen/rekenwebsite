var Oefening = {
	optellen:	{
		uitleg:	function()	{
			return "Tel de volgende getallen bij elkaar op. Gebruik zo nodig kladpapier.";
		},
		vraag:	function()	{
			return	GlobalVar.a[GlobalVar.i-1] + " + " + GlobalVar.b[GlobalVar.i-1] + " = <span id='Answer" + GlobalVar.i + "' class='input box'>" + this.antwoord() + "</span>";
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[2,2,0],[2,2,1],[3,3,0],[3,2,1],[4,4,5]],
		niveau: 1,
		niveau1: "Getallen tot 100 zonder tientaloverschrijding.",
		niveau2: "Getallen tot 100 met tientaloverschrijding",
		niveau3: "Getallen tot 1000 zonder tientaloverschrijding.",
		niveau4: "Getallen tot 1000 met tientaloverschrijding.",
		niveau5: "Getallen tot 10000, alles door elkaar.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Getallen(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2]);
				getallen.push(getallen[0]+getallen[1]);
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function() {
			var tabel = "<table class='onderelkaar'>";
			var a = ("" + GlobalVar.a[GlobalVar.i-1]).split("");
			var b = ("" + GlobalVar.b[GlobalVar.i-1]).split("");
			var width = Math.max(a.length,b.length)+2;
			var uitleg = "<ul>";
			var intro = "";
			var rij = vbDHTE(width);
			tabel += rij[0];
			intro += rij[1];
			intro += " en tel op van rechts naar links:<br>";

			var cijfer1 = 0;
			var cijfer2 = 0;
			var onthoud = [""];
			var uitkomst = 0;

			var tabelonthoud = "<td></td></tr>";
			for(i=1;i<width-1;i++) {
				var som = [];
				uitleg += "<li>";
				if(onthoud[i-1]!="") { 
					som.push(onthoud[i-1]);
				};

				if(a.length>=i) { 
					cijfer1 = parseInt(a[a.length-i]);
					som.push(cijfer1);
				} else {
					cijfer1 = 0;
					som.push(0);
				};
				if(b.length>=i) { 
					cijfer2 = parseInt(b[b.length-i]); 
					som.push(cijfer2);
				} else {
					cijfer2 = 0;
					som.push(0);
				};

				if(som.length>1)	{
					uitkomst = 0;
					for(j=0;j<som.length;j++)	{
						if(j<som.length-1) { uitleg += som[j] + " + ";
						} else { uitleg += som[j] + " = "; };
						uitkomst += som[j];
					};
				} else { uitkomst = som[0]; };
				if(uitkomst>9) { 
					uitleg += uitkomst + "<br>Schrijf <strong>" + ("" + uitkomst).substr(("" + uitkomst).length-1,1) + "</strong> op";
					onthoud.push(parseInt(("" + uitkomst).substr(0,1)));
					uitleg += ", onthoud " + onthoud[i] + ".";
				} else { 
					uitleg += "<strong>" + uitkomst + "</strong>.";
					onthoud.push(""); 
				};
				if (i==width-2 && onthoud[i]!="") {
					uitkomst = 0;
					uitleg += "</li><li>" + onthoud[i] + " + 0 + 0 = <strong>" + onthoud[i] + "</strong>."
				}
				uitleg += "</li>";
			};
			uitleg += "</ul><p>Dus: " + GlobalVar.a[GlobalVar.i-1] + " + " + GlobalVar.b[GlobalVar.i-1] + " = " + GlobalVar.e[GlobalVar.i-1] + ".</p>";

			tabel += vbOnthoudRij(onthoud,width);
			tabel += vbGetalRij(a,width,"");
			tabel += vbGetalRij(b,width,"+");
			tabel += vbAntwoordRij(GlobalVar.e[GlobalVar.i-1],width);
			tabel += "</table>";

			var div1 = "<div class='voorbeeld intro'>";
			var div2 = "<div class='voorbeeld uitleg'>";
			var div3 = "<div class='voorbeeld tabel'>";
			var closeDiv = "</div>";
			return div1 + intro + closeDiv + div2 + uitleg + closeDiv + div3 + tabel + closeDiv;
		}, 
		antwoord: function()	{
			return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
		},
		correctie: function()	{
			return GlobalVar.e[GlobalVar.i-1];
		}
	},
	aftrekken:	{
		uitleg:	function()	{
			return "Trek de volgende getallen van elkaar af. Gebruik zo nodig kladpapier.";
		},
		vraag:	function()	{
			return	GlobalVar.a[GlobalVar.i-1] + " - " + GlobalVar.b[GlobalVar.i-1] + " = <span id='Answer" + GlobalVar.i + "' class='input box'>" + this.antwoord() + "</span>";
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[2,2,2],[2,2,3],[3,3,2],[3,2,3],[4,4,3]],
		niveau: 1,
		niveau1: "Getallen tot 100 zonder lenen.",
		niveau2: "Getallen tot 100 met lenen",
		niveau3: "Getallen tot 1000 zonder lenen.",
		niveau4: "Getallen tot 1000 met lenen.",
		niveau5: "Getallen tot 10000 met lenen.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Getallen(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2]);
				getallen.push(getallen[0]-getallen[1]);
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function() {
			var tabel = "<table class='onderelkaar'>";
			var a = ("" + GlobalVar.a[GlobalVar.i-1]).split("");
			var b = ("" + GlobalVar.b[GlobalVar.i-1]).split("");
			var width = Math.max(a.length,b.length)+2;
			//3 extra kolommen, 1 ervoor, 1 erna.
			var uitleg = "<ul>";
			var intro = "";
			var rij = vbDHTE(width);
			tabel += rij[0];
			intro += rij[1];
			intro += " en trek af van rechts naar links:<br>";

			var cijfer1 = 0;
			var cijfer2 = 0;

			var onthoud1 = [];
			var onthoud2 = [];
			var uitkomst = 0;

			for(i=0;i<width-2;i++) {
				uitleg += "<li>";
				if(a.length>i) { 
					if(onthoud1.length!=onthoud2.length) {
						cijfer1 = onthoud1[i];
					} else {
						cijfer1 = parseInt(a[a.length-i-1]);
					};
				};
				if(b.length>i) { 
					cijfer2 = parseInt(b[b.length-i-1]); 
				} else {
					cijfer2 = 0;
				};

				if(cijfer1-cijfer2<0) {
					uitleg += cijfer1 + " - " + cijfer2 + " kan niet! Leen bij linkerbuur:<ul><li>";
					if(onthoud1.length!=onthoud2.length)	{
						onthoud2.push(cijfer1+10);
						onthoud1[i] = "<s>" + onthoud1[i] + "</s>";
					} else {
						onthoud1.push(cijfer1+10);
						onthoud2.push("");
						a[a.length-i-1] = "<s>" + a[a.length-i-1] + "</s>";
					};

					for(j=i+1;j<width-1;j++) {
						if(a[a.length-j-1]==0)	{
							uitleg += "0 - 1 kan niet! Leen bij linkerbuur:</li><li>";
							onthoud1.push(9);
							a[a.length-j-1] = "<s>" + a[a.length-j-1] + "</s>";
						} else {
							onthoud1.push(a[a.length-j-1]-1);
							uitleg += a[a.length-j-1] + " - 1 = " + onthoud1[onthoud1.length-1] + ", ";
							a[a.length-j-1] = "<s>" + a[a.length-j-1] + "</s>";
							break;
						};
					};
					uitleg += cijfer1 + " wordt ";
					cijfer1+=10;
					uitleg += cijfer1 + ".</li><li>";

					uitkomst = cijfer1-cijfer2;
					uitleg += cijfer1 + " - " + cijfer2 + " = <strong>" + uitkomst + "</strong>.</li></ul></li>";
				} else {
					uitkomst = cijfer1-cijfer2;
					uitleg += cijfer1 + " - " + cijfer2 + " = <strong>" + uitkomst + "</strong>.</li>";
					if(onthoud1.length-1<i) {
						onthoud1.push("");
					};
					if(onthoud2.length-1<i) {
						onthoud2.push("");
					};
				};
			};
			uitleg += "</ul><p>Dus: " + GlobalVar.a[GlobalVar.i-1] + " - " + GlobalVar.b[GlobalVar.i-1] + " = " + GlobalVar.e[GlobalVar.i-1] + ".</p>";

			tabel += vbOnthoudRij(onthoud2,width);
			tabel += vbOnthoudRij(onthoud1,width);
			tabel += vbGetalRij(a,width,"");
			tabel += vbGetalRij(b,width,"-");
			tabel += vbAntwoordRij(GlobalVar.e[GlobalVar.i-1],width);
			tabel += "</table>";

			var div1 = "<div class='voorbeeld intro'>";
			var div2 = "<div class='voorbeeld uitleg'>";
			var div3 = "<div class='voorbeeld tabel'>";
			var closeDiv = "</div>";
			return div1 + intro + closeDiv + div2 + uitleg + closeDiv + div3 + tabel + closeDiv;
		}, 
		antwoord: function()	{
			return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
		},
		correctie: function()	{
			return GlobalVar.e[GlobalVar.i-1];
		}
	},
	vermenigvuldigen:	{
		uitleg:	function()	{
			return "Vermenigvuldig de volgende getallen met elkaar. Gebruik zo nodig kladpapier.";
		},
		vraag:	function()	{
			return	GlobalVar.a[GlobalVar.i-1] + " \\(\\times\\) " + GlobalVar.b[GlobalVar.i-1] + " = <span id='Answer" + GlobalVar.i + "' class='input box'>" + this.antwoord() + "</span>";
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[1,1,4],[2,1,4],[2,2,4],[3,2,4],[3,3,4]],
		niveau: 1,
		niveau1: "Tafels tot en met 10.",
		niveau2: "Getal tot 100 vermenigvuldigen met een getal tot 10.",
		niveau3: "Getal tot 100 vermenigvuldigen met een getal tot 100.",
		niveau4: "Getal tot 1000 vermenigvuldigen met een getal tot 100.",
		niveau5: "Getal tot 1000 vermenigvuldigen met een getal tot 1000.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Getallen(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2]);
				getallen.push(getallen[0]*getallen[1]);
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function() {
			var cijfer1 = 0;
			var cijfer2 = 0;

			cijfer1 = GlobalVar.a[GlobalVar.i-1];
			cijfer2 = GlobalVar.b[GlobalVar.i-1];

			var a = ("" + cijfer1).split("");
			var b = ("" + cijfer2).split("");

			var onthoud = [""];
			var uitkomst = 0;
			var som = [];

			var tabel = "<table class='onderelkaar'>";
			var width = Math.max(a.length+b.length,(""+GlobalVar.e[GlobalVar.i-1]).split("").length-1)+2;
			var uitleg = "<ul>";
			var intro = "";

			switch(b.length) {
				case 1:
					if(a.length==1) {
						intro += "Voor dit product moet je de tafel van " + a[0];
						if(a[0]!=b[0]) { intro += " of " + b[0]; };
						intro += " kennen:<br>";
					} else {
						intro += "Vermenigvuldig " + b[0] + " met de cijfers van " + cijfer1 + " van rechts naar links:<br>";
						var rij = vbDHTE(width);
						tabel += rij[0];
						var construct = vbVermenigvuldigen(a,b[0],width);
						tabel += construct[0];
						uitleg += construct[1];
						tabel += vbAntwoordRij(GlobalVar.e[GlobalVar.i-1],width);
					};
					break;
				default:
					if(a.length==1) {
						intro += "Vermenigvuldig " + cijfer1 + " met de cijfers van " + cijfer2 + " van rechts naar links:<br>";
						var rij = vbDHTE(width);
						tabel += rij[0];
						var construct = vbVermenigvuldigen(b,a[0],width);
						tabel += construct[0];
						uitleg += construct[1];
						tabel += vbAntwoordRij(GlobalVar.e[GlobalVar.i-1],width);
					} else {
						intro += "Vermenigvuldig van rechts naar links de cijfers van " + GlobalVar.b[GlobalVar.i-1] + " met de cijfers van " + GlobalVar.a[GlobalVar.i-1] + ":<br>";
						var rij = vbDHTE(width);
						tabel += rij[0];
						var construct = vbVermenigvuldigen(a,b[b.length-1],width);
						tabel += construct[0];
						uitleg += "<li>Vermenigvuldig " + b[b.length-1] + " met de cijfers van " + cijfer1 + " van rechts naar links:<ul>";
						uitleg += construct[1];
						uitleg += "</ul></li>";

						uitkomst = b[b.length-1]*cijfer1;
						som.push(uitkomst);
						tabel += vbGetalRij(("" + uitkomst).split(""),width,""); 

						uitleg += "<li>" + b[b.length-1] + " \\(\\times\\) " + cijfer1 + " = " + uitkomst + "</li>";
						uitleg += "Hetzelfde voor:";

						for(l=1;l<b.length;l++)	{
							cijfer2 = b[b.length-l-1]*Math.pow(10,l);
							uitkomst = cijfer2*cijfer1;
							som.push(uitkomst);
							uitleg += "<li>" + cijfer2 + " \\(\\times\\) " + cijfer1 + " = " + uitkomst;
							uitleg += "<br>(denk aan de extra " + ("" + Math.pow(10,l)).substr(1,l) + ")</li>";
							if(l==b.length-1) { tabel += vbGetalRij(("" + uitkomst).split(""),width,"+"); } 
							else { tabel += vbGetalRij(("" + uitkomst).split(""),width,""); };
						};
						uitleg += "<li>";
						for(l=0;l<som.length;l++) {;
							uitleg += som[l];
							if(l<som.length-1) { uitleg += " + "; }
							else { uitleg += " = " };
						};
						uitleg += GlobalVar.e[GlobalVar.i-1] + "</li>"
						tabel += vbAntwoordRij(GlobalVar.e[GlobalVar.i-1],width);
					};
			};
			uitleg += "</ul><p>" + GlobalVar.a[GlobalVar.i-1] + " \\(\\times\\) " + GlobalVar.b[GlobalVar.i-1] + " = " + GlobalVar.e[GlobalVar.i-1] + "</p>";
			tabel += "</tabel>";

			var div1 = "<div class='voorbeeld intro'>";
			var div2 = "<div class='voorbeeld uitleg'>";
			var div3 = "<div class='voorbeeld tabel'>";
			var closeDiv = "</div>";
			return div1 + intro + closeDiv + div2 + uitleg + closeDiv + div3 + tabel + closeDiv;
		},
		antwoord: function()	{
			return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
		},
		correctie: function()	{
			return GlobalVar.e[GlobalVar.i-1];
		}
	},
	delen:	{
		uitleg:	function()	{
			var text = "Deel de volgende getallen door elkaar. Gebruik zo nodig kladpapier.";
			return text;
		},
		vraag:	function()	{
			return	GlobalVar.a[GlobalVar.i-1] + " : " + GlobalVar.b[GlobalVar.i-1] + " = <span id='Answer" + GlobalVar.i + "' class='input box'>" + this.antwoord() + "</span>";
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[1,1,5],[2,1,5],[4,1,5],[2,2,5],[4,2,5]],
		niveau: 1,
		niveau1: "Omgekeerde tafels tot en met 10.",
		niveau2: "Getallen tot 100 delen door een getal tussen 1 en 10.",
		niveau3: "Getallen tot 10000 delen door een getal tussen 1 en 10.",
		niveau4: "Delen door een getal tot 100.",
		niveau5: "Hele grote getallen.",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Getallen(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2]);
				getallen.push(getallen[0]/getallen[1]);
				getallen.push("");
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function() {
			var intro = "";
			var uitleg = "<ul>";
			var tabel = "<table class='staartdeling handwrite'>";
			
			var cijfer1 = GlobalVar.a[GlobalVar.i-1];
			var cijfer2 = GlobalVar.b[GlobalVar.i-1];

			var a = ("" + cijfer1).split("");
			var b = ("" + cijfer2).split("");
			if((b.length==1)&&(a.length<3)) {
				intro += "Het getal " + cijfer1 + " zit in de tafel van " + cijfer2 + ":<br>";
				intro += GlobalVar.e[GlobalVar.i-1] + " \\(\\times\\) " + cijfer2 + " = " + cijfer1;
			} else {
				intro += "Maak een staartdeling:<br>" + cijfer2 + "/" + cijfer1 + "\\...";
				tabel += vbStaartdelingRij(a,cijfer2);

				var uitkomst = 0;
				var rest = ""+cijfer1;

				for(i=b.length;i<rest.length+1;) {
					var deling = vbDelen(rest.substr(0,i),cijfer2);
					if(deling[0]==0) { 
						uitleg += "<li>" + parseInt(rest.substr(0,i)) + " : " + cijfer2 + " kan niet";
						if(rest.length!=a.length) { uitleg += "<br>Schrijf <strong>0</strong> op"; };
						uitleg += "</li>";
						i++;
					} else {
						uitleg += "<li>" + parseInt(rest.substr(0,i)) + " : " + cijfer2 + " = " + deling[0] + " rest " + deling[1]; 
						uitleg += "<br>Schrijf <strong>" + deling[0] + "</strong> op";

						tabel += "<tr><td></td>";
						if(rest!=""+cijfer1) {
							for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
							for(j=0;j<i;j++) { tabel += "<td>" + rest.substr(j,1) + "</td>"; };
							for(j=0;j<rest.length-i;j++) { tabel += "<td>|</td>"; };
						};
						tabel += "<td></td><td></td></tr>";

						uitkomst = "" + deling[0]*cijfer2;
						tabel += "<tr><td></td>";
						for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
						for(j=0;j<i-uitkomst.length;j++) { tabel += "<td class='onderstreep'></td>"; };
						for(j=0;j<uitkomst.length;j++) { tabel += "<td class='onderstreep'>" + uitkomst.substr(j,1) + "</td>"; };
						tabel += "<td>-</td>";
						for(j=0;j<rest.length-i-1;j++) { tabel += "<td>|</td>"; };
						rest = "" + deling[1] + rest.substr(i,rest.length-i+1);
						if(rest!="0") { uitleg += ", onthoud " + deling[1]; };
						tabel += "<td></td><td></td></tr>";
						i = ("" + deling[1]).length + 1;
					};
				};
				tabel += "<tr><td></td>";
				for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
				for(j=0;j<rest.length;j++) { tabel += "<td>" + rest.substr(j,1) + "</td>"; };
				tabel += "<td></td></tr>";
			};
			uitleg += "</ul><p>" + GlobalVar.a[GlobalVar.i-1] + " : " + GlobalVar.b[GlobalVar.i-1] + " = " + GlobalVar.e[GlobalVar.i-1] + "</p>";
			tabel += "</table>";
			var div1 = "<div class='voorbeeld intro'>";
			var div2 = "<div class='voorbeeld uitleg'>";
			var div3 = "<div class='voorbeeld tabel'>";
			var closeDiv = "</div>";
			return div1 + intro + closeDiv + div2 + uitleg + closeDiv + div3 + tabel + closeDiv;
		},
		antwoord: function()	{
			return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
		},
		correctie: function()	{
			return GlobalVar.e[GlobalVar.i-1];
		}
	},
	delenmetrest:	{
		uitleg:	function()	{
			var text = "Deel de volgende getallen door elkaar. Gebruik zo nodig kladpapier.";
			return text;
		},
		vraag:	function()	{
			return	GlobalVar.a[GlobalVar.i-1] + " : " + GlobalVar.b[GlobalVar.i-1] + " = <span id='Answer" + GlobalVar.i + "' class='input box'>" + this.antwoord() + "</span>" + " rest " + "<span id='Answer" + GlobalVar.i + "b' class='input'>" + this.antwoord() + "</span>";
		},
		check:	function()	{
			if (GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[1,1,6],[2,1,6],[4,1,6],[2,2,6],[4,2,6]],
		niveau: 1,
		niveau1: "Getallen t/m 10 (met rest).",
		niveau2: "Getallen tot 100 delen door een getal tussen 1 en 10 (met rest).",
		niveau3: "Getallen tot 10000 delen door een getal tussen 1 en 10 (met rest).",
		niveau4: "Delen door een getal tot 100 (met rest).",
		niveau5: "Hele grote getallen (met rest).",
		getallen:	function()	{
			var getallen = [];
			do {
				getallen = Getallen(this.settings[GlobalVar.niveau-1][0],this.settings[GlobalVar.niveau-1][1],this.settings[GlobalVar.niveau-1][2]);
				var delen = vbDelen(getallen[0],getallen[1]);
				getallen.push(delen[0]);
				getallen.push(delen[1]);
			} while(SameExercise(getallen))
			PushGetallen(getallen);
		},
		voorbeeld: function() {
			var intro = "";
			var uitleg = "<ul>";
			var tabel = "<table class='staartdeling handwrite'>";
			
			var cijfer1 = GlobalVar.a[GlobalVar.i-1];
			var cijfer2 = GlobalVar.b[GlobalVar.i-1];
			var uitkomst = 0;

			var a = ("" + cijfer1).split("");
			var b = ("" + cijfer2).split("");
			
			var deling = [];

			if((b.length==1)&&(a.length<3)) {
				deling = vbDelen(cijfer1,cijfer2);
				if(deling[0]==0) { 
					intro += "Hoe vaak past " + cijfer2 + " in " + cijfer1 + "?";
					uitleg += "<li>" + cijfer2 + " <strong>past niet</strong> in " + cijfer1 + "</li>";
					uitleg += "<li>Je houdt <strong>" + deling[1] + " over</strong></li>"; }
				else if (deling[1]==0) { 
					intro += cijfer1 + " zit in de tafel van " + cijfer2 + ":<br>";
					intro += cijfer1 + "\\(\\times\\)" + deling[0] + " = " + cijfer2;
				} else { 
					intro += "Hoe vaak past " + cijfer2 + " in " + cijfer1 + "?";
					uitleg += "<li>" + cijfer2 + " past <strong>" + deling[0] + " keer</strong> in " + cijfer1 + "</li>";
					uitleg += "<li>Je houdt <strong>" + deling[1] + " over</strong>:<br>";
					uitleg += cijfer1 + " - " + deling[0] +  "\\(\\times\\)" + cijfer2 + " = ";
					uitkomst = deling[0]*cijfer2;
					uitleg += cijfer1 + " - " + uitkomst + " = " + deling[1] + "</li>"; 
				};
			} else {
				intro += "Maak een staartdeling:<br>" + cijfer2 + "/" + cijfer1 + "\\...";
				tabel += vbStaartdelingRij(a,cijfer2);

				var rest = ""+cijfer1;

				for(i=b.length;i<rest.length+1;) {
					deling = vbDelen(rest.substr(0,i),cijfer2);
					if(deling[0]==0) { 
						uitleg += "<li>" + parseInt(rest.substr(0,i)) + " : " + cijfer2 + " kan niet";
						if(rest.length!=a.length) { uitleg += "<br>Schrijf <strong>0</strong> op"; };
						uitleg += "</li>";
						i++;
					} else {
						uitleg += "<li>" + parseInt(rest.substr(0,i)) + " : " + cijfer2 + " = " + deling[0] + " rest " + deling[1]; 
						uitleg += "<br>Schrijf <strong>" + deling[0] + "</strong> op";

						tabel += "<tr><td></td>";
						if(rest!=""+cijfer1) {
							for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
							for(j=0;j<i;j++) { tabel += "<td>" + rest.substr(j,1) + "</td>"; };
							for(j=0;j<rest.length-i;j++) { tabel += "<td>|</td>"; };
						};
						tabel += "<td></td><td></td></tr>";

						uitkomst = "" + deling[0]*cijfer2;
						tabel += "<tr><td></td>";
						for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
						for(j=0;j<i-uitkomst.length;j++) { tabel += "<td class='onderstreep'></td>"; };
						for(j=0;j<uitkomst.length;j++) { tabel += "<td class='onderstreep'>" + uitkomst.substr(j,1) + "</td>"; };
						tabel += "<td>-</td>";
						for(j=0;j<rest.length-i-1;j++) { tabel += "<td>|</td>"; };
						rest = "" + deling[1] + rest.substr(i,rest.length-i+1);
						if(rest!="0") { uitleg += ", onthoud " + deling[1]; };
						tabel += "<td></td><td></td></tr>";
						i = ("" + deling[1]).length + 1;
					};
				};
				uitleg += "<li>De rest is " + rest + "</li>";
				tabel += "<tr><td></td>";
				for(j=0;j<a.length-rest.length;j++) { tabel += "<td></td>"; };
				for(j=0;j<rest.length;j++) { tabel += "<td>" + rest.substr(j,1) + "</td>"; };
				tabel += "<td></td></tr>";
			};
			
			uitleg += "</ul><p>" + GlobalVar.a[GlobalVar.i-1] + " : " + GlobalVar.b[GlobalVar.i-1] + " = " + GlobalVar.e[GlobalVar.i-1] + " rest " + deling[1] + "</p>";
			tabel += "</table>";

			var div1 = "<div class='voorbeeld intro'>";
			var div2 = "<div class='voorbeeld uitleg'>";
			var div3 = "<div class='voorbeeld tabel'>";
			var closeDiv = "</div>";
			return div1 + intro + closeDiv + div2 + uitleg + closeDiv + div3 + tabel + closeDiv;
		},
		antwoord: function()	{
			if (GlobalVar.respons2=="")	{ return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
			} else { return FillDots(GlobalVar.respons2.toString(),GlobalVar.f[GlobalVar.i-1].toString());
			};
		},
		correctie: function()	{
			$("#Answer" + GlobalVar.i + "b").removeClass('box');
			return GlobalVar.e[GlobalVar.i-1] + " rest " + GlobalVar.f[GlobalVar.i-1];
		}
	},
	doorelkaar:	{
		uitleg:	function()	{
			var text = "Optellen, aftrekken, vermenigvuldigen en delen door elkaar. Veel succes!";
			return text;
		},
		vraag:	function()	{
			//steeds anders
			return	;
		},
		check:	function()	{
			if ((GlobalVar.respons1==GlobalVar.e[GlobalVar.i-1])&&(GlobalVar.respons2==GlobalVar.f[GlobalVar.i-1]))	{
				return true;
			} else {
				return false;
			};
		},
		settings: [[1,"optellen","aftrekken"],[1,"vermenigvuldigen","delen"],[2,"optellen","aftrekken"],[2,"vermenigvuldigen","delen"],[3,"optellen","aftrekken"],[3,"vermenigvuldigen","delenmetrest"],[4,"optellen","aftrekken"],[4,"vermenigvuldigen","delenmetrest"],[5,"optellen","aftrekken"],[5,"vermenigvuldigen","delenmetrest"]],
		niveau: 1,
		niveau1: "Optellen en aftrekken (niveau 1)",
		niveau2: "Vermenigvuldigen en delen (niveau 1)",
		niveau3: "Optellen en aftrekken (niveau 2)",
		niveau4: "Vermenigvuldigen en delen (niveau 2)",
		niveau5: "Optellen en aftrekken (niveau 3)",
		niveau6: "Vermenigvuldigen en delen met rest (niveau 3)",
		niveau7: "Optellen en aftrekken (niveau 4)",
		niveau8: "Vermenigvuldigen en delen met rest (niveau 4)",
		niveau9: "Optellen en aftrekken (niveau 5)",
		niveau10: "Vermenigvuldigen en delen met rest (niveau 5)",
		getallen:	function()	{
			//steeds anders
		},
		antwoord: function()	{
			if (GlobalVar.respons2=="")	{ return FillDots(GlobalVar.respons1.toString(),GlobalVar.e[GlobalVar.i-1].toString());
			} else { return FillDots(GlobalVar.respons2.toString(),GlobalVar.f[GlobalVar.i-1].toString());
			};
		},
		correctie: function()	{
			$("#Answer" + GlobalVar.i + "b").removeClass('box');
			var answer = GlobalVar.e[GlobalVar.i-1];
			if(GlobalVar.subject=='delenmetrest') { answer += " rest " + GlobalVar.f[GlobalVar.i-1] };
			return answer;
		}
	}

};

function Getallen(n,m,v)	{
	//n: Aantal cijfers in getal a
	//m: Aantal cijfers in getal b
	//v: Opties
	//-0: Optellen zonder tientaloverschrijding
	//-1: Optellen met tientaloverschrijding
	//-2: Aftrekken zonder tientaloverschrijding
	//-3: Aftrekken met tientaloverschrijding
	//-4: Tafels kennen vermenigvuldigen
	//-5: Delen zonder rest
	//-6: Delen met rest
		var a = RandomInt(1,10);
		var b = RandomInt(1,10);
		switch(v)	{
				//optellen zonder tientaloverschrijding
			case 0:
				if(a+b>9)	{
					b = RandomInt(1,10-a);
				};
				break;
				//optellen met tientaloverschrijding
			case 1:
				if(a+b<10)	{
					b = RandomInt(10-a,10);
				};
				break;
				//aftrekken zonder en met tientaloverschrijding
			case 2:
			case 3:
				if(a<b)	{
					var z = a;
					a = b;
					b = z;
				} else if (a==b) {
					a++;
				};
			break;
				//geen delen en vermenigvuldigen met 1..
			case 4:
			case 5:
			case 6:
				if(n==1) { a = RandomInt(2,10); };
				if(m==1) { b = RandomInt(2,10); };
			break;
		default:
			break;
		};
	for(i=1;i<n&&i<m;i++)	{
		var x = RandomInt(0,10);
		var y = RandomInt(0,10);
		switch(v)	{
			//optellen zonder tientaloverschrijding
			case 0:
				if(x+y>9)	{
					y = RandomInt(0,10-x);
				};
				break;
			//optellen met tientaloverschrijding
			case 1:
				if(x+y<10)	{
					y = RandomInt(10-x,10);
				};
				break;
			//aftrekken zonder tientaloverschrijding
			case 2:
				if(x<y)	{
					var z = x;
					x = y;
					y = z;
				};
				break;
			//aftrekken met tientaloverschrijding
			case 3:
				if(x>y)	{
					var z = x;
					x = y;
					y = z;
				};
				break;
			default:
				break;
			};
		a = a.toString() + x;
		b = b.toString() + y;
		};
	if(n<m)	{ 
		var k = m-n;
		for(i=0;i<k;i++)	{ 
			y = RandomInt(0,10);
			b = b.toString() + y; };
	} else	{
		var k = n-m;
		for(i=0;i<k;i++)	{ 
			x = RandomInt(0,10);
			a = a.toString() + x; }; 
	};
	b = parseInt(b);
	//Delen zonder rest (a als antwoord)
	if(v==5)	{ a = parseInt(a)*parseInt(b); }
	else	{ a = parseInt(a); };
	return [a,b,0,0];
};

function Getallen2(g,h,v)	{
	do {
			var a = RandomInt(1,g);
			var b = RandomInt(1,h);
			var x = (""+a).split("");
			var y = (""+b).split("");

			while (x.length!=y.length) {
				var z = [0];
				if(x.length<y.length) {
					for(i=0;i<x.length;i++) { z.push(x[i]); };
					x = z;
					console.log(x,y);
				} else { 
					for(i=0;i<x.length;i++) { z.push(y[i]); };
					y = z;
					console.log(x,y);
				};
			};

			for(i=0;(i<x.length)&&(i<y.length);i++)	{
				switch(v)	{
					//optellen zonder tientaloverschrijding
					case 0:
						if(x[i]+y[i]>9)	{
							y[i] = RandomInt(0,10-x[i]);
						};
						break;
					//optellen met tientaloverschrijding
					case 1:
						if(x[i]+y[i]<10)	{
							y[i] = RandomInt(11-x[i],10);
						};
						break;
					//aftrekken zonder tientaloverschrijding
					case 2:
						if(x[i]<y[i])	{
							var z = x[i];
							x[i] = y[i];
							y[i] = z;
						};
						break;
					//aftrekken met tientaloverschrijding
					case 3:
						if(x[i]>y[i])	{
							var z = x[i];
							x[i] = y[i];
							y[i] = z;
						};
						break;
					default:
						break;
				};
				i++;
			};
			a="";
			b="";
			for(i=0;i<x.length-1;i++)	{ a=a+x[i]; };
			for(i=0;i<y.length-1;i++)	{ b=b+y[i]; };
			b = parseInt(b);
			//Delen zonder rest (a als antwoord)
			if(v==4)	{ a = parseInt(a)*parseInt(b) }
			else	{ a = parseInt(a) };
	} while (SameExercise(a,b,0,0));
	GlobalVar.a.push(a);
	GlobalVar.b.push(b);
	GlobalVar.c.push("x");
	GlobalVar.d.push("x");
};

function vbDHTE(width)	{
	var values = ['M','H','T','D','H','T','E'];
	var valuesExtend = ["iljoenen","onderdduizendtallen","ienduizendtallen","uizendtallen","onderdtallen","ientallen","enheden"];
	var uitleg = "Zet de ";
	var tabel = "<tr style='font-size:80%'>";
	var cols = values.length-width+1;
	for(i=cols;i<values.length;i++)	{
		tabel += "<th"
		if(i>cols) { 
			tabel += " class='separate'";
			uitleg += "<strong>" + values[i] + "</strong>" + valuesExtend[i]; 
			if(i<values.length-2) { uitleg += ", "; }
			else if(i<values.length-1) { uitleg += " en "; };
		};
		tabel += ">" + values[i] + "</th>";
	};
	uitleg += " recht onder elkaar";
	tabel += "<th></th></tr>";
	return [tabel,uitleg];
};

function vbVermenigvuldigen(a,b,width) {
	var uitkomst = 0;
	var onthoud = [""];
	var rijen = "";
	var uitleg = "";

	for(i=0;i<a.length;i++) {
		uitkomst = b*a[a.length-1-i];
		uitleg += "<li>" + b + " \\(\\times\\) " + a[a.length-1-i] + " = ";
		if(onthoud[i]!="") { 
			uitleg += uitkomst + " en " + uitkomst + " + " + onthoud[i] + " = "; 
			uitkomst += parseInt(onthoud[i]); 
		};
		
		if(uitkomst>9) { 
			uitleg += uitkomst + "<br>Schrijf <strong>" + ("" + uitkomst).split("")[1] + "</strong> op, onthoud " + ("" + uitkomst).split("")[0];
			onthoud.push(("" + uitkomst).split("")[0]);
		} else { 
			uitleg += "<strong>" + uitkomst + "</strong>";
			onthoud.push(""); 
		};
		uitleg += "</li>";
	};
	if(onthoud[onthoud.length-1]!="") { uitleg += "<li>Schrijf <strong>" + onthoud[onthoud.length-1] + "</strong> op" };
	rijen += vbOnthoudRij(onthoud,width);
	rijen += vbGetalRij(a,width,"");
	rijen += vbGetalRij(("" + GlobalVar.b[GlobalVar.i-1]).split(""),width," \\(\\times\\) ");

	return [rijen,uitleg];
};

function vbOnthoudRij(onthoud,width) {
	var rij = "<td></td></tr>";
	for(k=0;k<width-1;k++)	{
		if(k<onthoud.length) { 
			rij = ">" + onthoud[k] + "</td>" + rij;
			if(k<width-2) { rij = " class='separate'" + rij; };
			rij = "<td" + rij; 
		} else if(k<width-2) { rij = "<td class='separate'></td>" + rij; }
		else { rij = "<td></td>" + rij; };
	};
	rij = "<tr class='handwrite onthoud'>" + rij;
	return rij;
};

function vbGetalRij(getal,width,operatie) {
	var rij = "<tr class='handwrite";
	if(operatie!="")	{ rij += " onderstreep"; };
	rij += "'>";
	for(k=0;k<width-1;k++)	{
		var diff = width-getal.length-1;
		if(k==0){ rij += "<td></td>"; }
		else if(k<diff) { rij += "<td class='separate'></td>"; }
		else { rij += "<td class='separate'>" + getal[k-diff] + "</td>"; };
	};
	rij += "<td>";
	if(operatie!="")	{ rij += operatie; };
	rij += "</td></tr>";
	return rij;
};

function vbOnderelkaar(onthoud2,onthoud1,getal1,getal2,operatie,width) {
	var tabel = "";
	var row = [];
	
	for(j=0;j<4;j++)	{
		if(j==0 && onthoud2.length==0) { j++; };
		row = [onthoud2,onthoud1,getal1,getal2][j];
		tabel += "<tr class='handwrite";
		if(j==3)	{ tabel += " onderstreep"; };
		if(j<2) { tabel += " onthoud"; };
		tabel += "'>";
		
		var tabelpart = "";
		
		for(k=0;k<width-1;k++)	{
			if(j<2)	{
				if(k==0) { tabelpart = "<td></td>"; };
				if(k<row.length) { 
					tabelpart = ">" + row[k] + "</td>" + tabelpart;
					if(k<width-2) { tabelpart = " class='separate'" + tabelpart; };
					tabelpart = "<td" + tabelpart; 
				} else if(k<width-2) { tabelpart = "<td class='separate'></td>" + tabelpart; }
				else { tabelpart = "<td></td>" + tabelpart; };
				if(k==width-2) { tabel += tabelpart; };
			} else {
				var diff = width-row.length-1;
				if(k==0){ tabel += "<td></td>"; }
				else if(k<diff) { tabel += "<td class='separate'></td>"; }
				else { tabel += "<td class='separate'>" + row[k-diff] + "</td>"; };
				};
		};
		tabel+="<td>";
		if(j==3) { tabel += operatie; };
		tabel+="</td></tr>";
	};
	return tabel;
};

function vbGetalinCellen(getal,leeg)	{
	var a = ("" + getal).split("");
	var tabel = "";
	for(i=0;i<a.length;i++) { 
		tabel += "<td";
		if(!(i==0 && leeg==0)) { tabel += " class='separate'"};
		tabel += ">" + a[i] + "</td>"; 
	};
	return tabel;
};

function vbLegeCellen(aantal)	{
	var tabel = "";
	for(i=0;i<aantal;i++)	{ 
		if(i===0) { tabel += "<td></td>"; }
		else { tabel += "<td class='separate'></td>"; };
	};
	return tabel;
};

function vbAntwoordRij(antwoord,width)	{
	var tabel = "<tr class='handwrite'>";
	var leeg = width - ("" + antwoord).split("").length-1;
	tabel += vbLegeCellen(leeg);
	tabel += vbGetalinCellen(antwoord,leeg);
	tabel += "<td></td></tr>";
	return tabel;
};

function vbStaartdelingRij(a,cijfer2) {
	var tabel = "<tr>";
	
	tabel += "<td>" + cijfer2 + "/</td>";
	for(i=0;i<a.length;i++) {
		tabel += "<td>" + a[i] + "</td>";
	};
	tabel += "<td>\\</td>"
	tabel += "<td>" + GlobalVar.e[GlobalVar.i-1] + "</td></tr>";
	return tabel;
};

function vbDelen(getal1,getal2) {
	if(parseInt(getal1)%parseInt(getal2)==0) {
		return [parseInt(getal1)/parseInt(getal2),0];
	};
	for(d=0;d<(""+getal1+getal2).length;d++) {
		if ((""+(parseInt(getal1)/parseInt(getal2))).substr(d,1)==".") {
			var helen = parseInt((""+(parseInt(getal1)/parseInt(getal2))).substr(0,d));
			//[helen,rest]
			return [helen,getal1-getal2*helen];
		};
	};
	return [0,parseInt(getal1)];
}

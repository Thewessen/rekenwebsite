//Creer een method om objecten te maken met specifieke prototype
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

var test = function(teststring) {
	var html = [teststring], a, b, c;

	const oefening = {
		'som': teststring,
		'html': html[0],
		'hardop': 'Jouw invoer is ${this.som}',
		'a': a,
		'b': b,
		'bewerking': c
	};
	var oefen = Object.create(oefening); //oefening als prototype
	var som = oefening; //gelinked aan oefening
	oefen['som'] = "3";
	som['som'] = "5";
	console.log(oefening.hardop);

	return;
}

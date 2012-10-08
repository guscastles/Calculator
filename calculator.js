var result;

(function () {
	"use strict";

	var calculate, 
	    divRE = /[0-9\.]+\/[0-9\.]+/,
	    getNumber,
	    mulRE = /[0-9\.]+\*[0-9\.]+/, 
	    nbrRE = /[0-9\.]+/,
	    signRE = /[\+\-\/\*]/,
	    simplify,
	    sumRE = /[0-9\.]+\+[0-9\.]+/, 
	    subRE = /[0-9\.]+\-[0-9\.]+/;

	getNumber = function(nbrAsString) {
		var nbrSplit, cn = 0, nbr = "", exponent = 0;
		
		if (nbrAsString.indexOf("n") > -1) {
			nbrSplit = nbrAsString.split("");
			for (; cn < nbrSplit.length; cn = cn + 1) {
				if (nbrSplit[cn] === "n") {
					exponent = exponent + 1;
				} else {
					nbr = nbr + nbrSplit[cn];
				}
			}
		} else {
			nbr = nbrAsString;
		}
		return Math.pow(-1, exponent) * parseInt(nbr);
	};
	
	calculate = function (expression) {
		var members, result = 0;

		if (sumRE.test(expression)) {
			members = expression.split("+");
			result = getNumber(members[0]) + getNumber(members[1]);
		} else if (subRE.test(expression)) {
			members = expression.split("-");
			result = getNumber(members[0]) - getNumber(members[1]);
		} else if (mulRE.test(expression)) {
			members = expression.split("*");
			result = getNumber(members[0]) * getNumber(members[1]);
		} else if (divRE.test(expression)) {
			members = expression.split("/");
			result = getNumber(members[0]) / getNumber(members[1]);
		} else if (nbrRE.test(expression)) {
			result = getNumber(expression);
		}
		return result;
	};

	simplify = function (position, expression) {
		var thisResult = 0;

		if (position >= expression.length) {
			thisResult = calculate(expression.join(""));
		} else if (signRE.test(expression[position])) {
			thisResult = calculate(expression.splice(0, position).join(""));
			expression.unshift(thisResult);
			thisResult = simplify(2, expression);
		} else {
			thisResult = simplify(position + 1, expression);
		}
		return thisResult;
	};

	result = function (expression) {
		return simplify(0, expression, 0);
	};

}());

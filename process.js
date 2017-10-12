var zxcvbn = require('zxcvbn');
var Papa = require('papaparse');
const fs = require('fs');

res_ = []
Papa.parse(fs.readFileSync('password.csv').toString(), {
	complete: function(results) {
		
		results.data.forEach(function(element) {
		    analysis_ = zxcvbn(element[1])
		    element.push(analysis_.score);
		    element.push(analysis_.warning==""? analysis_.warning : "nowarning");
		    element.push(analysis_.feedback.suggestions.join('|'));
		    res_.push(element);
		});
		

	}
});

fs.writeFile('passwords_analyzed.csv', Papa.unparse(res_) , (err) => {  
    if (err) throw err;
    console.log('Done!');
});
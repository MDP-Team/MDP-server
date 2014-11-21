function cypher(statement) {
	require('request').post({
		uri: 'http://localhost:7474/db/data/transaction/commit',
		json: {
			statements: [{
				statement: statement,
				params: null
			}]
		},
	},
	function (error, data) {
		console.log(JSON.stringify(data));
	});
}

cypher('MATCH n RETURN n');
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
		process.on('uncaughtException', function () {
			console.log('Unable to create server!');
		});

		require('http').createServer(function (req, res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(JSON.stringify(data));
		}).listen(1337, '127.0.0.1');
	});
}

cypher('MATCH n RETURN n');
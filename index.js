(function (statement) {
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
			res.end(JSON.stringify(data.body.results[0].data));
		}).listen(80, '127.0.0.1');

		console.log('Server started at localhost:80!');
	});
})('MATCH (event)-[:HAPPENS_AT]-(loc1)-[:IS_IN]-(loc2)-[:AT]-(activity) RETURN event, activity, loc1, loc2');
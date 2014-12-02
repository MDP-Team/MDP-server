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

		var data = data.body.results[0].data;

		require('http').createServer(function (req, res) {
			res.writeHead(200, {'Content-Type': 'application/json'});

			var body = [];
			data.forEach(function(row) {
				var obj = {};

				const eventIndex = 0;
				obj.eventName = row.row[eventIndex].name;
				obj.eventDesc = row.row[eventIndex].description;
				obj.eventStart = row.row[eventIndex].startTime;

				const activityIndex = 1;
				obj.activityName = row.row[activityIndex].name;
				obj.activityDesc = row.row[activityIndex].description;
				obj.activityStart = row.row[activityIndex].startTime;
				obj.activityLocation = row.row[activityIndex].location;

				const eventLocationIndex = 2;
				obj.eventLocationName = row.row[eventLocationIndex].name;

				const activityLocationIndex = 3;
				obj.activityLocationName = row.row[activityLocationIndex].name;
				obj.activityLocationX = row.row[activityLocationIndex].x;
				obj.activityLocationY = row.row[activityLocationIndex].y;

				body.push(obj);
			});
			res.end(JSON.stringify(body));
		}).listen(80, '127.0.0.1');

		console.log('Server started at localhost:80!');
	});
})('MATCH (event)-[:HAPPENS_AT]-(loc1)-[:IS_IN]-(loc2)-[:AT]-(activity) RETURN event, activity, loc1, loc2');
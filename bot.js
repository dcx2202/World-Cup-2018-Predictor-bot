//Requires
var Twit = require('twit');
var config = require('./config');
var flags = require('./flags.json');
var curl = require('curl');
var T = new Twit(config);

//Indicate that the bot is starting (useful when looking at logs)
console.log("World Cup 2018 Match Predictor BOT is starting");

//Run predict function in 24 hour intervals
setInterval(predict, 1000*60*60*24);

//Predicts the games of the day if there are any
function predict()
{
	//Get current date
	var date = new Date();
	var day = date.getMonth() + 1 + '' + date.getDate();
	var month = date.getMonth() + 1;
	var hour = date.getHours();
	var minute = date.getMinutes();

	//Get information about the day's matches (stored in "data")
	var json = curl.getJSON('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json', function(err, response, data)
	{
		//Tweet the predictions of the day
		if(day == 614) //  14/06/2018 - Matchday 1
		{
			tweetIt(data, 0);
		}
		else if(day == 615) //  15/06/2018 - Matchday 2
		{
			tweetIt(data, 1);
		}
		else if(day == 616) //  16/06/2018 - Matchday 3
		{
			tweetIt(data, 2);
		}
		else if(day == 617) //  17/06/2018 - Matchday 4
		{
			tweetIt(data, 3);
		}
		else if(day == 618) //  18/06/2018 - Matchday 5
		{
			tweetIt(data, 4);
		}
		else if(day == 619) //  19/06/2018 - Matchday 6
		{
			tweetIt(data, 5);
		}
		else if(day == 620) //  20/06/2018 - Matchday 7
		{
			tweetIt(data, 6);
		}
		else if(day == 621) //  21/06/2018 - Matchday 8
		{
			tweetIt(data, 7);
		}
		else if(day == 622) //  22/06/2018 - Matchday 9
		{
			tweetIt(data, 8);
		}
		else if(day == 623) //  23/06/2018 - Matchday 10
		{
			tweetIt(data, 9);
		}
		else if(day == 624) //  24/06/2018 - Matchday 11
		{
			tweetIt(data, 10);
		}
		else if(day == 625) //  25/06/2018 - Matchday 12
		{
			tweetIt(data, 11);
		}
		else if(day == 626) //  26/06/2018 - Matchday 13
		{
			tweetIt(data, 12);
		}
		else if(day == 627) //  27/06/2018 - Matchday 14
		{
			tweetIt(data, 13);
		}
		else if(day == 628) //  28/06/2018 - Matchday 15
		{
			tweetIt(data, 14);
		}
		else if(day == 630) //  30/06/2018 - Round of 16
		{
			tweetIt(data, 15, 0, 0);
		}
		else if(day == 71) //  01/07/2018 - Round of 16
		{
			tweetIt(data, 15, 2, 0);
		}
		else if(day == 72) //  02/07/2018 - Round of 16
		{
			tweetIt(data, 15, 4, 0);
		}
		else if(day == 73) //  03/07/2018 - Round of 16
		{
			tweetIt(data, 15, 6, 0);
		}
		else if(day == 76) //  06/07/2018 - Quarter-finals
		{
			tweetIt(data, 16, 0, 0);
		}
		else if(day == 77) //  07/07/2018 - Quarter-finals
		{
			tweetIt(data, 16, 2, 0);
		}
		else if(day == 710) //  10/07/2018 - Semi-finals
		{
			tweetIt(data, 17, 0, 1);
		}
		else if(day == 711) //  11/07/2018 - Semi-finals
		{
			tweetIt(data, 17, 1, 1);
		}
		else if(day == 714) //  14/07/2018 - Third place play-off
		{
			tweetIt(data, 18, 0, 1);
		}
		else if(day == 715) //  15/07/2018 - Final
		{
			tweetIt(data, 19, 0, 1);
		}
	});
}

function tweetIt(data, round)
{
	//Get current date
	var date = new Date();
	var day = date.getMonth() + 1 + '' + date.getDate();
	var month = date.getMonth() + 1;

	//Prepare the tweet
	var Tweet = "Predictions for the matches of the day (" + date.getDate() + "/0" + month + "/" + "2018):\n\n";

	//Get a list of today's matches
	let matches = data.rounds[round].matches;

	//For every match get the teams' names, codes and flags
	for(let i = 0; i < matches.length ; i++)
	{
		//Get the teams' names
		var team1 = "" + matches[i].team1.name;
		var team2 = "" + matches[i].team2.name;

		//Get the teams' codes
		var team1code = "" + matches[i].team1.code;
		var team2code = "" + matches[i].team2.code;

		//Get the teams' flags
		var team1flag;
		var team2flag;

		for(let j = 0; j < flags.countries.length ; j++) //Loop through every country participating in the World Cup
		{
			//If it is one of the contries playing in the match
			if(flags.countries[j].name == team1)
			{
				team1flag = flags.countries[j].emoji; //Get its emoji flag
			}
			else if(flags.countries[j].name == team2)
			{
				team2flag = flags.countries[j].emoji;
			}
		}

		//Add the predictions to the tweet (flags, scores and match code)
		Tweet += team1flag + guessScore(team1, team2, round) + team2flag + "  #" + team1code + team2code + "\n";
	}

	//Post the tweet
	T.post('statuses/update', { status: Tweet + "\n\n#WorldCup2018"}, function(err, data, response) {
			 	//console.log(data)
		})

	//Log what has been tweeted
	console.log("Tweeted predictions:\n" + Tweet + "\n\n\n");
}

//Called in the Quarter-finals' and Semi-finals' matches due to the JSON file structure
function tweetIt(data, round, dd, flag)
{
	//Get current date
	var date = new Date();
	var day = date.getMonth() + 1 + '' + date.getDate();
	var month = date.getMonth() + 1;

	//Prepare the tweet
	var Tweet = "Predictions for the matches of the day (" + date.getDate() + "/0" + month + "/" + "2018):\n\n";

	//Get a list of today's matches
	let matches = data.rounds[round].matches;

	if(flag == 0) //Day has two matches
	{
		//Get the predictions and add to the tweet
		Tweet += getInfo(matches, dd, round); //Match 1
		Tweet += getInfo(matches, dd + 1, round); //Match 2
	}
	else if(flag == 1) //Day has one match
	{
		//Get the predictions and add to the tweet
		Tweet += getInfo(matches, dd, round); //Match 1
	}

	//Post the tweet
	T.post('statuses/update', { status: Tweet + "\n\n#WorldCup2018"}, function(err, data, response) {
			 	//console.log(data)
		})

	//Log what has been tweeted
	console.log("Tweeted predictions:\n" + Tweet + "\n\n\n");
}

//Returns the predictions ready to add to the tweet. Only called in the Quarter-finals' and Semi-finals' matches due to the JSON file structure
function getInfo(matches, d, round)
{
	//Get the teams' names
	var team1 = "" + matches[d].team1.name;
	var team2 = "" + matches[d].team2.name;

	//Get the teams' codes
	var team1code = "" + matches[d].team1.code;
	var team2code = "" + matches[d].team2.code;

	//Get the teams' flags
	var team1flag;
	var team2flag;

	for(let j = 0; j < flags.countries.length ; j++) //Loop through every country participating in the World Cup
	{
		//If it is one of the contries playing in the match
		if(flags.countries[j].name == team1)
		{
			team1flag = flags.countries[j].emoji; //Get its emoji flag
		}
		else if(flags.countries[j].name == team2)
		{
			team2flag = flags.countries[j].emoji;
		}
	}

	//Return the prediction ready to add to the tweet
	return team1flag + guessScore(team1, team2, round) + team2flag + "  #" + team1code + team2code + "\n";
}

//Guess the outcome and scores of a match
function guessScore(team1, team2, round)
{
	//Emojis used in the tweet besides the flags
	var winner = "🐙";
	var loser = "✖️";
	var draw = "➖";

	//Get the teams' odds
	for(let j = 0; j < flags.countries.length ; j++)
	{
		if(flags.countries[j].name == team1)
		{
			var team1odds = parseInt(flags.countries[j].odds);
		}
		else if(flags.countries[j].name == team2)
		{
			var team2odds = parseInt(flags.countries[j].odds);
		}
	}

	//Get relative odds for each team (ex. team 1 60% - 40% team 2)
	var totalodds = team1odds + team2odds;
	var team1perc = Math.floor((team1odds / totalodds) * 100);
	var team2perc = Math.floor((team2odds / totalodds) * 100);

	//Pick winners/tie and scores
	if(Math.abs(team1perc - team2perc) <= 15 && round > 14) //If both teams have similar odds (within 15% of each other) pick a random winner and prevent ties (elimination match)
	{
		var team1goals = getRandom();
		var team2goals = getRandom();
		while(team1goals == team2goals)
		{
			team1goals = getRandom();
			team2goals = getRandom();
		}
	}
	else if(Math.abs(team1perc - team2perc) <= 15) //If both teams have similar odds (within 15% of each other) pick a random winner
	{
		var team1goals = getRandom();
		var team2goals = getRandom();
	}
	else if(team1perc > team2perc) //If team 1 has significantly better odds than team 2 then pick team 1 as winner and determine a score
	{
		var team1goals = getRandom();
		var team2goals = getRandom();
		while(team1goals <= team2goals) //Guarantee that team 1 is the winner
		{
			team1goals = getRandom();
			team2goals = getRandom();
		}
	}
	else if(team2perc > team1perc) //If team 2 has significantly better odds than team 1 then pick team 2 as winner and determine a score
	{
		var team1goals = getRandom();
		var team2goals = getRandom();
		while(team2goals <= team1goals) //Guarantee that team 2 is the winner
		{
			team1goals = getRandom();
			team2goals = getRandom();
		}
	}

	//Return prediction to add to the tweet
	if(team1goals > team2goals)
		return " " + winner + "  " + team1goals + " - " + team2goals + "  " + loser;
	else if(team2goals > team1goals)
		return " " + loser + "  " + team1goals + " - " + team2goals + "  " + winner;
	else if(team1goals == team2goals)
		return " " + draw + "  " + team1goals + " - " + team2goals + "  " + draw;
}

//Determine the scores
function getRandom()
{
	var number = Math.floor((Math.random() * 100) + 1); //Get a random number from 1 to 100

	if(number >= 0 && number <= 20) //20% chance of scoring 0 goals
		return 0;
	else if(number > 20 && number <= 58) //38% chance of scoring 1 goal
		return 1;
	else if(number > 58 && number <= 88) //30% chance of scoring 2 goals
		return 2;
	else if(number > 88 && number <= 98) //10% chance of scoring 3 goals
		return 3;
	else if(number > 98 && number <= 99) //1% chance of scoring 4 goals
		return 4;
	else if(number > 99 && number <= 100) //1% chance of scoring 5 goals
		return 5;
}
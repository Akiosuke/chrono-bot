const Discord = require('discord.js');
const bot = new Discord.Client();

let currentTimer = 0;
let stopChrono = false;

function secondsToString(seconds) {
		return ""+Math.floor(seconds/3600)+"h"+Math.floor(seconds/60)+"m"+Math.floor(seconds%60)+"s"
}

function strTimeToSeconds(strTime) {
		let expectedRegex = /[0-9]+\:[0-9]{2}\:[0-9]{2}/g;

		if (null === strTime.match(expectedRegex)) {

			return -1;

		} else {

			exploded = strTime.split(':');
			hoursStr = exploded[0];
			minutesStr = exploded[1];
			secondsStr = exploded[2];
			return 3600 * parseInt(hoursStr, 10) + 60 * parseInt(minutesStr, 10) + parseInt(secondsStr, 10);

		}
}

function processTimer() {
	setTimeout(function() {
		if (stopChrono) {
			return;
		} else {
			currentTimer += 1;
			processTimer();
		}
	}, 1000)
}

bot.on('message', message => {

	if (!message.content.startsWith('!') || message.author.bot) return;

	const args = message.content.slice().split(/ +/);
	const command = args.shift().toLowerCase();

	if ('!chrono' === command) {
		message.channel.send('Le chrono est actuellement à ' + secondsToString(currentTimer));
	}

	if ('!stop' === command) {
		stopChrono = true;
	}

	if ('!start' === command) {
		stopChrono = false;
		processTimer();
	}

	if ('!continue' === command) {
		stopChrono = false;
	}

	if ('!restart' === command) {
		stopChrono = false;
		currentTimer = 0;
		processTimer();
	}

	if ('!minuteur' === command) {
		message.channel.send('Pas encore prêt :\'(');
	}

});

bot.login("NjY2Mzg3MTY3OTM2Nzc0MTg2.Xhzdqw.PvctuF0-LUobDbie2v4jX7WHE2A");

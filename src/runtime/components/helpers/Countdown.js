/*
var c = new Countdown( secondsLeft );

c.onTick = function( time ) {
	
};

c.onFinish = function() {
	
};

c.start();
*/
var Countdown = function( secondsLeft, totalSeconds ){
		
	this.timer			= null;
	this.time			= null;
	this.progress		= 100;
	this.secondsLeft	= secondsLeft;

	this.secToTime = function( sec ){
		var secondsInAMinute = 60;
		var secondsInAnHour  = 60 * secondsInAMinute;
		var secondsInADay    = 24 * secondsInAnHour;

		// get days
		var days = Math.floor(sec / secondsInADay);

		// get hours
		var hourSeconds = sec % secondsInADay;
		var hours = Math.floor(hourSeconds / secondsInAnHour);

		// get minutes
		var minuteSeconds = hourSeconds % secondsInAnHour;
		var minutes = Math.floor(minuteSeconds / secondsInAMinute);

		// get remaining seconds
		var remainingSeconds = minuteSeconds % secondsInAMinute;
		var seconds = Math.floor(remainingSeconds);


		if (hours < 10) hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;
		if (seconds < 10) seconds = '0' + seconds;
	
		return {
			d: days, h: hours, m: minutes, s: seconds, 
			full: days +' days, '+ hours +' hours, '+ minutes +' minutes, '+ seconds +' seconds.',
			progress: this.progress
		};
	}
	
	this.setTime = function( secondsLeft, totalSeconds ){
		this.secondsLeft = secondsLeft;

		if ((totalSeconds === undefined) || (totalSeconds === null)) {
			this.totalSeconds = secondsLeft;
			this.totalDays = 365;
			this.totalHours = 24;
		} else {
			this.totalSeconds = totalSeconds;
			this.totalDays = this.secToTime( this.totalSeconds ).d;
			this.totalHours = this.secToTime( this.totalSeconds ).h;
		}
	}
	this.setTime( secondsLeft, totalSeconds );
	
	this._update = function(){
		if ((this.secondsLeft-1) >= 0) {
			this.secondsLeft--;
			
			this.time = this.secToTime( this.secondsLeft );
			this.progress = 100 - (this.secondsLeft * 100 / this.totalSeconds);

			if (this.hasOwnProperty( 'onTick' )) {
				this.onTick( this.time );
			}
			
		} else {
			this.stop();
		}
	}
	
	this.start = function(){
		if (this.timer == null) {
			this.timer = setInterval(this._update.bind(this), 1000);
			this._update();
		}
	}
	
	this.pause = function(){
		clearInterval( this.timer );
		this.timer = null;
	}
	
	this.stop = function(){
		clearInterval( this.timer );
		this.timer = null;
		this.secondsLeft = 0;
		this.time = this.secToTime( this.secondsLeft );
		if (this.hasOwnProperty( 'onTick' )) {
			this.onTick( this.time );
		}
		if (this.hasOwnProperty( 'onFinish' )) { 
			this.onFinish(); 
		}
	}
	
	this.getSeconds = function(){
		return this.secondsLeft;
	}

	this.destroy = function() {
		this.stop();
	}
};

function calcSecondsLeft( date ) {
	var left = 0, total = 0;

	// Seconds left
	var endDate = new Date(Date.UTC(
			date.end.year, date.end.month-1, date.end.day, date.end.hour, date.end.minute, date.end.second
		)),
		now = new Date(),
		offset = date.timezone * 60 * 60;
		
	left = (endDate.getTime()/1000 - now.getTime()/1000) - offset;

	// Total seconds
	if (date.start != null) {
		var startDate = new Date(Date.UTC(
			date.start.year, date.start.month-1, date.start.day, date.start.hour, date.start.minute, date.start.second
		));
		total = endDate.getTime()/1000 - startDate.getTime()/1000;
	} else {
		total = null;
	}

	return { total: total, left: left };
}

export default Countdown;
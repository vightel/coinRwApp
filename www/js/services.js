angular.module('starter.services', [])

.factory('Scan', function() {
	var result = {
		read_count: 		0,
		last_read: 			undefined,
		
		write_count: 		0,
		last_write: 		undefined,
		
		// Last QR scan result
		url: 				undefined,
		format: 			undefined,
		cancelled: 			undefined
	}
	return {
		// QR Scan
		set: function(url, format, cancelled, now ) {
			result.url 			= url;
			result.format		= format;
			result.cancelled	= cancelled;
			result.last_read	= now;
			result.read_count++;
		},
		
		// NFC Write
		set_last_write: function(lw) { 
			result.last_write = lw;
			result.write_count++;
		},
		
		result: function() { return result; }
	}
})

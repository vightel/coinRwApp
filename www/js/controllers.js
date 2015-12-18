angular.module('starter.controllers', ['ionic', 'ngCordova', 'nfcFilters'])

.controller('DashCtrl', function($scope, Scan) {
	$scope.result = Scan.result();
})

//
// QR Controller
//
.controller('QRCtrl', function($scope, $cordovaBarcodeScanner, Scan) {
	
	var readQR = function() {
		$cordovaBarcodeScanner.scan().then(function(imageData) {
			alert(imageData.text);
			console.log("Barcode Format -> " + imageData.format);
			console.log("Cancelled -> " + imageData.cancelled);
	
			$scope.settings = {
			    url: 		imageData.text,
				format: 	imageData.format,
				cancelled: 	imageData.cancelled
			}
		
			var now = moment().format()
			Scan.set(imageData.text, imageData.format, imageData.cancelled, now)
		
		}, function(error) {
			console.log("An error happened -> " + error);
		});
	}
	
	//
	// Enter NFC Write View
	//
	$scope.$on('$ionicView.enter', function(){
		console.log("enter readQR...");
		readQR();
	});
	
	//
	// Leave NFC Write View
	//
	$scope.$on('$ionicView.leave', function(){
		console.log("leave readQR...");
	});
})

//
// NFC Write Controller
//
.controller('NFCCtrlW', function($scope, $ionicPlatform, $cordovaVibration, Scan) {
	console.log("NFCCtrlW...");
	var qr_scan = Scan.result();
	
	$scope.settings = {
		url: 	qr_scan.url,
		msg: 	undefined,
		err: 	undefined,
	};
	
	// Event Listener
	var eventListener = function(nfcEvent) {
		var now = moment().format()
		$scope.settings.date = now
		
		console.log("Got tag...writing...", now)
		var message = [
			ndef.uriRecord($scope.settings.url),
			ndef.textRecord(now)
		];
		
		var success = function() {
			console.log("Wrote data to tag");
			$cordovaVibration.vibrate(1000)
			
			Scan.set_last_write(now)
		
			// write once
			nfc.removeNdefListener(eventListener );
			
			$scope.settings.err='200 OK'
			$scope.$apply()
		};
		
		var failure = function(reason) {
			$scope.settings.err='500 - NFC Write Failed '+ reason
			$scope.$apply()
		};
				
		nfc.write(message,success, failure);		
	}
	
	//
	// Enter NFC Write View
	//
	$scope.$on('$ionicView.enter', function(){
		console.log("enter writeTag...");
		$ionicPlatform.ready(function() {
			var win 	= function() { console.log("added Ndef listener...")}
			var fail 	= function() { 
				$scope.settings.err='500 - Failed adding Ndef listener'	
			}

			// Wait for NDEf Tag and write to it
			nfc.addNdefListener(eventListener, win, fail )
		});
	});
	
	//
	// Leave NFC Write View
	//
	$scope.$on('$ionicView.leave', function(){
		console.log("leave writeTag...");
	});
})

//
// NFC Read Controller
//
.controller('NFCCtrlR', function($scope, $ionicPlatform, $cordovaVibration) {
	console.log("NFCCtrlR...");
	$scope.settings = {
		url: 	undefined,
		msg: 	undefined,
		err: 	undefined,
		tag: 	undefined
	};
	
	var eventListener = function(nfcEvent) {
		$cordovaVibration.vibrate(1000)
		
		var now 				= moment().format()
		$scope.settings.date 	= now
		
		$scope.tag				= nfcEvent.tag	
		$scope.settings.err		= '200 OK'
		
		$scope.$apply();
	}
	
	//
	// Enter NFC Read View	
	//
	$scope.$on('$ionicView.enter', function(){
		console.log("enter readTag...");
		$ionicPlatform.ready(function() {
			$scope.tag = undefined

			var win 	= function() { console.log("added Ndef listener...")}
			var fail 	= function() { 
				$scope.settings.err='500 - Failed adding Ndef listener'	
			}
	
			nfc.addNdefListener(eventListener, win, fail);
		});
	});
	
	//
	// Leave View
	//
	$scope.$on('$ionicView.leave', function(){
		// Remove NDef listener
		nfc.removeNdefListener(eventListener)
		console.log("leave readTag...");
	});
})
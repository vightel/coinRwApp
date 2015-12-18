CoinsForVal QR Code Reader and NFC Writer Application
=====================================================

This android application allows you to read a QR code and write to an NFC tag with previously read URL. 
It can also read the NFC tag back for verification.

This application uses NDEF (NFC Data Exchange Format) for maximum compatibilty between NFC devices, tag types, and operating systems.

Supported Platforms
-------------------
* Android


# Testing
	Connect an Android to your local machine via USB.  Enable USB remote debugging (see: https://developer.chrome.com/devtools/docs/remote-debugging)
	
	$ ionic build android
	$ ionic run android
	
On your local machine, start Chrome and go to: chrome://inspect


# Credits:

* [Ionic Framework](http://ionicframework.com/)
* [phonegap-nfc](https://github.com/chariotsolutions/phonegap-nfc)
* [read-and-write-nfc-tags-with-phonegap-2](http://chariotsolutions.com/blog/post/read-and-write-nfc-tags-with-phonegap-2/)
* [implement-barcode-scanner-using-ionic-framework](https://blog.nraboy.com/2014/09/implement-barcode-scanner-using-ionic-framework/)
* [how-to-run-ionic-on-real-devices](http://junerockwell.com/how-to-run-ionic-on-real-devices/)

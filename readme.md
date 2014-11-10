Push Notification Sample App
============================
A PhoneGap app built with Ionic and ngCordova to demonstrate how to register for and receive push notifications. 

###Push Notification Sample Node Service node-apn
This sample also includes a node service example called sendMsg.js for sending push notifications using the [node-apn](https://github.com/argon/node-apn)
library. 
 
###node-pushserver 
Check out [node-pushserver](https://www.npmjs.org/package/node-pushserver) to manage push notifications and device tokens with mongodb. This sample includes a subscribe.js file
sample node/express service which can be used to subscribe a user and token for push notifications.

###ngCordova
`ngCordova` is an AngularJS wrapper library for working with Cordova plugins. It's essentially a set of directives
implemented with promises to help keep your plugin code clean, organized and more maintainable.  

Install the following plugins:

- [PushPlugin](https://github.com/phonegap-build/PushPlugin)
- console
- device
- dialogs
- file
- media


    $ ionic plugin add org.apache.cordova.console
    $ ionic plugin add org.apache.cordova.device
    $ ionic plugin add org.apache.cordova.dialogs    
    $ ionic plugin add org.apache.cordova.file
    $ ionic plugin add org.apache.cordova.media
    $ ionic plugin add https://github.com/phonegap-build/PushPlugin


Push Notification Sample App
============================
A sample mobile application built with [Ionic](http://ionicframework.com) and [ngCordova](http://ngcordova.com/) to demonstrate how to register for and receive push notifications on iOS
and Android. Once the device registration token is received, it is sent to a locally running node service where it will be stored for 
later use when a push notification needs to be broadcast to all subscribed devices using [node-pushserver](https://www.npmjs.org/package/node-pushserver). 
The setup to use node-pushserver is discussed more below but see the npm site for specific setup details. 

#### ** See [related blog post](http://devgirl.org/2014/12/16/push-notifications-sample-app-with-ionic-and-ngcordova/) for more details!


### Push Notification Sample on iOS
![](screenshots-blog/IMG_0009.jpg) ![](screenshots-blog/IMG_0012.jpg) ![](screenshots-blog/ios-swipe.png)
![](screenshots-blog/ios-app.png) 


### Push Notification Sample on Android Nexus 7
![](screenshots-blog/android-statusbar-pull.png) ![](android-foreground.png) ![](screenshots-blog/android-app.png) 


### ** PRE-REQUISITES 

You must install the following plugins for this app to work properly:

- [PushPlugin](https://github.com/phonegap-build/PushPlugin)
- console
- device
- dialogs
- media
- file
- [ToastPlugin](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin) 


        $ ionic plugin add org.apache.cordova.console
        $ ionic plugin add org.apache.cordova.device
        $ ionic plugin add org.apache.cordova.dialogs    
        $ ionic plugin add org.apache.cordova.file
        $ ionic plugin add org.apache.cordova.media
        $ ionic plugin add https://github.com/phonegap-build/PushPlugin
        $ ionic plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git



## Sending Push Notifications to your App

A couple options are included for sending push notifications to this application. You can use node-pushserver to store multiple device tokens
from different platforms and send in bulk, or if you just want to test sending one simple message, there are two simple node services included
to do that as well (node-apn and node-gcm). 

### Send to Multiple Devices and Store Tokens (better approach)
####node-pushserver 
Check out [node-pushserver](https://www.npmjs.org/package/node-pushserver) to manage push notifications and device tokens with [mongodb](www.mongodb.org) database. This sample includes a subscribe.js file
sample node/express service which can be used to subscribe a user for push notifications from the app. You can then send push notifications
from your the web browser easily and quickly using their UI as shown here. 

*The app is currently setup to point to my local instance of pushserver so you can just change it to your URL to use this approach.*

![](screenshots-blog/push-server.png) 

When the app starts it will automatically try to register the user for push notifications. It will then retrieve the device token from the result
and store it with the platform type (ios, android) (along with a random user name currently) thru a call to the node-pushserver API 
into a [mongodb](www.mongodb.org) database. You
will need to provide your mongodb database name and configuration details to use node-pushserver in the config.json file as shown in 
[Step 3 here](https://www.npmjs.org/package/node-pushserver) and supply the path to your version of the file when you start it up. 

Then modify the URL in the project js/controllers.js file to match your own 
setup. If you're running your node-pushserver instance from localhost, you may have to provide the explicit URL from your local network settings such as below:  


*Change this line in PushNotificationSample/www/js/controllers.js to match your own network URL where you're running node-pushserver:*
    
    $http.post('http://192.168.1.5:8000/subscribe', JSON.stringify(user)

### Sending to *One Device* Manually (quick testing)

*The app is currently setup to receive push notifications from this approach as well. You just need to update the sendMsg.js or sendGCM.js files
 to use your device tokens and certificates as needed.*

#####iOS (APNS) Simple Node Service to send push notifications
I've also included a node service example called sendMsg.js for sending push notifications using the [node-apn](https://github.com/argon/node-apn)
library to your iOS devices. Run this manually with your own configuration from node.

  `$ node sendMsg.js`
 
#####Android (GCM) node-gcm Simple Node Service to send push notifications
This sample also includes a node service example called sendGCM.js for sending push notifications using the [node-gcm](https://github.com/ToothlessGear/node-gcm)
library to your Android devices. 
  
  `$ node sendGCM.js`

#####Extra
*subscribe.js* is yet another node service that can be used to manually add a user and token into your locally running node-pushserver instance
instance.
  
  `$ node subscribe.js`


####Resources - HIGHLY RECOMMENDED REFERENCES

The answers to your questions about [Apple Push Notifications](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW9) and [Google Cloud Messaging](http://developer.android.com/google/gcm/gs.html) configuration can be found in my previous 
posts. If you're not familiar with the setup, you will save yourself headache at least reading thru the configuration portion
for each. You will need certain resources from them and have to specifically enable your iOS for Push Notifications thru the Apple
Developer site. 

1-[Very explanatory post](http://blogs.telerik.com/appbuilder/posts/14-01-14/let's-get-push-notifications-working-in-phonegap-and-ios?utm_content=buffer751c3&utm_medium=social&utm_source=app.net&utm_campaign=buffer) with screenshots 
by [Burke Holland](https://twitter.com/burkeholland) to walk you through Apple Push Notification setup. 

2-[My tutorial on iOS/Apple Push Notifications](http://devgirl.org/2012/10/19/tutorial-apple-push-notifications-with-phonegap-part-1/)  

3-[My tutorial on Android/GCM](http://devgirl.org/2012/10/25/tutorial-android-push-notifications-with-phonegap/)

4-[My PushPlugin Basic Tutorial](http://devgirl.org/2013/07/17/tutorial-implement-push-notifications-in-your-phonegap-application/)

###More about ngCordova
`ngCordova` is an AngularJS wrapper library for working with Cordova plugins. It's essentially a set of AngularJS directives
to help keep your plugin code clean, organized and more maintainable. I've included the library already in the /lib folder
but you will need to be sure all of the required plugins are installed:

####Miscellaneous/Setup Notes####

1-Run mongo
    `$ mongod`
    
    or 
     `$ sudo mongod`

2-Run [pushserver](https://www.npmjs.org/package/node-pushserver)

    `$ pushserver -c config.json`
    
3-If running from localhost, ensure you're use the raw ip address of your network in the controllers.js (192.168.1.*) unless you 
have some other way to map your localhost name.

** You'll need to refresh your browser to get the new users/tokens to load if you don't default to all before sending a message.

4-If you think all is setup right but don't receive notifications on your Android device, ensure you're using an API credentials key in your service that is associated with the GCM project id
you specific in controllers.js. 

**iOS Sample Message Payload** 

[{"badge":"0","sound":"soundName","alert":"Jennifer L liked your photo","foreground":"0"}]

**Android Sample Message Payload**
[{"message":"Tori432 commented on your photo: Awesome!","payload":{"message":"Tori432 commented on your photo: Awesome!"},"collapse_key":"optional","from":"824841663931","foreground":true,"event":"message"}]"

###Unregistering - When a user deletes/uninstalls your app
In the sample app you will see that the local `unregister` method is simply removing the device token from the database, not calling the `unregister()`
 method in the PushPlugin. Please read the following links to get the details about why this is recommended, followed by some more details regarding
 invalid token handling for each platform:

- [Android Unregister](http://developer.android.com/google/gcm/adv.html#unreg-why)
- [Apple Unregister](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications) 
 
###Removing device tokens from your 3rd party server
So how do you determine when to remove a device token from your own 3rd party server so you don't have unnecessary overhead? The two services
handle it differently, below are some details and further links to check out:

**GCM Handling**

Google notes that 'When users uninstall an application, it is not automatically unregistered on GCM. It is only unregistered when the GCM server tries to send a message to the device and the device answers that the application is uninstalled or it does not have a broadcast receiver configured to receive com.google.android.c2dm.intent.RECEIVE intents. 
At that point, your server should mark the device as unregistered (the server will receive a NotRegistered error).'

See [this link](http://developer.android.com/google/gcm/adv.html) for advanced concepts and other useful information surrounding this. 

**Apple's Feedback Service**
APNs provides a useful [Feedback Service](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html#//apple_ref/doc/uid/TP40008194-CH101-SW3) 
that can be queried to find any device tokens that are no longer valid, for instance if the user deleted your app from their device. Apple recommends
you query the service once per day to find any invalid tokens and remove them from your own database to reduce unnecessary message overhead and improve overall system performance. 

The [pushserver](https://www.npmjs.org/package/node-pushserver) library also has an interface built into it for accessing this service 
that you can take advantage of. It is also configured via the config.json file. If a device token is found to be invalid, it should be
reported in the terminal window where pushserver is running. 


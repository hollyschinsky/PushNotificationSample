/**
 * Created by hollyschinsky on 11/4/14.
 */
app.controller('AppCtrl', function($scope, $cordovaPush, $cordovaDialogs,ionPlatform) {
    var iosConfig = {
        "badge": "true",
        "sound": "true",
        "alert": "true"
    };


    // Used ionicPlatform ready in a factory with promises to ensure it's ready here before calling register.
    // Race condition when trying to call and set the id from app.js since this ctrl was loaded first and reg id not set yet.
    ionPlatform.ready.then(function(device){
        console.log("DEVICE READY!")
        $scope.register();
    });

    $scope.register = function() {
         $cordovaPush.register(iosConfig).then(function(result) {
             // Success!
             console.log("Register success " + result);
             $scope.regId = result;

         }, function(err) {
             // An error occurred. Show a message to the user
             console.log("Register error " + err)
         });
     }

    $scope.unregister = function() {
        console.log("Unregister called");
        $cordovaPush.unregister(options).then(function(result) {
            console.log("Unregister success " + result)
        }, function(err) {
            console.log("Unregister error " + err)
        });
    }

    /** This will get called even when app is closed or in background and the user clicks on the notification.
     * You can check the foreground field to determine how you want to handle the data. The push notification
     * will be shown regardless of application state with this code.
     */
    $scope.$on('pushNotificationReceived', function(event, notification) {
        console.log("*** NOTIFIED!!! *** ");
        console.log(JSON.stringify(['pushNotificationReceived', notification]));

        // The app was already open but we'll still show the alert and sound the tone received this way...
        if (notification.foreground=="1") {
            if (notification.sound) {
                console.log("Sound " + notification.sound);
                var beep = new Media(notification.sound,
                    // success callback
                    function () { console.log("Audio Success"); },
                    // error callback
                    function (err) { console.log("Audio Error: " + err); }
                );

                // Play custom audio if a sound specified
                beep.play();
            }

            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

            if (notification.badge) {
                console.log("Set Badge to custom # " + notification.badge);
                $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
                    // Success!
                    console.log("Success " + result)
                }, function(err) {
                    console.log("Set badge error " + err)
                });
            }
        }
        // Otherwise it was received in the background and reopened from the push notification so clear the badge count
        // If you didn't hit the register button to listen for pushNotification events when app first started, this will
        // not run until you hit it upon reopen from push notification. So you may get messages after you hit the register
        // button (when started it from a push notification).
        else {
            // Could still process the data here if desired, but already received their push notification and tone and the badge
            // was cleared automatically in this case from both alert style and banner style.
            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, "(RECEIVED) "+notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "(RECEIVED) Push Notification Received");
        }
    });
});

/** ADDITIONAL NOTES **/
//    var androidConfig = {
//        "senderID":"replace_with_sender_id"
//    };

// (optional) custom notification handler


// If you set "ecb" in the config object, the 'pushNotificationReceived' angular event will not be broadcast.
// You will be responsible for handling the notification and passing it to your contollers/services
//androidConfig.ecb = "myCustomOnNotificationHandler"
//iosConfig.ecb = "myCustomOnNotificationAPNHandler"

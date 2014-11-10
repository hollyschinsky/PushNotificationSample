app.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
        console.log("Ready resolve");
    });

    return {
        ready: ready.promise
    }
})
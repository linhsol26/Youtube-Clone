// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    //dán key của fire tại đây
    apiKey: "AIzaSyAATDWsw5UAvA8Q4pzBWzsF5WPEJXHPokI",
    authDomain: "auth-test-d5848.firebaseapp.com",
    databaseURL: "https://auth-test-d5848.firebaseio.com",
    projectId: "auth-test-d5848",
    storageBucket: "",
    messagingSenderId: "916765010526",
    appId: "1:916765010526:web:d950508dea0dbd68"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

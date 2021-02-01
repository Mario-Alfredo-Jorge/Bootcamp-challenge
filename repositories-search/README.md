# repository_seacher
This is a simple application built with two versions, web and mobile, which has the purpose of searching for repositories using the github api.

## Web 
   the web version is so simple, we user the Localstorage to save some data of repositories, somithing like name of repositories.
   
   ### HO to run
          yarn start or npm start
          
          
 ## Mobile 
  In this version of the application, the same things were implemented as in the web version, I used AsyncStorage for data storage, going a little bit deeper, I learned the implementation of the famous component 'webview' as well as an infinite Scroll in FlatLists rendering on the screen 30 new repositories every 20% of the end of each list
  
  ### how to run
      yarn/npx react-native run-android or yarn/npx react-native run-ios

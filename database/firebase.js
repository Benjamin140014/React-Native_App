// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBRdxqBPTRmCFOjalGimdoIOXrC3zZk_3U",
    authDomain: "myapp-bded7.firebaseapp.com",
    databaseURL: "https://myapp-bded7.firebaseio.com",
    projectId: "myapp-bded7",
    storageBucket: "myapp-bded7.appspot.com",
    messagingSenderId: "451143818273",
    appId: "1:451143818273:web:7451d6ca47374118ce9760",
    measurementId: "G-LZ42E8KTNB"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDOL_0_x_HBbFwC1V5domK12cRq2PVnB8I",
    authDomain: "messenger-mobile.firebaseapp.com",
    databaseURL: "https://messenger-mobile.firebaseio.com",
    projectId: "messenger-mobile",
    storageBucket: "",
    messagingSenderId: "388469856702",
    appId: "1:388469856702:web:9fdc6403798a1392"
};
firebase.initializeApp(config);

export default firebase;
import Firebase from 'firebase/app';
import 'firebase/storage';

const firebase = Firebase.initializeApp({
  apiKey: 'AIzaSyDZRqVz-RMeDzzzB6ovPz949Z9edRrU49M',
  authDomain: 'demographql-1.firebaseapp.com',
  projectId: 'demographql-1',
  storageBucket: 'demographql-1.appspot.com',
  messagingSenderId: '776915797039',
  appId: '1:776915797039:web:a2e0166d6615df36d732da',
  measurementId: 'G-8D285H318Q',
});

const storage = firebase.storage();
export { storage };

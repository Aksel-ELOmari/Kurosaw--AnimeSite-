import firebase from './firebase/app';
import 'firebaseauth';

// #Google singing function#
export const googleSigning = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('succesfully Logged with Google'))
    .catch((error)=> console.log(error));
}

// #facebook singing function#
export const facebookSigning = ()=>{
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => console.log('succesfully Logged with facebook'))
    .catch((error)=> console.log(error));
}


export const signOut = function(){
    firebase.auth().signOut()
    .then(result => console.log('user successfully singed out',result))
    .catch(error => console.error('ther was an error with singing out',error));
}
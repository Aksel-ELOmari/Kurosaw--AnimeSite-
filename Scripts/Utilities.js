import firebase from "firebase/compat/app";
import 'firebase/auth';

export const assignClick = (elementId,func)=>{
    const click_btn = document.querySelector(elementId);
    click_btn.onclick = () => func;
}

// # fire base function that targets the users that ar singed in or not #
export const inistializeNavButtons = function(){
    const nav_bag = document.querySelector('.bag');
    if(nav_bag){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                nav_bag.style.display = 'none';
            }else{
                nav_bag.style.display = 'block';
            }
        })
    }
}


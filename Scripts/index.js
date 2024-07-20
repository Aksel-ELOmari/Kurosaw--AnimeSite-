// Light Lump
function toggleReview(){
    const Reviewsection = document.querySelector('#addingreview-section');
    Reviewsection.classList.toggle('d-none');
}

const Characters_Cards = document.querySelectorAll('.CharacterCard');
Characters_Cards.forEach(character =>{
        character.addEventListener('mouseenter',()=>{
            console.log('you have moused over the character');
            fetchactores(character);
        })
    })

let Characters = [
    {id:'01',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
    {id:'02',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
    {id:'03',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
    {id:'04',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
    {id:'05',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
    {id:'06',name:'Ayoub',img:'./imgs/home/special/Tokyo Revengers.jpg',role:'Actore'},
]

function fetchactores(character){
    Characters.forEach(Ch =>{
        let {name,img,role} = Ch;
        let character_Id = character.getAttribute('data-id');
        if(Ch.id == character_Id ){
            console.log(Ch);
            let chProfile = character.querySelector('img');
            let ChName = character.querySelector('.Actor-CharacterName');
            let ChRole = character.querySelector('.Role-job');
            chProfile.src = img;
            console.log(chProfile);
            ChName.innerHTML = name;
            ChRole.innerHTML = role;
        }else{return;}
    })
}


// Creating New Reviews Function 
function addReview(){
    let review_text = document.querySelector('#review-input').value;
    let M = new Date().getMonth();
    M < 10?Month=`0${M}`:Month = M;
    let Year = new Date().getFullYear();
    let Day = new Date().getDate();

    let date =  Day+ ' '+Month+' '+Year;
    let placeholder = document.querySelector('.Reviews-holder');
    let userreview = document.createElement('div');
    userreview.classList.add('user-review','flex','gap-3','mb-4');
    userreview.innerHTML = 
    `
        <img src="./imgs/home/popular/Violet_Evergarden.webp" alt="" class="user-profile">
        <div class="review-body mt-2">
            <div class="review-header flex-center">
                <h6 class="user-name h5 me-2">Ayoub</h6>
                <span class="released-date">${date}</span>
            </div>
            <p class="user-review-text me-2">${review_text}</p>
        </div>
    `;
    placeholder.append(userreview);
}


function toggleSections(btn){
    const preview_sections = document.querySelectorAll('.PreviewSection');
    preview_sections.forEach(el =>{
        el.classList.add('d-none');
        let data_name = el.getAttribute('data-name');
        let target_name = btn.getAttribute('data-target');
        if(data_name == target_name){
            el.classList.toggle('d-none');
            // el.classList.remove('d-none');
        }
    })
}
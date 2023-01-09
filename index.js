const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL+'/api/v1/users'

const dataPanel = document.querySelector('.data-panel')


const maleState = {
    ALL:'ALL',
    MALE:'MALE',
    FEMALE:'FEMALE',
}

const model = {
    users: [],
    maleUsers:[],
    femaleUsers:[],
    favorite:[],
    num:0,
}

const view = {
    getFirstUser(users){
        let rawHTML = ''
        rawHTML = `
        <div class="card bg-body-tertiary" style="width: 36rem;">
            <img src="${users[model.num].avatar}" class="card-img-top img-fluid rounded-circle border border-4" alt="...">
            <div class="card-body mb-2">
                <h3 class="card-title">${users[model.num].name} ${users[model.num].surname}</h3>
                <p class="birthday fs-5"><i class="fa-solid fa-calendar-days me-4"></i>${users[model.num].birthday}</p>
                <p class="country fs-5"><i class="fa-sharp fa-solid fa-earth-americas me-4"></i>${users[model.num].region}</p>
                <p class="email fs-5"><i class="fa-solid fa-envelope me-4"></i>${users[model.num].email}</p>
            </div>
            <div class="card-footer d-flex doYouLike p-0 mt-2">
                <div class="w-100 text-center like p-2" data-id="${users[model.num].id}">
                    <i class="fa-solid fa-o fs-4 ms-5 like" data-id="${users[model.num].id}"></i>
                </div>
                <div class="w-100 text-center dLike p-2">
                    <i class="fa-solid fa-x fs-4 me-5 dLike"></i>
                </div>
            </div>
        </div>
        `
        return rawHTML
    },
    
    findFavorite(id){
        const favoriteUser =  model.users.find((user)=>user.id == id)
        model.favorite.push(favoriteUser)
        console.log(model.favorite)
    }
}


const controller = {
    currentState: maleState.ALL,
    renderUser(data){
        dataPanel.innerHTML = view.getFirstUser(data)
    }
}

const utility = {
    getRandomUsers(list){
        for(let i=list.length-1 ; i>0 ; i--){
            let randomIndex = Math.floor(Math.random()*(i+1));
            [list[i],list[randomIndex]]= [list[randomIndex],list[i]]
        }
        return list
    }
}


dataPanel.addEventListener('click',e=>{
    if(e.target.classList.contains('like')){
        view.findFavorite(e.target.dataset.id)
        model.num += 1
        localStorage.setItem('favoriteUsers',JSON.stringify(model.favorite))
        controller.renderUser(model.users)
    }
    if(e.target.classList.contains('dLike')){
        model.num += 1
        controller.renderUser(model.users)
    }
})




axios.get(INDEX_URL).then(response=>{
    const info = response.data.results
    for(const users of info){
        model.users.push(users)
    }
    utility.getRandomUsers(model.users)
    controller.renderUser(model.users)
})
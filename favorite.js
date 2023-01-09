const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL+'/api/v1/users'

const dataPanel = document.querySelector('.data-panel')


const model = {
    favorite:[],
}

model.favorite = JSON.parse(localStorage.getItem('favoriteUsers'))

const view = {
    getCardElement(list){
        let rawHTML = ''
        list.forEach((item)=>{
            rawHTML +=`
            <div class="card col-3 m-2" style="width: 18rem">
                <img src="${item.avatar}" class="card-img-top img-fluid rounded-circle border border-4 show-modal" alt="..." data-bs-toggle="modal" data-bs-target="#user-modal" data-id=${item.id}>
                <div class="card-body mb-2">
                    <h4 class="card-title">${item.name} ${item.surname}</h4>
                </div>
                <button class=" doYouLike p-0 m-2 btn btn-primary">
                    <div class="del p-2" data-id=${item.id}>
                        <i class="fa-solid fa-x fs-4 del" data-id=${item.id}></i>
                    </div>
                </button>
            </div>
            `
        })
        return rawHTML
    },

    removeFavorite(id){
        const index =  model.favorite.findIndex((user) => user.id == id)
        model.favorite.splice(index,1)
        localStorage.setItem('favoriteUsers',model.favorite)
        controller.renderFavorite(model.favorite)

    },

}

const controller = {
    renderFavorite(list){
        dataPanel.innerHTML = view.getCardElement(list)
    },

    renderModal(id){
        const index =  model.favorite.findIndex((user) => user.id == id)
        const modalTitle = document.querySelector('.modal-title')
        const modalAge = document.querySelector('.modal-age')
        const modalEmail = document.querySelector('.modal-email')
        const modalImg = document.querySelector('.modal-img')
        const modalRegion = document.querySelector('.modal-region')
        const modalBir = document.querySelector('.modal-birthday')

        modalTitle.innerText = `${model.favorite[index].name} ${model.favorite[index].surname}`
        modalImg.innerHTML = `<img src="${model.favorite[index].avatar}" class="img-fluid modal-img" alt="">`
        modalAge.innerText = `Age: ${model.favorite[index].age}`
        modalRegion.innerText = `Region: ${model.favorite[index].region}`
        modalBir.innerText = `Birthday: ${model.favorite[index].birthday}`
        modalEmail.innerText = `Email: ${model.favorite[index].email}`
    }
}

dataPanel.addEventListener('click', e => {
    if(e.target.classList.contains('del')){
        view.removeFavorite(e.target.dataset.id)
    }

    if(e.target.classList.contains('show-modal')){
        controller.renderModal(e.target.dataset.id)
    }
})


controller.renderFavorite(model.favorite)
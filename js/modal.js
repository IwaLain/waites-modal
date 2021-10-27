const openModal = document.querySelector('#open-modal')
const modal = document.querySelector('#modal')
const closeModal = document.querySelector('.custom_modal__close')


openModal.addEventListener('click', (e) => {
    modal.classList.toggle('visible')
})

closeModal.addEventListener('click', (e) => {
    modal.classList.remove('visible')
})

document.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        modal.classList.remove('visible')
    }
})
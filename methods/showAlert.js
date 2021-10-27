const alert = document.querySelector('.alert')

const showAlert = (type) => {
    switch (type) {
        case 'Success':
            alert.classList.add('alert-success')
            alert.textContent = 'Успешно!'
            break
        case 'Error':
            alert.classList.add('alert-danger')
            alert.textContent = 'Ошибка!'
    }
    alert.classList.toggle('visible')
    setTimeout(() => {
        alert.classList = 'alert'
    }, 1500)
}

export default showAlert
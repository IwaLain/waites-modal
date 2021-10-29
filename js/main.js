const form = document.querySelector('#form')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const sex = document.querySelector('#sex')
const birthday = document.querySelector('#birthday')
const address = document.querySelector('#address')

const profileDescIcon = document.querySelector('#profile-icon')
const profileDescName = document.querySelector('#profile-desc-name')
const profileDescEmail = document.querySelector('#profile-desc-email')
const profileDescPhone = document.querySelector('#profile-desc-phone')
const profileDescSex = document.querySelector('#profile-desc-sex')
const profileDescBirthday = document.querySelector('#profile-desc-birthday')
const profileDescAddress = document.querySelector('#profile-desc-address')

const modal = document.querySelector('#modal')
const openModal = document.querySelector('#open-modal')
const closeModal = document.querySelector('.custom_modal__close')

const alert = document.querySelector('.alert')

let users = []
let userId = 1
let validationErrors = []
let validationIsBad = false

openModal.addEventListener('click', (e) => {
    modal.classList.toggle('visible')
})

closeModal.addEventListener('click', (e) => {
    modal.classList.remove('visible')
})

document.addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.id === 'cancelBtn') {
        modal.classList.remove('visible')
    }
})

const ajaxGet = (url, callback) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                var data = JSON.parse(xhr.responseText)
            }
            catch (err) {
                console.log('err:' + err.message)
                return
            }

            callback(data)
        }
    }

    xhr.send()
}

const ajaxPatch = (url, data, callback) => {
    const xhr = new XMLHttpRequest()

    xhr.open('POST', url, true)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback('Success')
            }
            else {
                callback('Error')
            }
        }
    }

    xhr.send(data)
}

const showAlert = (type) => {
    alert.textContent = ''

    switch (type) {
        case 'Success':
            alert.classList.add('alert-success')
            alert.textContent = 'Успешно!'
            break
        case 'Error':
            alert.classList.add('alert-danger')
            alert.textContent = 'Ошибка!'
            break
        case 'ValidationError':
            alert.classList.add('alert-danger')
            for (let err of validationErrors) {
                alert.textContent += err + ' '
            }

    }
    alert.classList.toggle('visible')
    setTimeout(() => {
        alert.classList = 'alert'
    }, 1500)
}

const validation = (el) => {
    const name = /^[a-zA-Z]+$/
    const phone = /^[0-9\-\+]{9,15}$/

    switch(el.id) {
        case 'firstName':
            if (!name.test(el.value)) {
                validationErrors[0] = 'Name is not valid.'
            } else if (el.value.length <= 3) {
                validationErrors[0] = 'Name must contain more than 3 symbols.'
            } else {
                validationErrors[0] = ''
            }
            break
        case 'lastName':
            if (!name.test(el.value)) {
                validationErrors[1] = 'Name is not valid.'
            } else if (el.value.length <= 3) {
                validationErrors[1] = 'Name must contain more than 3 symbols.'
            } else {
                validationErrors[1] = ''
            }
            break
        case 'phone':
            if (!phone.test(el.value)) {
                validationErrors[2] = 'Phone is not valid.'
            } else {
                validationErrors[2] = ''
            }
            break
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ajaxGet('db.json', (data) => {
        users = data

        firstName.value = users[0].firstName
        lastName.value = users[0].lastName
        email.value = users[0].email
        phone.value = users[0].phone,
        sex.value = users[0].sex,
        birthday.value = users[0].birthday
        address.value = users[0].address

        profileDescIcon.src = users[0].img
        profileDescName.textContent = users[0].firstName + ' ' + users[0].lastName
        profileDescEmail.textContent = users[0].email
        profileDescPhone.textContent = users[0].phone
        profileDescSex.textContent = users[0].sex
        profileDescBirthday.textContent = users[0].birthday
        profileDescAddress.textContent = users[0].address
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    for (let el of form.elements) {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
            console.log(el)
            validation(el)
        }
    }

    validationIsBad = false

    for (let err of validationErrors) {
        if (err) validationIsBad = true
    }

    if (!validationIsBad) {
        let user = {
            id: userId,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            sex: sex.value,
            birthday: birthday.value,
            address: address.value
        }
    
        users = users.map((el) => {
            return el.id === userId ? user : el
        })
    
        modal.classList.remove('visible')
    
        ajaxPatch('db.json', JSON.stringify(users), (res) => {
            showAlert(res)
            profileDescName.textContent = users[0].firstName + ' ' + users[0].lastName
            profileDescEmail.textContent = users[0].email
            profileDescPhone.textContent = users[0].phone
            profileDescSex.textContent = users[0].sex
            profileDescBirthday.textContent = users[0].birthday
            profileDescAddress.textContent = users[0].address
        })
    } else {
        showAlert('ValidationError')
    }
})

window.addEventListener('load', function() {
    document.querySelector('#profile-icon-upload').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#profile-icon')
  
            img.src = URL.createObjectURL(this.files[0])

            /* Requests here */
        }
    })
})

$(() => {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy'
    })
})
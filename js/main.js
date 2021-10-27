import ajaxGet from "../methods/ajaxGet.js"
import ajaxPatch from "../methods/ajaxPatch.js"
import showAlert from "../methods/showAlert.js"

const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const form = document.querySelector('#form')

let users = []

document.addEventListener('DOMContentLoaded', () => {
    ajaxGet('http://localhost:3000/users', (data) => {
        users = data

        firstName.value = users[0].firstName
        lastName.value = users[0].lastName
        email.value = users[0].email
        phone.value = users[0].phone
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value
    }

    ajaxPatch('http://localhost:3000/users/1', JSON.stringify(user), (res) => {
        showAlert(res)
    })
})
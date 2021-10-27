const ajaxPatch = (url, data, callback) => {
    const xhr = new XMLHttpRequest()

    xhr.open('PATCH', url, true)
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

export default ajaxPatch
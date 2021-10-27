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

export default ajaxGet
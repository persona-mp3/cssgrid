const loginForm = document.getElementById("loginForm")
const feedback = document.querySelector('.feedback');

const feedbackFunction = async (value, htmlEl) => {
    if (value) {
        setTimeout(() => htmlEl.classList.remove('onsucess'), 4000)
    } else {
        setTimeout(() => htmlEl.classList.remove('onerror'), 4000)
    }
}


async function sendCredentials(form) {
    const formData = new FormData(form)
    const loginCred = {}

    for (let [key, val] of formData.entries()) {
        if (val.trim() === "") {
            console.log("an empty value was passed in")
            return
        }
        loginCred[key] = val
    }


    const payload = JSON.stringify(loginCred)
    const loginEndpoint = new URL("http://localhost:8080/login")

    try {
        const response = await fetch(loginEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: payload
        })

        const data = await response.json()

        if (response.status !== 200) {
            feedback.innerText = data.message;
            feedback.classList.add('onerror');
            await feedbackFunction(false, feedback)
            return
        }

        // console.log(response) 
        feedback.innerText = "Authentication Successful"
        feedback.classList.add('onsuccess')
        await feedbackFunction(true, feedback)
        localStorage.setItem("userId", JSON.stringify(data.userId))
        // redirect user to the response dashbaord enpoint
        setTimeout(() => {
            // we are appending the userId to the redirect url as parameters
            // and then we cam get the users data from the database by grabbing this id 
            // see dashboard.js for implemetation
            location.href = data.redirectTo + `?id=${encodeURIComponent(data.userId)}`
            

        }, 4000)  
    } catch(err) {
        console.log(err)
        return err
    }
}


loginForm.addEventListener("submit", async(evt) => {
    evt.preventDefault()
    await sendCredentials(loginForm)
})
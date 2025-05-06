const urlParameters = new URLSearchParams(location.search)
const profile = document.querySelector(".profile-container")

const namePlaceholder = document.getElementById("userName")
const addressPlaceholder = document.getElementById("address")
const postcodePlaceholder = document.getElementById("postcode")
const datePlaceholder = document.getElementById("date")
const typePlaceholder = document.getElementById("type")

const firstName = document.querySelector(".firstName")
// get the id value from the parameter
const id = urlParameters.get("id")

// console.log(JSON.stringify(userId))
// console.log("parameter id -->", userId)

async function getUserData(userId) {
    const apiEndpoint = new URL("http://localhost:8080/api/data")
    
    const payload = JSON.stringify({ id : userId})
    

    try {
        const response = await fetch(apiEndpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: payload 
        })

        const data = await response.json()
        
        if (response.status !== 200) {
            alert(data.message)
            return
        }

        console.log("userData")
        console.log(data.userData)
        renderData(data.userData)
    } catch(err) {
        console.log(err)
        return err
    }
}

await getUserData(id)

function renderData(userData) {
     



    const userName =  `${userData.firstName} ${userData.lastName}`
    const userAddress = `${userData.address}`
    const bookingType = `${userData.type}`
    const date = `${userData.date} at ${userData.time}`
    const formatTime = new Date(userData.date);

    const readableDate = formatTime.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
        });
    

    // namePlaceholder.innerText = userName
    addressPlaceholder.innerText = `Location: ${userAddress}`
    typePlaceholder.innerText = `Booking Type: ${bookingType}`
    postcodePlaceholder.innerText = `Postcode: ${userData.postcode}`
    datePlaceholder.innerText = `Scheduled at: ${readableDate}`
    firstName.innerText = `Welcome back, ${userData.firstName}`





}
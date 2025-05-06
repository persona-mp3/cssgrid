const bookingForm = document.querySelector('.booking-form');
const feedback = document.querySelector('.feedback');


// This is using a library via the CDN, flatpicker, check the end of the  body in the  booking.html file
function formatCalender(){
    const dateInput = document.getElementById('date')

    flatpickr(dateInput, {
        altInput: "true",
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        maxDate: "2025-09-20",
        minDate: "today",
    })
}

formatCalender()


// async function sendData(bookingDetails) {
//     let payload = JSON.stringify(bookingDetails);
//     let endpointUrl = new URL(`http:localhost:8080/booking`)
//     try {
//         const response = await fetch(endpointUrl, {
//             method: 'post',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: payload
//         })

//         // if the server sent a response beside 200
//         if (response.status !== 200) {
//             feedback.innerText = `Error. Please try again`
//             feedback.classList.add('onerror')
//             return;
//         }

//         if (response.status === 200) {
//             feedback.innerText = 'Booking Registered'
//             feedback.classList.add('onsuccess')
    
//             // setTimeout wil remove the feedback after 4s
//             setTimeout(() => feedback.classList.remove('onsuccess'),4000)
    
//         }

//     } catch (err){
//         feedback.innerText = 'Sorry Please try again later'
//         feedback.classList.add('onerror')

//         setTimeout(() => feedback.classList.remove('onerror'),3000)
//         throw err
//     }      

// }



const feedbackFunction = async (value, htmlEl) => {
    if (value) {
        setTimeout(() => htmlEl.classList.remove('onsucess'), 4000)
    } else {
        setTimeout(() => htmlEl.classList.remove('onerror'), 4000)
    }
}



async function getFormData(form) {
    let formData = new FormData(form);
    const bookingDetails = {};

    for (let [entry, detail] of formData.entries()) {
        if (detail.trim() === '') {
            // get the formdetail and trace it back to the dom
            // alert('empty field')required
            feedback.innerText = "Please complete " + entry
            feedback.classList.add('onerror');
            await feedbackFunction(false, feedback)


            return
            
        }
        
        bookingDetails[entry] = detail;
        // console.log(bookingDetails)
    }
    
   let endpoint = new URL(`http://localhost:8080/booking`) 

   try { 
        let payload = JSON.stringify(bookingDetails);
    
        const response = await fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: payload
        })
    
        const data = await response.json()

        if (response.status !== 200) {
            // alert('An error occured please try again');
            feedback.innerText = data.msg;
            feedback.classList.add('onerror');
            await feedbackFunction(false, feedback)

            console.log(data.msg)
            return
        }


        if (response.status === 200) {
            feedback.innerText = data.msg
            feedback.classList.add('onsuccess')
            await feedbackFunction(true, feedback)
            setTimeout(()=> location.href = "./login.html", 4000)
            return;
        }
   } catch (err) {
        feedback.innerText = `Please try again later`
        feedback.classList.add('onerror')
        await feedbackFunction(false, feedback)

        throw err
   }


    // await sendData(bookingDetails)
    
}




bookingForm.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    // feedback.classList.add('onerror')
     await  getFormData(bookingForm);

})
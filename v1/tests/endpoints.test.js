const axios = require("axios")
const dashboardEndpoint =  new URL("http://localhost:8080/dashboard")

// testing vscodes live server
const indexPage = new URL("http://localhost:5500/")
const bookingPage = new URL("http://localhost:5500/pages/booking.html")
const loginPage = new URL("http://localhost:5500/pages/login.html")
const quizPage = new URL("http://localhost:5500/pages/quiz.html")

// post endpoints
const loginEndpoint = new URL("http://localhost:8080/login")

describe("Testing dashboard page", () => {
    test("Expect status code returned to be 200", async () => {
        const response = await axios.get(dashboardEndpoint)

        expect(response.status).toBe(200)
    })
})

describe("Testing home on port 5500 page", () => {
    test("Expect status code returned to be 200", async () => {
        const response = await axios.get(indexPage)

        expect(response.status).toBe(200)
        console.log(response.headers)
    })
})



describe("Testing login on port 5500 ", () => {
    test("Expect status code returned to be 200", async () => {
        const response = await axios.get(loginPage)

        expect(response.status).toBe(200)
    })
})



describe("Testing booking page on port 5500 ", () => {
    test("Expect status code returned to be 200", async () => {
        const response = await axios.get(bookingPage)

        expect(response.status).toBe(200)
    })
})





describe("Testing quiz page on port 5500 ", () => {
    test("Expect status code returned to be 200", async () => {
        const response = await axios.get(quizPage)

        expect(response.status).toBe(200)
    })
})


// testing login credentials with empty data
const invalidData = {}
describe("Testing authentication system with empty data", () => {
    test("Expect server response to be 401", async () => {
        try {
            const response = await axios.post(loginEndpoint, {
                invalidData
            })
        } catch(err){
            expect(err.response.status).toBe(401)
            expect(err.response.data.message).toBe("Bad request")
        }
    })
})

const testUser = {
    email: "testuser001@gmal.com",
    password: "password1234"
}

describe("Testing authentication system with a non-existing user", () => {
    test("Expect server response to be 401", async () => {
        try {
            const response = await axios.post(loginEndpoint, {
                // testUser
                email: "testuser001@gmail.com",
                password: "password1234",
           
            })
        } catch(err){
            expect(err.response.status).toBe(401)
            expect(err.response.data.message).toBe("User not found")
        }
    })
})


// testing an existing user with invalid credentails
describe("Testing authentication system with invalid credentails", () => {
    test("Expect server response to be 401", async () => {
        try {
            const response = await axios.post(loginEndpoint, {
                email: "rakeljohn@gmail.com",
                password: "password1234",
           
            })
        } catch(err){
            expect(err.response.status).toBe(401)
            expect(err.response.data.message).toBe("Invalid Credentials")
        }
    })
})

const validUser = {
    email: "rakeljohn@gmail.com",
    password: "rakeljohn"
}
// testing with valid credentials, a redirect url should be sent in HTTP header
describe("Testing authentication system with valid credentails", () => {
    test("Expect server response to be 200", async () => {
            const response = await axios.post(loginEndpoint, {
                email: "rakeljohn@gmail.com",
                password: "rakeljohn",
            })

            expect(response.status).toBe(200)
            // this means that the user was succesfully redirected to the dashboard page
            expect(response.headers["content-type"]).toMatch(/text\/html/)
            console.log(response.headers)
        
    })
})

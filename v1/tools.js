// This document handles all validation and user authentication. Its a modularised server logic
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from "bcrypt"

dotenv.config();

const sqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
}

const pool = mysql.createPool(sqlConfig).promise()


export async function saveBookings(res, bookingDetails){
    const firstName = bookingDetails.firstName;
    const lastName  = bookingDetails.lastName;
    const email = bookingDetails.email;
    const type = bookingDetails.bookingType;
    const address = bookingDetails.address;
    const postcode = bookingDetails.postcode;
    const date = bookingDetails.date;
    const time = bookingDetails.time;
    let password = bookingDetails.password

    // must be in the order as the database schema
    const requiredFields = [firstName, lastName, email, type,  address, postcode, date, time, password];
    console.log('requiredFeilds -->')
    console.log(requiredFields)

    // .some() is an array method that returns true when an item in an array meets a specified conditoin
    if (requiredFields.some(field => field === undefined)) {
        console.log('Empty field')
        res.status(403).send({msg: 'Invalid Form data'});
        return;
    };

    requiredFields[8] = await bcrypt.hash(password, 10)
    console.log("hashedPassword:=>", password)

    let saveQuery = `
                    INSERT INTO bookings
                    (firstName, lastName, email, type,
                    address, postcode, date, time, password
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    // save to the database 
    try { 
        const [response] = await pool.query(saveQuery, requiredFields);

        console.log(response)
        res.status(200).send({msg: 'Booking saved successfully'})
    } catch(err) {
        res.status(500).send({msg: 'Internal Server Error'})
        console.log(err)
        throw err
    }
} 




export async function AuthUser(req, res) {
    const loginCreds = req.body;

    if (!loginCreds.email || !loginCreds.password) {
        res.status(401).json({message: "Bad request"})
        return
    }
    
    const email = loginCreds.email;
    const password = loginCreds.password;


    const query = "select id, password from bookings where email = ? "

    try {
        const [dbResponse] = await pool.query(query, email)
        const dbData = dbResponse[0]
        console.log(dbData)
        if (!dbData) {
            res.status(401).json({message: "User not found"})
            return
        }

        // if (dbData.password !== password) {
        //     res.status(401).json({message: "Invalid Credentails"})
        //     return
        // }
        
        const isValid = await bcrypt.compare(password, dbData.password)

        if (!isValid) {

            res.status(401).json({message: "Invalid Credentials"})
            return
        }

        console.log("passwords match")
        // redirect user to dashboard page
        // res.status(200).redirect("/dashboard")
        res.status(200).json({
            redirectTo: "http://localhost:8080/dashboard",
            userId: dbData.id,
        })



    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Unexpected Error Occured"})
        return err
    }
}

export async function getDataById(req, res) {
    const userId = req.body.id;
    console.log(userId)

    if (!userId) {
        res.status(401).json({message: "Bad request"})
        return
    }

    const checkQuery = "select * from bookings where id = ?"

    try{
        const [dbResponse] = await pool.query(checkQuery, userId)
        const dbData = dbResponse[0]
        
        if (!dbData) {
            res.status(401).json({message: "User not found"})
            return
        }

        // remove the password value before sending as json to the user
        delete dbData.password
        console.log(dbData)
        res.status(200).json({message: "User found", userData: dbData})
    } catch(err) {
        console.log(err)
        return err
    }
}









let bookingDetails = {
    
  firstName: 'Mayer',
  lastName: 'John',
  email: '23 Old Nagoya Lane',
  phone: '0803385634',
  address: '23 Old Nagoya Lane',
  postcode: 'FY2 3FE',
  bookingType: 'Installation',
  date: '2025-04-07',
  time: '12:30'

}

// await saveBookings(res,bookingDetails)

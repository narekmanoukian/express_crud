import { v4 as uuid} from "uuid";
import sqlite from 'sqlite3';


const id =uuid


const db = new sqlite.Database('data.db');

let users = [];



db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT VARCHAR(50) NOT NULL, surName TEXT NOT NULL, age INTEGER NOT NULL)");


export const getUsers = (req, res) => {
    db.all("SELECT * FROM users", function(err, rows){
        console.log(rows)
        res.send(rows);
     })
};

export const createUsers = (req, res) => {
    let name = req.body["firstName"]
    let surname = req.body["surName"]
    let age = req.body["age"]
    console.log(name, surname, age)
  
    db.run("INSERT INTO users(firstName,surName, age) VALUES(?,?,?)", name, surname, age)
    res.send(JSON.stringify({message: 'success'}))
};

export const getUser = (req, res) => {
    const id = req.params.id
    db.all("SELECT * FROM users WHERE id = ?",[id],  function(err, rows){
      console.log(rows);
      res.send(rows);
   }
   )
};

export const deleteUser = (req, res) => {
    const id = req.params.id

    db.run("DELETE FROM  users WHERE id=?",[id], function(err){
      db.all("SELECT * FROM users WHERE id = ?",[id],  function(err, rows){
        console.log(rows);
        res.send(rows);
      })
    })
};
export const updateUser = (req, res) => {
    const {id} = req.params
    let firstName = req.body["firstName"];
    let surname = req.body["surName"];
    let age = req.body["age"];
  
    let sqlite =`UPDATE users SET firstName = ?, surName = ?, age = ? WHERE id = ${id}`
    db.run(sqlite,firstName,surname,age)
    res.send(`User with the ${id} has een updated`) 
};
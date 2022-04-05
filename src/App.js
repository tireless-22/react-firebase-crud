import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import "./App.css";

import { db } from "./firebase-config";
import { collection, getDocs,addDoc,updateDoc,deleteDoc,doc } from "firebase/firestore";


// In one firebase there might be a chance of occurnace of mutliple collection,
// firestore is documnet type database
// and real time database is json type database

// in order get the data from the collection we have to referece that collection, so that is why we are
// importing the collection from the firebase/firestore

// in order the tings in that collection we will get the documents using the getDocs of firestore

// getDocs contains all other information along with the data that we have
// inorder to get the data that we need only we will use the docs() function


// addDoc is used to add the doc to the collection that we have
// addDoc will takes 2 arguments one is reference to the collection and the 
// second one is the doc that we are wanting to add

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionReference = collection(db, "users");

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCollege, setNewCollege] = useState("");

  const createUser = async () => {
    await addDoc(usersCollectionReference,{name:newName,age:Number(newAge),college:newCollege})
    
  };

  const updateAge = async(id,age) => {
    const userDocument = doc(db, "users", id);
    // doc function will return the particular document that we need basically it takes three arguments 
    // first one is databaseName and 
    // secondArgument is collectionName and 
    // third argument is the id of the document in that collection 
    const newField = { age: age + 1 };
    await updateDoc(userDocument, newField);
    
  }


  const deleteUser = async (id) => {
    const userDocument = doc(db, "users", id);
    deleteDoc(userDocument);
  }




  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(usersCollectionReference);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // The JavaScript spread operator ( ... ) allows us to quickly copy all or part of an existing array or object
      // into another array or object.
      console.log(users);
      // We didn't get the users data here because the above call is asycn call, before getting the data it will execute the other things
    };

    getusers();
  }, []);

  return (
    <div className="App">
      <input placeholder="name" onChange={(e) => setNewName(e.target.value)} />
      <input
        placeholder="age"
        type="number"
        onChange={(e) => setNewAge(e.target.value)}
      />
      <input
        placeholder="college"
        onChange={(e) => setNewCollege(e.target.value)}
      />

      <button onClick={() => createUser()}>Create User</button>

      {users.map((user) => {
        return (
          <div>
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>
            <h2>{user.college}</h2>
            <button onClick={() => updateAge(user.id, user.age)}>increment the age</button>
            <button onClick={() => deleteUser(user.id)}>Delete user</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

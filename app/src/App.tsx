import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { useAppDispatch, useAppSelector } from "./States/hook"
import CreatePost from "./Contents/CreatePost";
import Diary from "./Contents/Diary";
import ViewDiary from "./Contents/ViewDiary";
import Login from "./Starting page/Login";
import { DocumentData, collection, getDocs, startAfter } from "firebase/firestore";
import { auth, db } from "./Firebase/firebase";
import { saveAccount } from "./States/SaveAccountLogin";

type datatype = {
  FirstName: string,
  LastName: string,
  Email: string
  Password: string,
  ProfileDisplay: string,
  UserId?: string
}


function App() {
  const [getAccountData, setGetData] = useState<DocumentData>([]);
  const dispatch = useAppDispatch();
  const AccountInfo = useAppSelector((state) => state.getAccount);

  const collectionData = collection(db, 'Users');
  
  //find exact user's data from firebase database 
  useEffect(() => {
    const getData = async () => {
     const data = await getDocs(collectionData);
     
     const userdata = data.docs
     .map((doc) => doc.data()).filter(data => data.UserId === auth.currentUser?.uid);

     if (userdata.length > 0) {
      userdata.forEach((data) => {
        dispatch(saveAccount(data)); //save all the user info
      });
    }
  
   //store the value of reducer to the state
  
 } 
   getData(); 
}, []);


console.log(auth.currentUser?.uid);
 
return (
   <div className="w-full relative min-h-full h-screen overflow-hidden bg-[#F4F0E9]">
        <div className="">
          <Navbar />
        </div>

       
      {/* RENDER FOLLOWS*/ }
      <div className="w-full flex  h-screen  items-center justify-center">
         <Diary />
      </div>
    </div>
  )
}

export default App

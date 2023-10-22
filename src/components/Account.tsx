import Modal from "./Modal";
import Navbar from "./Navbar";
import Transfer from "./Transfer";
import UserInfo from "./UserInfo";

function Account() {
  return (
    <div className="main-wrapper">
        <Navbar/>
        <UserInfo/>
        {/* <Modal children={<Transfer target1={{number:"fsdfsd",balance:5000,currency:"$",type:"DEPOSIT"}}/>}></Modal> */}
    </div>  
  );
}

export default Account;

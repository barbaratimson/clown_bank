import Modal from "./Modal";
import Navbar from "./Navbar";
import Transfer from "./Transfer";
import UserInfo from "./UserInfo";
import {useAppSelector} from "../utils/hooks";
import Notifications from "./Notications";

function Profile() {
    const userAccounts = useAppSelector(state => state.userAccountsStore.userAccounts)
    return (
    <div className="main-wrapper">
        <Navbar/>
        <UserInfo/>
        <Notifications/>
         {/*<Modal children={<Transfer target1={userAccounts[0]}/>}></Modal>*/}
    </div>  
  );
}

export default Profile;

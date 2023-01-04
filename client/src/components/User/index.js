import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


const User = () => {
let navigate = useNavigate()
 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };
return (
 
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <h1>Recovero</h1>
          <h1>Welcome to User section</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </nav>
</div>
   );
}
export default User;

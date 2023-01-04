import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/SignUp/index";
import Login from "./components/Login/index";
import Member from "./components/Member/index";
import User from "./components/User/index";

function App() {
	const user = localStorage.getItem("token");
	const user1 = localStorage.getItem("data")
	
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{user1 === "member" && <Route path="/user" exact element={<User />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/addMember" exact element={<Member />} />
		</Routes>
	);
}

export default App;
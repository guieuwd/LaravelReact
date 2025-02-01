import { Link, useNavigate } from "react-router-dom";
import './App.css';
function Dashboard() {

  const navigate = useNavigate();

  let accessToken = sessionStorage.getItem('accessToken');

  // const current_time = new Date();

  // if (current_time.getTime() > decodeToken.exp * 1000) {
  // }

  if (!accessToken) {
                        navigate("/");
  }

  const logout = async () => {
      var response = await fetch('http://localhost/api/v1/logout', {
        method: "post",
        headers: {
          // needed so express parser says the body is OK to read
          // 'Authorization': '${accessToken}',
          'User-Agent': 'PostmanRuntime/7.43.0',
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Authorization': `Bearer ${accessToken}`
        },
      }).then(response => { if (response) return response.json(); })
        .catch(error => { console.log(error); return alert("Something went wrong."); })
        .finally(() => { console.log("FINISH"); });

      sessionStorage.removeItem('accessToken');
      navigate("/");
      return;
  }

  return (
    <div className="App">
      {
        (
          <div>
            <div>
              <button onClick={logout}>logout</button>
            </div>
          </div>
        )
      }
      {
        <p> Dashboard </p>
      }
    </div>
  );
}

export default Dashboard;
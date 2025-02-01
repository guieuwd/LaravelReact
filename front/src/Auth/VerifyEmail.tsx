import React from 'react'; 
import { Link } from 'react-router-dom';
import '../App.css';

function VerifyEmail() {
    return (
        <div className="App">
        <header className="App-header">
          <div>
            <div>
              <Link className="App-link" to="/">Back</Link>
            </div>
            <div>
            Verify email.
            </div>
          </div>
        </header>
      </div>
    );
} 
export default VerifyEmail;
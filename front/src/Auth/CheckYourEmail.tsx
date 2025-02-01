import React from 'react'; 
import { Link } from 'react-router-dom';
import '../App.css';

function CheckYourEmail() {
    return (
        <div className="App">
        <header className="App-header">
          <div>
            <div>
              <Link className="App-link" to="/">Back</Link>
            </div>
            <div>
              Check your email.
            </div>
          </div>
        </header>
      </div>
    );
} 
export default CheckYourEmail;
import React from "react";

export default function Profile() {
    return (
        <div>
            <h1>Profile</h1>
            <div className="row align-items-center">
                <div className="col text-center">
                    <div className="row">
                    <div className="col">
                    <h2>Current habit</h2>
                    <p>To eat healthier</p>
                    </div>
                    <div className="col">
                    <button className="btn btn-danger">Change habit</button>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <h2>Current frequency</h2>
                    <p><span>5</span> times a week (you can always change it here)</p>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Change frequency</button>
                    </div>
                    </div>
                    <div className="col">
                    <div className="row">
                    <div className="col">
                    <h2>My prompts</h2>
                    <p>I ate salad for lunch today</p>
                    <p>I couldn't resist temptation and bought an icecream today</p>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Add prompt</button>
                    </div>
                    </div>
                    </div>
                    </div>
                <div className="col">
                    <h2>My info</h2>
                    <div className="row">
                    <div className="col">
                    <p>Username: <span>John Doe</span></p>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Change username</button>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <p>Email: <span> example@email.com </span></p>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Change email</button>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <p>Password: last changed on the <span> 21.1.2024</span></p>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Change password</button>
                    </div>
                    </div>
                    <button className="btn btn-danger">Delete account</button>
                </div>
        </div>
        </div>
    )
}
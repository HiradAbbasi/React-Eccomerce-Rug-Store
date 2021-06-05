import React, { useState, useEffect } from "react";
import "../src/Dashboard.css";
import { db, auth } from "./firebase";

const Dashboard = (props) => {
  const [input, setInput] = useState();

  useEffect(() => {
    db.collection('users').doc(props.currentUser.uid).get().then(doc => {
      setInput ({
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        city: doc.data().city,
        province: doc.data().province,
        postalCode: doc.data().postalCode,
      })
    })
  }, []);
  
  const updateField = (e) => {
    e.persist();
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection('users').doc(props.currentUser.uid).set({
      firstName: input.firstName,
      lastName: input.lastName,
      address: input.address,
      city: input.city,
      province: input.province,
      postalCode: input.postalCode,
    }).catch(err => {
      console.log(err)
    })
    console.log("Updated Database")

    auth.sendPasswordResetEmail(props.currentUser.email).then(function() {
      console.log('Email Sent Successfully');
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <>
      {input && 
        <section className="py-5 my-5">
          <div className="container">
            <h1 className="mb-5">Account Settings</h1>
            <div className="bg-white shadow rounded-lg d-block d-sm-flex">
              <div className="profile-tab-nav border-right">
                <div className="p-4">
                  <h4 className="text-center">{input.firstName + " " +input.lastName}</h4>
                </div>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true" >
                    <i className="fa fa-home text-center mr-1"></i>
                    Account
                  </a>
                  <a className="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                    <i className="fa fa-key text-center mr-1"></i>
                    Password
                  </a>
                  <a
                    className="nav-link"
                    id="security-tab"
                    data-toggle="pill"
                    href="#security"
                    role="tab"
                    aria-controls="security"
                    aria-selected="false"
                  >
                    <i className="fa fa-user text-center mr-1"></i>
                    Security
                  </a>
                  <a
                    className="nav-link"
                    id="application-tab"
                    data-toggle="pill"
                    href="#application"
                    role="tab"
                    aria-controls="application"
                    aria-selected="false"
                  >
                    <i className="fa fa-tv text-center mr-1"></i>
                    Application
                  </a>
                  <a
                    className="nav-link"
                    id="notification-tab"
                    data-toggle="pill"
                    href="#notification"
                    role="tab"
                    aria-controls="notification"
                    aria-selected="false"
                  >
                    <i className="fa fa-bell text-center mr-1"></i>
                    Notification
                  </a>
                </div>
              </div>
              <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                
                  <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab" >
                    <h3 className="mb-4">Account Settings</h3>
                    <form className="form2" onSubmit={onSubmitHandler}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" placeholder="First Name" value={input.firstName} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={input.lastName} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Email" value={props.currentUser.email}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" placeholder="Address" value={input.address} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" name="city" placeholder="City" value={input.city} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Province</label>
                            <input type="text" className="form-control" name="province" placeholder="Province" value={input.province} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" className="form-control" name="postalCode" placeholder="Postal Code" value={input.postalCode} onChange={updateField}/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-control" rows="2">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </textarea>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-primary">Update</button>
                        <button className="btn btn-light">Cancel</button>
                      </div>
                    </form>
                  </div>
                <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                  <h3 className="mb-4">Password Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Old password</label>
                        <input type="password" className="form-control" name="password" placeholder="Password"/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>New password</label>
                        <input type="password" className="form-control" name="newPassword" placeholder="New Password"/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Confirm new password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div className="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                  <h3 className="mb-4">Security Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Login</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Two-factor auth</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="recovery"
                          />
                          <label className="form-check-label">
                            Recovery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div className="tab-pane fade" id="application" role="tabpanel" aria-labelledby="application-tab" >
                  <h3 className="mb-4">Application Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="app-check"
                          />
                          <label className="form-check-label">
                            App check
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck2"
                          />
                          <label className="form-check-label">
                            Lorem ipsum dolor sit.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div className="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab"
                >
                  <h3 className="mb-4">Notification Settings</h3>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="notification1"
                      />
                      <label className="form-check-label">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolorum accusantium accusamus, neque cupiditate quis
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="notification2"
                      />
                      <label className="form-check-label">
                        hic nesciunt repellat perferendis voluptatum totam porro
                        eligendi.
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="notification3"
                      />
                      <label className="form-check-label">
                        commodi fugiat molestiae tempora corporis. Sed dignissimos
                        suscipit
                      </label>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 
      }
    </>
  );
};

export default Dashboard;

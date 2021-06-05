import React, { useState, useEffect } from "react";
import "../src/Dashboard.css";
import { db, auth } from "./firebase";

const Dashboard = (props) => {
  const [input, setInput] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [settingsUpdateErr, setSettingsUpdateErr] = useState(false);

  useEffect(() => {
    db.collection('users').doc(props.currentUser.uid).get().then(doc => {
      setInput({
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
    console.log(props.currentUser);
    setFormSubmitted(false);
    e.persist();
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(Object.values(input).find(info => info == "") == undefined) {
      setSettingsUpdateErr(false);
      db.collection('users').doc(props.currentUser.uid).set({
        firstName: input.firstName,
        lastName: input.lastName,
        address: input.address,
        city: input.city,
        province: input.province,
        postalCode: input.postalCode,
      }).catch(err => {
        setSettingsUpdateErr(true);
        console.log(err);
      })
    } else {
      setSettingsUpdateErr(true);
    }

    setFormSubmitted(true);
  }

  const onResetPassword = () => {
    //onReAuthenticateUser();
    auth.sendPasswordResetEmail(props.currentUser.email).then(function() {
      console.log('Email Sent Successfully');
    }).catch(function(error) {
      setSettingsUpdateErr(true);
      console.log(error)
    });
  }

  const onDeleteUser = () => {
    //onReAuthenticateUser();
    auth.currentUser.delete().then(function() {
      console.log("User deleted");
    }).catch(function(error) {
      setSettingsUpdateErr(true);
      console.log(error);
    });
  }

  const onResetAccountSettings = () => {
    db.collection('users').doc(props.currentUser.uid).get().then(doc => {
      setInput({
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        city: doc.data().city,
        province: doc.data().province,
        postalCode: doc.data().postalCode,
      })
    })
  }

  // const onUpdateEmail = () => {
  //   //onReAuthenticateUser();
  //   auth.currentUser.updateEmail("hitadcas@gmail.com").then(function() {
  //     console.log("Email updated succesfulyly")
  //   }).catch(function(error) {
  //     settingsUpdateErr(false);
  //     console.log(error)
  //   });
  // }
  
  // const onReAuthenticateUser = () => {    
  //   auth.currentUser.reauthenticateWithCredential(credential).then(function() {
  //     // User re-authenticated.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // }

  const onVerifiyUser  = () => {
    auth.currentUser.sendEmailVerification().then(function() {
      console.log("User verification email sent successfully");
    }).catch(function(error) {
      console.log(error);
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
                          {formSubmitted && (input.firstName.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.firstName.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={input.lastName} onChange={updateField}/>
                          </div>
                          {formSubmitted && (input.lastName.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.lastName.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input disabled type="email" className="form-control" name="email" placeholder="Email" value={props.currentUser.email}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" placeholder="Address" value={input.address} onChange={updateField}/>
                          </div>
                          {formSubmitted && (input.address.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.address.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" name="city" placeholder="City" value={input.city} onChange={updateField}/>
                          </div>
                          {formSubmitted && (input.city.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.city.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Province</label>
                            <input type="text" className="form-control" name="province" placeholder="Province" value={input.province} onChange={updateField}/>
                          </div>
                          {formSubmitted && (input.province.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.province.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" className="form-control" name="postalCode" placeholder="Postal Code" value={input.postalCode} onChange={updateField}/>
                          </div>
                          {formSubmitted && (input.postalCode.length === 0 &&
                            <div class="alert alert-danger" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                          {!formSubmitted && (input.postalCode.length === 0 &&
                            <div class="alert alert-warning" role="alert">
                              Invalid value (make sure input in not empty) 
                            </div>)
                          }
                        </div>
                      </div>
                      {formSubmitted && (settingsUpdateErr ? 
                        <div class="alert alert-danger" role="alert"> 
                          <h5 class="alert-heading">Update Unsuccessful</h5> 
                          <p className="mb-0">Unable to update account settings</p> 
                        </div> :
                        <div class="alert alert-success" role="alert"> 
                          <h5 class="alert-heading">Update Successful</h5> 
                          <p className="mb-0">Account Settings Updated Successfully</p> 
                        </div>)
                      }   
                      <div className="mb-2">
                        <button className="btn btn-primary mr-3" type="submit">Update</button>
                        <button className="btn btn-light" type="button" onClick={onResetAccountSettings}>Cancel</button>
                      </div>
                      <div className="mb-0">
                        <button type="button" class="btn btn-outline-info mr-3" type="button" onClick={onVerifiyUser}>Verify Email</button>
                        <button type="button" class="btn btn-outline-danger" type="button" onClick={onDeleteUser}>Delete Account</button>
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

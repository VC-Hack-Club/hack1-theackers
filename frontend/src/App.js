import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyAMW3w7aQXrB-EiJ6ZTkGqhKLnGvuOxFBE",
  authDomain: "homeless-8b5fa.firebaseapp.com",
  databaseURL: "https://homeless-8b5fa-default-rtdb.firebaseio.com",
  projectId: "homeless-8b5fa",
  storageBucket: "homeless-8b5fa.appspot.com",
  messagingSenderId: "141224564960",
  appId: "1:141224564960:web:50c36f7eb42ccf02655885",
  measurementId: "G-17NL6XP0BJ"
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};


function App() {
  const [open, setOpen] = React.useState(false);
  window._debug = {
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  } 
  return(
    <>
    <Modal isOpen={open} toggle={() => setOpen(false)}>
    <ModalHeader>
      Modal title
    </ModalHeader>
    <ModalBody>
      Modal body text goes here.
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </ModalBody>
  </Modal>
  <div id="firebaseui-auth-container"></div>
  <button type="button" className="btn btn-primary" onClick={()=>setOpen(true)}>OPen MODAL</button>
  
  </>
  );
  
}

export default App;

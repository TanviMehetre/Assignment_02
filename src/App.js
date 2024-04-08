// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';

// const { register, handleSubmit, formState: { errors } } = useForm();
// const [dataF, setDataF] = useState({});
// const [viewer, setViewer] = useState(0);

function App() {
  const [dataF, setDataF] = useState({});

  const updateHooks = (data) => {
    setDataF(data);
  };

  return (
    <div>
      <Payment updateHooks={updateHooks} />
      <Summary data={dataF} updateHooks={updateHooks}/>
    </div>
  );
}



//   const { register, handleSubmit, formState: { errors } } = useForm();
// const [dataF, setDataF] = useState({});
// const [viewer, setViewer] = useState(0);

//   const onSubmit = data => {
//     console.log(data); // log all data
//     console.log(data.fullName); // log only fullname
//     // update hooks
//     setDataF(data); // Update dataF with new data
//     setViewer(data.fullName); // Update viewer with fullname from data
//   };

function Payment({ updateHooks }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    updateHooks(data);
  };




  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="form-group">
        <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control"/>
        {errors.fullName && <p className="text-danger">Full Name is required.</p>}
        </div>

        <div className="form-group">
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control"/>
        {errors.email && <p className="text-danger">Email is required.</p>}
        </div>

        <div className="form-group">
        <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control"/>
        {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
        </div>
        
        <div className="form-group">
        <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
        {errors.address && <p className="text-danger">Address is required.</p>}
        </div>
        
        <div className="form-group">
        <input {...register("address2")} placeholder="Address 2" className="form-control"/>
        </div>
        
        <div className="form-group">
        <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
        {errors.city && <p className="text-danger">City is required.</p>}
        </div>
        
        <div className="form-group">
        <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
        {errors.state && <p className="text-danger">State is required.</p>}
        </div>
        
        <div className="form-group">
        <input {...register("zip", { required: true })} placeholder="Zip" className="form-control"/>
        {errors.zip && <p className="text-danger">Zip is required.</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );
}

function Summary({ data, updateHooks  }) {

  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const [dataF, setDataF] = useState({});
  // const [viewer, setViewer] = useState(0);
  
  // const updateHooks = (dataF) => {
  //   setViewer(dataF.fullName);
  //   setDataF(dataF);
  // };

  return (<div>
  <h1>Payment summary:</h1>
  <h3>{data.fullName}</h3>
  <p>{data.email}</p>
  <p>{data.creditCard}</p>
  <p>{data.address}</p>
  <p>{data.address2}</p>
  <p>{data.city} {data.state} {data.zip} </p>
  <button onClick={updateHooks} className="btn btn-secondary">Submit</button>

  </div>);
  };

export default App;


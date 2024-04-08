import React, { useState, useEffect } from "react";
import { Products } from "./products"; // Importing Products array from the products file
import { set, useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

function Shop() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [dataF, setDataF] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const updateHooks = (data) => {
    setDataF(data);
    setSubmitted(true); // Set submitted to true after form submission
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const totalVal = cart.reduce((total, item) => total + item.price, 0);
    setCartTotal(totalVal);
  };
  

  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  // };

  // const removeFromCart = (productToRemove) => {
  //   const updatedCart = cart.filter((product) => product.id !== productToRemove.id);
  //   setCart(updatedCart);
  // };

  // const renderProductCard = (product) => (
  //   <div className="col-md-4 mb-4" key={product.id}>
  //     <div className="card">
  //       <img src={process.env.PUBLIC_URL + product.image} className="card-img-top" alt={product.title} />
  //       <div className="card-body">
  //         <h5 className="card-title">{product.title}</h5>
  //         <p className="card-text">${product.price}</p>
  //         <button className="btn btn-primary" onClick={() => addToCart(product)}>
  //           Add to Cart
  //         </button>
  //         {isInCart(product) && (
  //           <button
  //             className="btn btn-danger mt-2"
  //             onClick={() => removeFromCart(product)}
  //           >
  //             Remove from Cart
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );


const [quantities, setQuantities] = useState(Products.map(() => 0)); // Initialize quantities with 0

const handleIncrease = (index) => {
  const newQuantities = [...quantities];
  newQuantities[index]++;
  setQuantities(newQuantities);

  const product = Products[index];
  // Update cart to include the new product (assuming Products[index] is the product object)
  setCart(prevCart => [...prevCart, product]);
};


const handleDecrease = (index) => {
  const newQuantities = [...quantities];
  if (newQuantities[index] > 0) {
    newQuantities[index]--;
    setQuantities(newQuantities);

    const product = Products[index];
    // Remove the product from the cart if quantity reaches 0
    if (newQuantities[index] === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    }
    else{
      // Remove one quantity of the product from the cart
      setCart(prevCart => {
        const indexToRemove = prevCart.findIndex(item => item.id === product.id);
        if (indexToRemove !== -1) {
          const updatedCart = [...prevCart];
          updatedCart.splice(indexToRemove, 1);
          return updatedCart;
        }
        return prevCart;
      }
      );
    }
  }
};

// const renderCartItemsWithQuantity = (product, index)=>(
//   <div className="col-sm-4 mb-4" key={product.id}>
//       <div className="card">
//         <img className="card-img-top" src={product.image} alt={product.title} />
//         <div className="card-body">
//           <h5 className="card-title">{product.title}</h5>
//           <p className="card-text">${product.price}</p>
//           <div className="quantity">
//             <span className="quantity-value">{quantities[index]}</span>
//           </div>
//         </div>
//       </div>
//     </div>
// );

// const renderCartItemsWithQuantity = (product, quantity) => (
//   <div className="col-sm-4 mb-4" key={product.id}>
//     <div className="card">
//       <img className="card-img-top" src={product.image} alt={product.title} />
//       <div className="card-body">
//         <h5 className="card-title">{product.title}</h5>
//         <p className="card-text">${product.price} (x{quantity})</p> {/* Display quantity */}
//       </div>
//     </div>
//   </div>
// );

const renderCartItemsWithQuantity = () => {
  const cartItems = Object.values(filteredCart.reduce((acc, product) => {
    if (!acc[product.id]) acc[product.id] = { ...product, quantity: 0 };
    acc[product.id].quantity++;
    return acc;
  }, {}));

  return cartItems.map((product) => (
    <div className="col-sm-4 mb-4" key={product.id}>
      <div className="card">
        <img className="card-img-top" src={product.image} alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price} (x{product.quantity})</p>
        </div>
      </div>
    </div>
  ));
};



  const renderProductCardWithQuantity = (product, index) => (
    <div className="col-sm-4 mb-4" key={product.id}>
      <div className="card">
        <img className="card-img-top" src={product.image} alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <div className="quantity">
            <button className="btn btn-primary" onClick={() => handleIncrease(index)}>
              +
            </button>
            <span className="quantity-value">{quantities[index]}</span>
            {quantities[index] > 0 && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDecrease(index)}
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const isInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const productCards = Products.map(renderProductCardWithQuantity); // Using Products array from the imported file

  const onSubmit = (data) => {
    updateHooks(data);
    setShowPayment(false); // Hide payment form after submission
  };

  const cartItems = Object.keys(cart).map((productId) => {
    const quantity = cart[productId];
    const product = Products.find((product) => product.id === productId);
  
    // render the product with its quantity
    return{

    }
  });

  const togglePayment = () => {
    setShowPayment(true); // Always set showPayment to true when toggling payment form
    setSubmitted(false); // Reset submitted status when payment form is toggled
  };

  // const handleSearchChange = (event) => {
  //   const searchTerm = event.target.value;
  //   const filteredProducts = Products.filter((product) =>
  //     product.category.includes(searchTerm)
  //   );
  //   Products(filteredProducts); // assuming you have a state variable for products
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = Products.filter((product) =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCart = cart.filter((producttest)=>
    producttest.product
  )

  const totalItemsInCart = Object.values(filteredCart.reduce((acc, product) => {
    if (!acc[product.id]) acc[product.id] = 0;
    acc[product.id]++;
    return acc;
  }, {})).reduce((total, quantity) => total + quantity, 0);


  return (
      <div>
        <center><h1 >STORE SE/ComS319</h1></center>
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            </div>
        </div>
        <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
            </div>

            
        <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            
            <div className="row">{productCards}</div>
          </div>
          <div className="float-end">
            <p className="mb-0 me-5 d-flex align-items-center">
              <span className="small text-muted me-2">Order total:</span>
              <span className="lead fw-normal">${cartTotal}</span>
            </p>
            <button className="btn btn-primary" onClick={togglePayment}>Checkout</button>
          </div>
        </div>
      </div> */}


<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div className="search">
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
</div>
<div className="title">
  <div className="row">
    <div className="col">
      <h4>
        <b>319 Shopping Cart</b>
      </h4>
    </div>
    <div className="col align-self-center text-right text-muted">
      Products selected {cart.length}
    </div>
  </div>
</div>


<div className="card">
  <div className="row">
    {/* <div className="col-md-8 cart">
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div className="col-sm-4 mb-4" key={product.id}>
            <div className="card">
              <img className="card-img-top" src={product.image} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="float-end">
      <p className="mb-0 me-5 d-flex align-items-center">
        <span className="small text-muted me-2">Order total:</span>
        <span className="lead fw-normal">${cartTotal}</span>
      </p>
      <button className="btn btn-primary" onClick={togglePayment}>Checkout</button>
    </div> */}
    <div className="col-md-8 cart">
  <div className="row">
    {filteredProducts.map((product, index) => (
      renderProductCardWithQuantity(product, index)
    ))}
  </div>
  <div className="float-end">
    <p className="mb-0 me-5 d-flex align-items-center">
      <span className="small text-muted me-2">Order total:</span>
      <span className="lead fw-normal">${cartTotal}</span>
    </p>
    <button className="btn btn-primary" onClick={togglePayment}>Checkout</button>
  </div>
</div>

  </div>
</div>



      {showPayment && !submitted && (
        <div>
          <h1>Cart</h1>
          
          <p>Total Items: {cart.length}</p>
          <div className="row">
      {Object.values(filteredCart.reduce((acc, product) => {
        if (!acc[product.id]) acc[product.id] = { ...product, quantity: 0 };
        acc[product.id].quantity++;
        return acc;
      }, {})).map((product) => {
        return renderCartItemsWithQuantity(product, product.quantity);
      })}
    </div>
    <div className="row">
      {cart.map((product) => (
        <div className="col-sm-4 mb-4" key={product.id}>
          <div className="card">
            <img className="card-img-top" src={product.image} alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
          <h1>Payment Form</h1>
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
      )}
      {submitted && (
        <div>
          <h1>Payment summary:</h1>
          <h3>{dataF.fullName}</h3>
          <p>{dataF.email}</p>
          <p>{dataF.creditCard}</p>
          <p>{dataF.address}</p>
          <p>{dataF.address2}</p>
          <p>{dataF.city} {dataF.state} {dataF.zip} </p>
        </div>
      )}
    </div>
  );
}

export default Shop;

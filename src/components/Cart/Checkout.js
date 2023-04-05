//imported packages and styles
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//Validity functions
const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setformInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  //Save user Input in useRef()
  //and link it with ref attr in input element
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  //Check input values
  const confirmHandler = (event) => {
    event.preventDefault();
    //get user inputs from the form which are save in useRef()
    let enteredName = nameInputRef.current.value;
    let enteredStreet = streetInputRef.current.value;
    let enteredPostalCode = postalCodeInputRef.current.value;
    let enteredCity = cityInputRef.current.value;

    //Check if they are  valid or not
    const enteredNameIsValid = isEmpty(enteredName);
    const enteredStreetIsValid = isEmpty(enteredStreet);
    const enteredCityIsValid = isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    //Save the Validit of input in a State
    setformInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    //Check if the overal form is valid!
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name:enteredName,
        city:enteredCity,
        street:enteredStreet,
        postalCode:enteredPostalCode
    });
    enteredName = ''
    enteredStreet = ''
    enteredCity = ''
    enteredPostalCode = ''
  };

  //control elements classes

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    //form
    <form className={classes.form} onSubmit={confirmHandler}>
      {/*Name Input Div */}
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" ref={nameInputRef} id="name" />
      </div>
      {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      {/*Street Input Div */}
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetInputRef} id="street" />
      </div>
      {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      {/*City Input Div */}
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" ref={cityInputRef} id="city" />
      </div>
      {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      {/*Postal Code Input Div */}
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalCodeInputRef} id="postal" />
      </div>
      {!formInputsValidity.postalCode && (
        <p>Please enter a valid Postal Code!</p>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

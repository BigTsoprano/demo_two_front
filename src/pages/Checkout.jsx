import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom";



export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayInOrder, setBirthdayInOrder] = useState("");
  const [email, setEmail] = useState("");
  const [medical, setMedical] = useState(false);
  const [medicalCardNumber, setMedicalCardNumber] = useState("");
  const [medicalState, setMedicalState] = useState("");
  const [medicalExpiration, setMedicalExpiration] = useState("");
  const [medicalExpirationInOrder, setMedicalExpirationInOrder] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ChangeBirthdayOrder = () => {
      let birthdayArray = birthday.split("-");
      setBirthdayInOrder(
        birthdayArray[1] + "-" + birthdayArray[2] + "-" + birthdayArray[0]
      );
    };
    birthday && ChangeBirthdayOrder();
    const ChangeMedicalExpirationOrder = () => {
      let medicalExpirationArray = medicalExpiration.split("-");
      setMedicalExpirationInOrder(
        medicalExpirationArray[1] +
          "-" +
          medicalExpirationArray[2] +
          "-" +
          medicalExpirationArray[0]
      );
    };
    medicalExpiration && ChangeMedicalExpirationOrder();
  }, [birthday, medicalExpiration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await publicRequest.post("/orders", {
        //   userId: currentUser._id,
        product: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        amount: cart.total,
        // address: data.billing_details.address,
        firstName,
        lastName,
        phoneNumber,
        birthday,
        email,
        medicalCardNumber: medicalCardNumber,
        state: medicalState,
        medicalCardExpiration: medicalExpirationInOrder,
      });
      //   setOrderId(res.data._id);

      dispatch(resetCart());
    } catch {}
    setIsLoading(false);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setBirthday("");
    setBirthdayInOrder("");
    setEmail("");
    setMedicalCardNumber("");
    setMedicalState("");
    setMedicalExpiration("");
    setMedicalExpirationInOrder("");
  };

  console.log(birthday.split("-"));
  console.log(birthdayInOrder);
  console.log(medicalExpirationInOrder);

  return (
    <>
      {/* <div >
        <div style={{paddingTop:'15vh'}} className="wrapper ml-40 mr-40">
          <h1 className="text-3xl font-bold border-b pb-5">Checkout</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="customer mt-10">
              <h2 className="text-xl mb-5">Customer</h2>
              <div>
                <label
                  htmlFor="FirstName"
                  className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    required
                    type="text"
                    id="FirstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    First Name
                  </span>
                </label>
                <label
                  htmlFor="LastName"
                  className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    required
                    type="text"
                    id="LastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Last Name
                  </span>
                </label>
                <label
                  htmlFor="PhoneNumber"
                  className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    required
                    type="text"
                    id="PhoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Phone Number
                  </span>
                </label>
                <label
                  htmlFor="UserEmail"
                  className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    required
                    type="date"
                    id="Birthday"
                    placeholder="Birthday"
                    // value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Date of Birth
                  </span>
                </label>
                <label
                  htmlFor="UserEmail"
                  className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                >
                  <input
                    required
                    type="text"
                    id="UserEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Email
                  </span>
                </label>
              </div>
            </div>
            <div className="medical">
              <h2 className="text-xl mb-5 mt-5">
                Medical Infomation (optional)
              </h2>
              <div className="">
                <input
                  style={{ accentColor: "#22C55E" }}
                  type="checkbox"
                  name="medical"
                  id="medical"
                  onChange={() => setMedical(!medical)}
                />
                <label className="ml-2" htmlFor="">
                  I have a valid, in-state Medical Marijuana Card
                </label>
              </div>
              {medical && (
                <div>
                  <label
                    htmlFor="MedicalNumber"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <input
                      required={medical}
                      type="text"
                      id="MedicalNumber"
                      placeholder="Medical Number"
                      value={medicalCardNumber}
                      onChange={(e) => setMedicalCardNumber(e.target.value)}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Medical Card Number
                    </span>
                  </label>
                  <label
                    htmlFor="MedicalState"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <input
                      required={medical}
                      type="text"
                      id="MedicalState"
                      placeholder="State"
                      value={medicalState}
                      onChange={(e) => setMedicalState(e.target.value)}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      State
                    </span>
                  </label>
                  <label
                    htmlFor="MedicalExpiration"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <input
                      required={medical}
                      type="date"
                      id="MedicalExpiration"
                      placeholder="Medical Card Expiration"
                      value={medicalExpiration}
                      onChange={(e) => setMedicalExpiration(e.target.value)}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Medical card expiration
                    </span>
                  </label>
                </div>
              )}
            </div>
            <button
              //   disabled={isLoading || cart.products.length == 0}
              disabled={isLoading || cart.products.length == 0}
              type="submit"
              className="px-5 py-3 text-white duration-150 bg-green-500 rounded-lg hover:bg-green-700 active:shadow-lg"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div> */}


      {/*tailwind section*/}

<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <form>
      <div className="space-y-10">
        <div className="border-b font-semibold border-gray-900/10 pb-2">
         <p>Complete checkout</p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Customer information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Fill information to complete checkout</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div style={{maxWidth:'500px'}} className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
              
                 <input
                 style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}
                    required
                    type="text"
                    id="FirstName"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block bg-slate-100 w-full rounded-lg py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
              </div>
            </div>

            <div style={{maxWidth:'500px'}} className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
              
                <input
                                 style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}

                    required
                    type="text"
                    id="LastName"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full bg-slate-100 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
              </div>
            </div>

            <div style={{maxWidth:'500px'}} className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
               
                 <input
                                  style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}

                    required
                    type="text"
                    id="UserEmail"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg bg-slate-100 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
              </div>
            </div>
            <div style={{maxWidth:'500px'}} className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
               
             

                  <input
                                   style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}

                    required
                    type="text"
                    id="PhoneNumber"
                    placeholder=""
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block bg-slate-100 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>

            <div style={{maxWidth:'300px'}} className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Date of birth
              </label>
              <input
              style={{padding:'10px'}}
                    required
                    type="date"
                    id="Birthday"
                    placeholder="Birthday"
                    // value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="peer h-8 rounded-lg w-full border bg-transparent p-0 placeholder-transparent  focus:outline-none focus:ring-0 sm:text-sm"
                  />
              </div>
<div>
            <div style={{display:'flex',flexDirection:'row', paddingTop:'2rem'}}>
            <div style={{paddingRight:'1rem'}} className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      onChange={() => setMedical(!medical)}

                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  </div>
              <div className="text-sm leading-6">
                    <label style={{whiteSpace:'nowrap'}} htmlFor="comments" className="font-medium text-gray-900">
                    Medical Infomation (optional)                    </label>
                  </div>
                </div>
               
                  </div>
              {medical && (
                <div className="sm:col-span-3">
             <div style={{maxWidth:'500px'}} >
             <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
               Medical card number
             </label>
             <div className="mt-2">
             
                   <input
                                    style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}

                      required={medical}
                      type="text"
                      id="MedicalNumber"
                      placeholder=""
                      value={medicalCardNumber}
                      onChange={(e) => setMedicalCardNumber(e.target.value)}
                      className="block w-full bg-slate-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
             </div>
           </div>
           <div style={{maxWidth:'100px'}}  >
             <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
               State of issue
             </label>
             <div className="mt-2">
             
                
                      <input
                                       style={{boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}

                      required={medical}
                      type="text"
                      id="MedicalState"
                      placeholder="State"
                      value={medicalState}
                      onChange={(e) => setMedicalState(e.target.value)}
                      className="block w-full bg-slate-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                   
             </div>
           </div>
           <div style={{maxWidth:'300px'}} className="sm:col-span-3">
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                Card expiration date
              </label>
             
                    <input
                    style={{padding:'10px'}}
                      required={medical}
                      type="date"
                      id="MedicalExpiration"
                      placeholder="Medical Card Expiration"
                      value={medicalExpiration}
                      onChange={(e) => setMedicalExpiration(e.target.value)}
                      className="peer h-8 rounded-lg  w-full border bg-transparent p-0 placeholder-transparent  focus:outline-none focus:ring-0 sm:text-sm"
                      />
              </div>
</div>
           
            
          )}
           
            

            
          </div>
        </div>

        
      </div>

      <div className="mt-6 flex items-center justify-start gap-x-6">
        <Link to="/">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
      </Link>
        <button
        style={{padding: '12px 16px'}}
              //   disabled={isLoading || cart.products.length == 0}
              disabled={isLoading || cart.products.length == 0}
              type="submit"
              className="bg-green-500 rounded-lg hover:bg-white hover:border hover:border-black hover:text-black transition duration-100">
              {isLoading ? "Loading..." : "Submit"}
            </button>

      
      </div>
    </form>
    </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";

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
      <div >
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
      </div>
    </>
  );
}

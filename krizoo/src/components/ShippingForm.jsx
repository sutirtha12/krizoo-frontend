function ShippingForm({ shipping, setShipping }) {
  const update = (key, value) => {
    setShipping(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl mb-10">
      <h2 className="tracking-widest mb-6 text-xl">
        SHIPPING DETAILS
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* FIRST NAME */}
        <input
          type="text"
          placeholder="First Name"
          value={shipping.firstname}
          onChange={e => update("firstname", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* LAST NAME */}
        <input
          type="text"
          placeholder="Last Name"
          value={shipping.lastname}
          onChange={e => update("lastname", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={shipping.email}
          onChange={e => update("email", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={shipping.phone}
          onChange={e => update("phone", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* ADDRESS */}
        <input
          type="text"
          placeholder="Address (House / Street)"
          value={shipping.addressLine}
          onChange={e => update("addressLine", e.target.value)}
          className="p-4 bg-black/40 rounded-xl md:col-span-2"
        />

        {/* CITY */}
        <input
          type="text"
          placeholder="City"
          value={shipping.city}
          onChange={e => update("city", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* STATE */}
        <input
          type="text"
          placeholder="State"
          value={shipping.state}
          onChange={e => update("state", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />

        {/* PINCODE */}
        <input
          type="text"
          placeholder="Pincode"
          value={shipping.pincode}
          onChange={e => update("pincode", e.target.value)}
          className="p-4 bg-black/40 rounded-xl"
        />
      </div>
    </div>
  );
}

export default ShippingForm;
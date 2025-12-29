import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(form);

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section
      className="
        min-h-screen
        flex items-center justify-center
        px-4 sm:px-6
        py-24 sm:py-32
      "
    >
      <div className="max-w-3xl w-full">
        {/* TITLE */}
        <h1
          className="
            font-brand
            text-3xl sm:text-4xl
            tracking-widest
            mb-4 sm:mb-6
            text-center
          "
        >
          CONTACT
        </h1>

        <p
          className="
            text-center
            text-[11px] sm:text-sm
            opacity-60
            tracking-widest
            mb-12 sm:mb-16
          "
        >
          WE WOULD LOVE TO HEAR FROM YOU
        </p>

        {/* FORM */}
        <form
          onSubmit={submitHandler}
          className="
            bg-white/5 backdrop-blur-xl
            rounded-2xl sm:rounded-3xl
            p-6 sm:p-10
            shadow-2xl
            space-y-6 sm:space-y-8
          "
        >
          <input
            type="text"
            name="name"
            placeholder="YOUR NAME"
            value={form.name}
            onChange={changeHandler}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-black/40
              border border-white/10
              focus:outline-none focus:border-white/40
              tracking-widest
              text-xs sm:text-sm
            "
          />

          <input
            type="email"
            name="email"
            placeholder="EMAIL ADDRESS"
            value={form.email}
            onChange={changeHandler}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-black/40
              border border-white/10
              focus:outline-none focus:border-white/40
              tracking-widest
              text-xs sm:text-sm
            "
          />

          <textarea
            name="message"
            placeholder="YOUR MESSAGE"
            value={form.message}
            onChange={changeHandler}
            rows={5}
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-black/40
              border border-white/10
              focus:outline-none focus:border-white/40
              tracking-widest
              text-xs sm:text-sm
              resize-none
            "
          />

          <button
            type="submit"
            className="
              w-full
              py-4 sm:py-5
              rounded-full
              bg-white text-black
              font-bold
              tracking-widest
              text-xs sm:text-sm
              transition
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            SEND MESSAGE
          </button>
        </form>

        {/* FOOT INFO */}
        <div
          className="
            mt-12 sm:mt-16
            text-center
            text-[10px] sm:text-xs
            opacity-50
            tracking-widest
          "
        >
          <p>KRIZOO — SELF IMPROVEMENT MEETS COMFORT</p>
          <p className="mt-2">krizooofficial@gmail.com</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
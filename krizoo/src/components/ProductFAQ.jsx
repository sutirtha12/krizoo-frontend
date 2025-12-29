import { useState } from "react";

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between tracking-widest"
      >
        {title}
        <span>{open ? "-" : "+"}</span>
      </button>

      {open && (
        <div className="mt-4 text-sm opacity-70">
          {children}
        </div>
      )}
    </div>
  );
};

export default function ProductFAQ({ product }) {
  return (
    <div className="mt-16">
      <Section title="DESCRIPTION">
        {product.description}
      </Section>

      <Section title="FABRIC & FIT">
        Material: {product.material} <br />
        Fit: {product.fit} <br />
        GSM: {product.gsm}
      </Section>

      <Section title="SIZE GUIDE">
        XS–XXL available. True to size.  
        For compression fits, size up if between sizes.
      </Section>
    </div>
  );
}
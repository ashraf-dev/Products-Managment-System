"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //لمعالجه الرسائل القادمه من الباك اند لو في مشاكل او اشي تاني
  const [message, setMessage] = useState("");

  //بتشتغل مع كل ضغطه ادخال للبيانات
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

const router = useRouter();

async function handleSubmit(e) {
  e.preventDefault();//هذا السطر لمنع اعاده تحميل الصفحه - السلوك الافتراضي

  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),//,هذا السطر تحويل form الى  json
  });

  const data = await res.json();

  if (res.ok) {
    // Registration successful
    router.push("/login");
  } 
  /*else {
    setError(data.message);
  }*/

  setMessage(data.message);
}

return (
  <main className="min-h-screen flex items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-96"
    >
    <h1 className="text-2xl font-bold mb-4">
  Register
</h1>

<input
  name="name"
  placeholder="Name"
  onChange={handleChange}
  className="border p-2 w-full mb-3"
/>

<input
  name="email"
  type="email"
  placeholder="Email"
  onChange={handleChange}
  className="border p-2 w-full mb-3"
/>

<input
  name="password"
  type="password"
  placeholder="Password"
  onChange={handleChange}
  className="border p-2 w-full mb-3"
/>
<button
  className="bg-black text-white w-full py-2"
>
  Register
</button>

{message && (
  <p className="mt-3 text-center">
    {message}
  </p>
)}
    </form>
  </main>
);
}
import React, { useState } from "react";
import { supabase } from "./utils/supabase";

export default function AuthBox({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup!");
    }
  }

  async function logIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
    }
  }

  async function logOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 px-3 py-2 text-sm font-bold text-white">
          {user.email}
        </div>

        <button
          onClick={logOut}
          className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#10182A]"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-xl px-3 py-2 text-sm text-slate-900"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="rounded-xl px-3 py-2 text-sm text-slate-900"
      />

      <button
        onClick={logIn}
        className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white"
      >
        Log in
      </button>

      <button
        onClick={signUp}
        className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#10182A]"
      >
        Sign up
      </button>
    </div>
  );
}

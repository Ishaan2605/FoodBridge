import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErrorMsg(error.message);

    const user_id = data.user?.id;

    const { data: userData, error: fetchError } = await supabase
      .from('Users')
      .select('role')
      .eq('id', user_id)
      .single();

    if (fetchError || !userData) return setErrorMsg('Failed to fetch user role');

    router.push(userData.role === 'donor' ? '/donor/DonorDashboard' : '/receiver/ReceiverDashboard');
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData, error } = await supabase
          .from('Users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!error && userData) {
          router.push(userData.role === 'donor' ? '/donor/DonorDashboard' : '/receiver/ReceiverDashboard');
        }
      }
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-100 to-orange-200 px-4 animate-fade-in">
      <form onSubmit={handleLogin} className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border-t-[6px] border-orange-400">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6 tracking-wide">Welcome Back 👋</h2>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="input-style" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-style" required />

        <button type="submit" className="btn-primary mt-2 w-full">🔐 Login</button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account? <a href="/auth/Signup" className="text-orange-600 font-semibold hover:underline">Sign Up</a>
        </p>
      </form>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          background-color: #f9fafb;
          font-size: 14px;
          color: #1f2937;
        }

        .input-style::placeholder {
          color: #6b7280;
        }

        .input-style:focus {
          border-color: #f97316;
          outline: none;
          background-color: white;
        }

        .btn-primary {
          padding: 12px;
          background-color: #f97316;
          color: white;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #ea580c;
          transform: translateY(-1px);
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

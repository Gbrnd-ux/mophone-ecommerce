import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function LoginPage({ navigate }: { navigate: (path: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email atau password salah. Silakan coba lagi.';
      case 'auth/invalid-email':
        return 'Format email tidak valid.';
      case 'auth/user-disabled':
        return 'Akun ini telah dinonaktifkan.';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan login. Coba lagi nanti.';
      default:
        return 'Terjadi kesalahan. Silakan coba lagi.';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Cek apakah email sudah diverifikasi
      if (!user.emailVerified) {
        await auth.signOut();
        setError(
          'Email Anda belum diverifikasi. Silakan cek inbox email Anda dan klik link konfirmasi terlebih dahulu.'
        );
        setLoading(false);
        return;
      }

      navigate('/');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      setError(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-[#f5f2ee]">
      <div className="w-full max-w-md bg-white p-10 shadow-sm border border-[#0f0e0d]/5">
        <h1 className="font-display text-4xl text-center mb-8 text-[#0f0e0d]">Sign In</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm text-center border border-red-100 leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] font-medium tracking-widest uppercase mb-2 text-[#0f0e0d]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#0f0e0d]/20 px-4 py-3 text-[13px] focus:outline-none focus:border-[#c8a97e] transition-colors"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium tracking-widest uppercase mb-2 text-[#0f0e0d]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#0f0e0d]/20 px-4 py-3 pr-12 text-[13px] focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6459] hover:text-[#0f0e0d] transition-colors"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f0e0d] text-white py-4 text-[11px] font-medium tracking-widest uppercase hover:bg-[#c8a97e] transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-[13px] text-[#0f0e0d]/60">
          Don&apos;t have an account?{' '}
          <a
            href="#/register"
            onClick={(e) => { e.preventDefault(); navigate('/register'); }}
            className="text-[#0f0e0d] underline hover:text-[#c8a97e]"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}

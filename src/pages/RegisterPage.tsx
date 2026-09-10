import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
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

export function RegisterPage({ navigate }: { navigate: (path: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.';
      case 'auth/invalid-email':
        return 'Format email tidak valid.';
      case 'auth/weak-password':
        return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
      default:
        return 'Terjadi kesalahan. Silakan coba lagi.';
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      await sendEmailVerification(userCredential.user);
      // Sign out immediately — user must verify email first before logging in
      await auth.signOut();
      setSuccess(true);
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
        <h1 className="font-display text-4xl text-center mb-8 text-[#0f0e0d]">Create Account</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm text-center border border-red-100 leading-relaxed">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <div className="bg-green-50 text-green-700 p-4 mb-6 text-sm border border-green-200 leading-relaxed">
              <p className="font-semibold mb-2">Akun berhasil dibuat!</p>
              <p>Email verifikasi telah dikirim ke:</p>
              <p className="font-medium mt-1 text-green-800">{email}</p>
              <p className="mt-2 text-green-600">Silakan cek inbox (atau folder Spam) dan klik link verifikasi sebelum login.</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#0f0e0d] text-white py-4 text-[11px] font-medium tracking-widest uppercase hover:bg-[#c8a97e] transition-colors"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase mb-2 text-[#0f0e0d]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#0f0e0d]/20 px-4 py-3 text-[13px] focus:outline-none focus:border-[#c8a97e] transition-colors"
                placeholder="John Doe"
              />
            </div>

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
                  placeholder="Min. 6 karakter"
                  required
                  minLength={6}
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

            <div>
              <label className="block text-[11px] font-medium tracking-widest uppercase mb-2 text-[#0f0e0d]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-[#0f0e0d]/20 px-4 py-3 pr-12 text-[13px] focus:outline-none focus:border-[#c8a97e] transition-colors"
                  placeholder="Ulangi password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6459] hover:text-[#0f0e0d] transition-colors"
                  aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <EyeIcon show={showConfirmPassword} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f0e0d] text-white py-4 text-[11px] font-medium tracking-widest uppercase hover:bg-[#c8a97e] transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        {!success && (
          <div className="mt-8 text-center text-[13px] text-[#0f0e0d]/60">
            Already have an account?{' '}
            <a
              href="#/login"
              onClick={(e) => { e.preventDefault(); navigate('/login'); }}
              className="text-[#0f0e0d] underline hover:text-[#c8a97e]"
            >
              Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

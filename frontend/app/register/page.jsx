'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setToken(response.data.token);
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-black">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Create Account
            </h2>
            <p className="text-gray-600 text-lg">
              Join TaskFlow to manage your tasks efficiently
            </p>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-md mb-6">
              <p className="font-medium">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:border-gray-400'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:border-gray-400'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent ${
                  errors.password
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:border-gray-400'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:border-transparent ${
                  errors.confirmPassword
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-100 hover:border-gray-400'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3399FF] text-white py-3.5 px-4 rounded-lg hover:bg-[#1a7fd4] hover:shadow-lg transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3399FF] focus:ring-offset-2 mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-base">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#3399FF] hover:text-[#1a7fd4] font-semibold hover:underline transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

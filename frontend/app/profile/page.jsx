'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { isAuthenticated, setUser as setStoredUser } from '@/lib/auth';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.updateProfile(formData);
      setUser(response.data.user);
      setStoredUser(response.data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-primary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-primary-600">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account information</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-md mb-6">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-md mb-6">
              <p className="font-medium">{success}</p>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <p className="text-lg text-gray-900 font-medium">{user?.name}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <p className="text-lg text-gray-900 font-medium">{user?.email}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Member Since
                </label>
                <p className="text-lg text-gray-900 font-medium">
                  {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  className="w-full px-4 py-3 border-2 border-gray-800 bg-gray-100 rounded-lg text-black placeholder-black placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
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
                  required
                  className="w-full px-4 py-3 border-2 border-gray-800 bg-gray-100 rounded-lg text-black placeholder-black placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
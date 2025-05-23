import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/useAuthStore';
import { FaEye, FaEyeSlash, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
   四年Number: '',
    country: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    genderPreference: '',
  });

  const [errors, setErrors] = useState({});
  const { signup, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Nigeria',
    'Ghana',
    'South Africa',
    'Kenya',
    'India',
    'China',
    'Japan',
    'Germany',
    'France',
    'Brazil',
    'Mexico',
  ];

  const countryCodes = {
    'United States': '+1',
    'Canada': '+1',
    'United Kingdom': '+44',
    'Australia': '+61',
    'Nigeria': '+234',
    'Ghana': '+233',
    'South Africa': '+27',
    'Kenya': '+254',
    'India': '+91',
    'China': '+86',
    'Japan': '+81',
    'Germany': '+49',
    'France': '+33',
    'Brazil': '+55',
    'Mexico': '+52',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const selectedCountryCode = countryCodes[value] || '';
      setFormData((prev) => {
        const currentPhone = prev.phoneNumber.replace(/^\+\d+/, '').trim(); // Remove existing country code
        const newPhoneNumber = selectedCountryCode ? `${selectedCountryCode} ${currentPhone}` : currentPhone;
        return { ...prev, country: value, phoneNumber: newPhoneNumber };
      });
    } else if (name === 'phoneNumber') {
      const selectedCountryCode = countryCodes[formData.country] || '';
      // Prevent modifying the country code part if the user is editing the number
      if (selectedCountryCode && !value.startsWith(selectedCountryCode)) {
        setFormData((prev) => ({
          ...prev,
          phoneNumber: `${selectedCountryCode} ${value.replace(selectedCountryCode, '').trim()}`,
        }));
      } else {
        setFormData((prev) => ({ ...prev, phoneNumber: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (parseInt(formData.age) < 18) newErrors.age = 'You must be at least 18 years old';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.genderPreference) newErrors.genderPreference = 'Gender preference is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signup(formData).then(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('signupSuccess', { detail: formData }));
      }
      navigate('/profile', { state: { userData: formData } });
    }).catch((error) => {
      setErrors({ general: error.response?.data?.message || 'Something went wrong' });
    });
  };

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-pink-600">Create Your Account</h2>
      </div>
      {errors.general && (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
          {errors.general}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="18+"
                autoComplete="bday"
              />
              {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={formData.country ? `${countryCodes[formData.country]} 1234567890` : '+1234567890'}
                autoComplete="tel"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-pink-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-pink-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Gender
            </label>
            <div className="flex gap-4">
              {['male', 'female'].map((gender) => (
                <div key={gender} className="flex items-center">
                  <input
                    id={gender}
                    name="gender"
                    type="radio"
                    checked={formData.gender === gender}
                    onChange={() => setFormData((prev) => ({ ...prev, gender }))}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label
                    htmlFor={gender}
                    className="ml-2 text-sm text-gray-600 capitalize"
                  >
                    {gender}
                  </label>
                </div>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interested In
            </label>
            <div className="space-y-2">
              {['male', 'female', 'both'].map((pref) => (
                <div key={pref} className="flex items-center">
                  <input
                    id={`prefer-${pref}`}
                    name="genderPreference"
                    type="radio"
                    value={pref}
                    checked={formData.genderPreference === pref}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label
                    htmlFor={`prefer-${pref}`}
                    className="ml-2 text-sm text-gray-600 capitalize"
                  >
                    {pref === 'both' ? 'Both genders' : pref}
                  </label>
                </div>
              ))}
            </div>
            {errors.genderPreference && (
              <p className="mt-1 text-xs text-red-500">{errors.genderPreference}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading ? 'bg-pink-400' : 'bg-pink-600 hover:bg-pink-700'
            } flex items-center justify-center`}
            disabled={loading}
          >
            <FaHeart className="mr-2" />
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button
            onClick={toggleForm}
            className="text-pink-600 hover:text-pink-700 font-medium"
            type="button"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default SignupForm;
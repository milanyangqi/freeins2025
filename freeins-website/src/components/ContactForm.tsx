'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import axios from 'axios';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    
    try {
      await axios.post('/api/contact', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(true);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{t('messageUs')}</h2>
      
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {t('messageSent')}
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {t('messageError')}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            {t('yourName')}
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{t('yourName')} is required</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            {t('yourEmail')}
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', { 
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
            })}
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500 text-sm mt-1">{t('yourEmail')} is required</p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="text-red-500 text-sm mt-1">Invalid email address</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            {t('yourMessage')}
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{t('yourMessage')} is required</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
        >
          {isSubmitting ? 'Sending...' : t('send')}
        </button>
      </form>
    </div>
  );
}
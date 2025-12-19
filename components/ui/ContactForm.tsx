'use client';

import { useState, FormEvent } from 'react';
import Button from './Button';

interface ContactFormProps {
  formType?: 'contact' | 'partnership';
}

export default function ContactForm({ formType = 'contact' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // In production, replace with actual Formspree endpoint
      const formspreeId = formType === 'partnership'
        ? process.env.NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM
        : process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM;

      if (!formspreeId) {
        // In development, simulate successful submission
        // In production, this shouldn't happen if env vars are properly set
        setStatus('success');
        form.reset();
        return;
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {formType === 'partnership' ? (
        <>
          <div>
            <label htmlFor="organization" className="block font-montserrat font-semibold mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block font-montserrat font-semibold mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block font-montserrat font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-montserrat font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="orgType" className="block font-montserrat font-semibold mb-2">
              Organization Type
            </label>
            <select
              id="orgType"
              name="orgType"
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            >
              <option value="">Select type</option>
              <option value="school">School</option>
              <option value="team">Team</option>
              <option value="youth">Youth Program</option>
              <option value="church">Church</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="teamSize" className="block font-montserrat font-semibold mb-2">
              Team Size / Order Quantity
            </label>
            <input
              type="text"
              id="teamSize"
              name="teamSize"
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-montserrat font-semibold mb-2">
              Message / Vision *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm resize-none"
            ></textarea>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="name" className="block font-montserrat font-semibold mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-montserrat font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-montserrat font-semibold mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm"
            >
              <option value="general">General Inquiry</option>
              <option value="partnership">Partnership</option>
              <option value="order">Order Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block font-montserrat font-semibold mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gold focus:outline-none rounded-sm resize-none"
            ></textarea>
          </div>
        </>
      )}

      {status === 'success' && (
        <div className="p-4 bg-green-100 text-green-800 rounded-sm">
          Thanks! We'll be in touch within 24-48 hours.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-100 text-red-800 rounded-sm">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full">
        {status === 'loading' ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}

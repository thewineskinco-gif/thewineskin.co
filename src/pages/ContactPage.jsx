import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import Footer from '../components/Footer';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ccc',
  outline: 'none',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '16px',
  color: '#1a1a1a',
  backgroundColor: 'white',
  marginBottom: '16px'
};

const ContactPage = () => {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message sent! We\'ll be in touch shortly.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="w-full flex items-center justify-center" style={{ minHeight: '30vh', backgroundColor: '#1a1a1a' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: 'white', letterSpacing: '0.08em' }}>
          CONTACT US
        </h1>
      </div>

      <div className="px-6 lg:px-16 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 400, color: '#1a1a1a', marginBottom: '16px' }}>Get in Touch</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
              Have a question about an order, bespoke tailoring, or just want to say hello? We'd love to hear from you.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { label: 'Email', value: 'hello@thewineskin.co' },
                { label: 'Phone', value: '+91 98765 43210' },
                { label: 'Atelier', value: 'Jaipur, Rajasthan, India' },
                { label: 'Hours', value: 'Mon–Sat, 10am–7pm IST' }
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: '4px' }}>{label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#1a1a1a' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input style={inputStyle} name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
            <input style={inputStyle} name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
            <textarea
              name="message"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type="submit"
              className="w-full transition-colors duration-200"
              style={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                border: 'none',
                padding: '16px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;

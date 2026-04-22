'use client';

export default function Contact() {
  const phoneNumber = '+216 23 770 581';  // Updated with correct phone number from main branch
  const whatsappNumber = '+216 23 770 581';  // Updated with correct WhatsApp number from main branch
  const address = 'Oryx Medical Center, Manar 2, Tunis, Tunisia';  // Updated with correct address from main branch

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600">Reach out to Cabinet Dentaire Dr Maha Chaouch for appointments or inquiries.</p>
          
          <div className="space-y-4">
            <p className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">Phone:</span>
              <a href={`tel:${phoneNumber}`} className="text-blue-500 hover:underline">{phoneNumber}</a>
            </p>
            <p className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">WhatsApp:</span>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:underline"
              >
                Chat on WhatsApp ({whatsappNumber})
              </a>
            </p>
            <p className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">Address:</span>
              <a
                href="https://maps.app.goo.gl/y3anxC9ddDkVYPkJ9"  // Updated with correct maps link from main branch
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {address}
              </a>
            </p>
          </div>
        </div>

        {/* Google Maps */}
        <div className="w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.957598633591!2d10.1531029!3d36.8383401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33ca22ebe471%3A0x4ffc10136272f775!2sCabinet%20Dentaire%20Dr%20Maha%20Chaouch!5e0!3m2!1sen!2stn!4v1692658730123!5m2!1sen!2stn"  // Updated with actual map embed from main branch
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

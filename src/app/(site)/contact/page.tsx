// src/app/(site)/contact/page.tsx
import ContactForm from "../../components/ui/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | ELITRAX Consultancy",
  description: "Get in touch with ELITRAX for your premium travel and visa consultancy needs.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Get in Touch</h1>
            <p className="text-gray-400 leading-relaxed">
              Our advisory team is ready to analyze your profile and outline a definitive strategy for your travel objectives.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-navy-800">
              <MapPin className="w-6 h-6 text-gold-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Headquarters</h4>
                <p className="text-sm text-gray-400">Suite 400, Financial District Tower, Global Plaza</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-navy-800">
              <Phone className="w-6 h-6 text-gold-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Direct Line</h4>
                <p className="text-sm text-gray-400">+1 (800) 555-ELIT</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-navy-800">
              <Mail className="w-6 h-6 text-gold-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Electronic Mail</h4>
                <p className="text-sm text-gray-400">consult@elitrax.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-navy-800">
              <Clock className="w-6 h-6 text-gold-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Operating Hours</h4>
                <p className="text-sm text-gray-400">Mon - Fri: 09:00 AM - 18:00 PM<br/>Sat - Sun: Priority Appointments Only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        
      </div>
    </div>
  );
}
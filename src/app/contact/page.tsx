import ContactForm from '@/components/ContactForm';
import { AnimatedHeadline } from '../../components/text-effects/AnimatedHeadline';
import { AuroraBackground } from '../../components/aurora-background';

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <AuroraBackground className="text-white py-16 min-h-[400px] h-auto flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              <AnimatedHeadline 
                text="Contact Us" 
                delay={0.2}
                duration={0.9}
                distance={25}
              />
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              <AnimatedHeadline 
                text="Have questions or ready to get started? Reach out today." 
                delay={0.5}
                duration={1.0}
                distance={30}
              />
            </p>
          </div>
        </div>
      </AuroraBackground>

      {/* Contact Section */}
      <section className="py-16 bg-gray-800 relative">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" 
          style={{
            animation: 'borderGlowPulse 6s infinite',
            zIndex: 5
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                We&apos;d love to hear from you. Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="rgb(102, 57, 218)">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-gray-300">
                    <p className="text-lg font-medium">Phone</p>
                    <p>(330) 357-9229</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="rgb(102, 57, 218)">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-gray-300">
                    <p className="text-lg font-medium">Email</p>
                    <p>supernovaautomations@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

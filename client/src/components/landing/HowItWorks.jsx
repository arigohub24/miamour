
import { UserPlus, Heart, Calendar, Gift } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Single step card (static, no animation)
 */
const Step = ({ icon, title, description }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-primary-500 text-white rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

Step.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <UserPlus className="h-6 w-6" />,
      title: 'Create Your Profile',
      description: 'Sign up and build your detailed profile. Share your interests, preferences, and what makes you unique to find the most compatible matches.',
    },
    {
      number: 2,
      icon: <Heart className="h-6 w-6" />,
      title: 'Discover Matches',
      description: 'Our algorithm suggests potential matches based on compatibility. Browse profiles, express interest, and start meaningful conversations.',
    },
    {
      number: 3,
      icon: <Calendar className="h-6 w-6" />,
      title: 'Plan Your Journey',
      description: 'From planning your first date to organizing your dream wedding, our platform provides tools and resources for every step.',
    },
    {
      number: 4,
      icon: <Gift className="h-6 w-6" />,
      title: 'Begin Forever',
      description: 'Join our community of success stories as you embark on your journey of forever with your soulmate.',
    },
  ];

  return (
    <section id="how-it-works" className="section py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl mb-4 text-secondary-800">
            How <span className="text-primary-500">Miamour</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding your soulmate is just four simple steps away. Our streamlined process makes your journey to love both enjoyable and effective.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-12">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

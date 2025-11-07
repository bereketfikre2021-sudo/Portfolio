import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Download, CheckCircle, Gift, Users, Star } from 'lucide-react';
import { useForm } from '@formspree/react';

const NewsletterSignup = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  
  // Formspree integration
  const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mandzwvb';
  const [state, handleSubmit] = useForm(formspreeFormId);
  
  // Track newsletter signup on successful submission
  React.useEffect(() => {
    if (state.succeeded && window.gtag) {
      window.gtag('event', 'sign_up', {
        event_category: 'newsletter',
        event_label: 'design_insights'
      });
    }
  }, [state.succeeded]);

  const incentives = [
    {
      icon: Download,
      title: "Free Design Templates",
      description: "Get 5 professional design templates worth $50"
    },
    {
      icon: Gift,
      title: "Exclusive Content",
      description: "Access to behind-the-scenes design processes"
    },
    {
      icon: Users,
      title: "Design Community",
      description: "Join 500+ designers in our private community"
    },
    {
      icon: Star,
      title: "Weekly Insights",
      description: "Get the latest design trends and tips every week"
    }
  ];

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-2xl mx-auto ${className}`}
      >
        <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/30">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-light mb-2">
              Welcome to the Design Community! 🎉
            </h3>
            <p className="text-accent/80 mb-6">
              Thank you for subscribing! Check your email for your free design templates and exclusive content.
            </p>
            
            <div className="bg-primary/50 rounded-lg p-4 border border-accent/20">
              <h4 className="text-lg font-semibold text-light mb-2">What's Next?</h4>
              <ul className="text-accent/80 text-sm space-y-1">
                <li>✓ Check your email for the welcome package</li>
                <li>✓ Download your free design templates</li>
                <li>✓ Join our private design community</li>
                <li>✓ Get weekly design insights every Friday</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/30 overflow-hidden">
        <CardHeader className="text-center pb-4">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 w-fit mx-auto text-lg font-semibold">
            <Mail className="w-3 h-3 mr-1" />
            Design Insights
          </Badge>
          
          <CardTitle className="text-3xl font-bold text-light mb-2">
            Stay Ahead of Design Trends
          </CardTitle>
          <p className="text-accent/80 text-lg">
            Join 500+ designers getting weekly insights, free templates, and exclusive content.
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Incentives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {incentives.map((incentive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-3 bg-primary/30 rounded-lg border border-accent/20"
              >
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <incentive.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-light text-sm">{incentive.title}</h4>
                  <p className="text-accent/70 text-xs">{incentive.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary/50 border-accent/30 text-light placeholder-accent/50 focus:border-accent"
              />
              <Button
                type="submit"
                disabled={state.submitting}
                className="bg-accent text-primary hover:bg-accent/90 font-semibold px-8"
              >
                {state.submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Subscribe Free
                  </div>
                )}
              </Button>
            </div>
            
            {state.errors && state.errors.length > 0 && (
              <div className="text-red-400 text-sm mb-3 text-center">
                {state.errors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </div>
            )}
            
            <p className="text-xs text-accent/60 text-center">
              No spam, unsubscribe at any time. We respect your privacy and never share your email.
            </p>
          </form>

          {/* Social Proof */}
          <div className="mt-6 pt-6 border-t border-accent/20">
            <div className="flex items-center justify-center gap-6 text-accent/70 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>500+ Subscribers</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Free Forever</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsletterSignup;

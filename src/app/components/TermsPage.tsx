import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8">
        <Link to="/" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-warm-gray/50 hover:text-warm-white transition-colors"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 px-8 md:px-16 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-8 h-px bg-gold/40 mb-10" />

          <h1 className="font-serif text-warm-white mb-3" style={{ fontSize: '2rem' }}>
            Terms of Service
          </h1>
          <p className="text-warm-gray/40 font-sans mb-16" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            Last updated: February 23, 2026
          </p>

          <div className="space-y-12">
            <Section title="1. Acceptance of Terms">
              By accessing or using The Allocation platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). 
              The Allocation operates as a private, invitation-only distribution channel for luxury goods. Access to this Platform 
              constitutes acceptance of these Terms in their entirety. If you do not agree, you must discontinue use immediately.
            </Section>

            <Section title="2. Membership & Eligibility">
              Membership is granted at the sole and absolute discretion of The Allocation. Submission of an application does not 
              guarantee acceptance. Members must be at least 18 years of age and possess the legal capacity to enter into binding 
              agreements. The Allocation reserves the right to revoke membership at any time, without cause or prior notice, and 
              without obligation to provide reasoning.
            </Section>

            <Section title="3. Allocation & Bidding">
              All allocations presented on the Platform are subject to availability and may be withdrawn at any time prior to the 
              conclusion of an auction cycle. Bids placed through the Platform are binding and irrevocable once submitted. Members 
              acknowledge that reserve prices are concealed and that The Allocation is under no obligation to disclose reserve 
              thresholds. Bid increments are predetermined and non-negotiable.
            </Section>

            <Section title="4. Payment & Settlement">
              Successful bidders are obligated to complete payment within 48 hours of auction close. Accepted payment methods include 
              wire transfer, certified bank draft, and approved digital payment instruments. Failure to remit payment within the 
              stipulated period will result in forfeiture of the allocation and potential membership suspension.
            </Section>

            <Section title="5. Intellectual Property">
              All content, design elements, branding, proprietary algorithms, and curation methodologies displayed on the Platform 
              are the exclusive intellectual property of The Allocation. No portion of the Platform may be reproduced, distributed, 
              or transmitted in any form without prior written consent. Member accounts are non-transferable.
            </Section>

            <Section title="6. Limitation of Liability">
              The Allocation provides the Platform on an "as is" and "as available" basis. We make no warranties, express or implied, 
              regarding the accuracy of product descriptions, authenticity guarantees beyond our stated verification processes, or 
              uninterrupted access to the Platform. In no event shall The Allocation be liable for indirect, incidental, consequential, 
              or punitive damages arising from your use of the Platform.
            </Section>

            <Section title="7. Dispute Resolution">
              Any disputes arising from or relating to these Terms or the use of the Platform shall be resolved through binding 
              arbitration administered by a mutually agreed-upon arbitration body, conducted in English. Members waive the right 
              to participate in class action proceedings. The prevailing party shall be entitled to recover reasonable legal fees.
            </Section>

            <Section title="8. Modifications">
              The Allocation reserves the right to modify these Terms at any time. Material changes will be communicated to active 
              members via the registered communication channel. Continued use of the Platform following notification of changes 
              constitutes acceptance of the revised Terms.
            </Section>

            <Section title="9. Governing Law">
              These Terms are governed by and construed in accordance with applicable international commercial law principles. 
              The Allocation operates across multiple jurisdictions and will comply with local regulations as required.
            </Section>
          </div>

          <div className="mt-20 pt-10 border-t border-border/20">
            <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', lineHeight: 1.8, letterSpacing: '0.02em' }}>
              For inquiries regarding these Terms, contact your designated membership concierge 
              or write to legal@theallocation.com.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-warm-white mb-4" style={{ fontSize: '0.95rem' }}>
        {title}
      </h3>
      <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.8rem', lineHeight: 1.9, letterSpacing: '0.01em' }}>
        {children}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-8 md:px-16 py-8 border-t border-border/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
          &copy; 2026 The Allocation. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link to="/terms" className="text-warm-white/50 font-sans hover:text-warm-white transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Terms
          </Link>
          <Link to="/privacy" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Privacy
          </Link>
          <Link to="/confidentiality" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Confidentiality
          </Link>
        </div>
      </div>
    </footer>
  );
}

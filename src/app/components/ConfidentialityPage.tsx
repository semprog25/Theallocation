import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export function ConfidentialityPage() {
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
            Confidentiality Agreement
          </h1>
          <p className="text-warm-gray/40 font-sans mb-16" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            Last updated: February 23, 2026
          </p>

          {/* Classification Banner */}
          <div className="border border-gold/20 bg-gold/[0.03] px-6 py-5 mb-16 flex items-start gap-4">
            <ShieldAlert className="w-4 h-4 text-gold/50 mt-0.5 shrink-0" />
            <p className="text-warm-gray/60 font-sans" style={{ fontSize: '0.72rem', lineHeight: 1.8, letterSpacing: '0.02em' }}>
              This document constitutes a binding Non-Disclosure Agreement ("NDA") between The Allocation and each 
              approved member. By accessing the Platform, you affirm that you have read, understood, and accepted the 
              obligations set forth herein.
            </p>
          </div>

          <div className="space-y-12">
            <Section title="1. Definition of Confidential Information">
              "Confidential Information" encompasses all non-public information disclosed through or in connection with 
              the Platform, including but not limited to: brand identities participating in allocation cycles; product 
              descriptions, imagery, reserve prices, and lot details; auction results, bid histories, and transaction 
              values; member identities, participation records, and membership rosters; proprietary algorithms governing 
              allocation distribution, pricing models, and curation methodologies; and any communications between The 
              Allocation and its members through any channel.
            </Section>

            <Section title="2. Obligations of the Member">
              Members shall: maintain all Confidential Information in strict confidence using no less than the same degree 
              of care used to protect their own confidential information, and in no event less than reasonable care; not 
              disclose, publish, or otherwise disseminate any Confidential Information to any third party without prior 
              written authorization from The Allocation; not use Confidential Information for any purpose other than 
              participation in the Platform; not photograph, screenshot, record, or otherwise capture any content displayed 
              on the Platform; and immediately notify The Allocation upon becoming aware of any unauthorized disclosure or 
              use of Confidential Information.
            </Section>

            <Section title="3. Brand Protection">
              The Allocation serves as a discreet distribution channel designed to preserve the brand equity and market 
              positioning of participating luxury houses. Members acknowledge that the mere disclosure of a brand's 
              participation on the Platform could cause irreparable harm to that brand's reputation and commercial interests. 
              Accordingly, members shall not, under any circumstances, publicly identify any brand as a participant on the 
              Platform, whether in conversation, on social media, in press, or through any other medium.
            </Section>

            <Section title="4. Pricing Confidentiality">
              All pricing information — including reserve prices, successful bid amounts, suggested retail comparisons, 
              and discount percentages — is strictly confidential. Members shall not disclose pricing information to any 
              party, including other members of the Platform. This obligation exists to protect the pricing integrity of 
              participating brands and the commercial viability of the allocation model.
            </Section>

            <Section title="5. Duration of Obligations">
              Confidentiality obligations under this Agreement survive for a period of five (5) years from the date of 
              disclosure, or for the duration of the member's access to the Platform plus three (3) years, whichever is 
              longer. Certain categories of information — including brand participation data and proprietary Platform 
              methodologies — shall remain confidential in perpetuity.
            </Section>

            <Section title="6. Permitted Disclosures">
              Confidential Information may be disclosed only: when compelled by law, regulation, or valid court order, 
              provided that the member gives The Allocation prompt written notice (to the extent legally permissible) 
              and cooperates in seeking protective orders or other appropriate remedies; and to professional advisors 
              (legal counsel, tax advisors) who are bound by their own professional confidentiality obligations, and 
              only to the extent strictly necessary.
            </Section>

            <Section title="7. Remedies for Breach">
              Members acknowledge that any breach of this Agreement may cause irreparable injury to The Allocation 
              and participating brands for which monetary damages would be an inadequate remedy. Accordingly, The 
              Allocation shall be entitled to seek equitable relief, including injunction and specific performance, 
              in addition to any other remedies available at law. A breach of this Agreement will result in immediate 
              and permanent revocation of membership, forfeiture of any pending allocations, and potential pursuit 
              of damages.
            </Section>

            <Section title="8. Return of Information">
              Upon termination of membership or upon request by The Allocation, members shall promptly destroy or 
              return all Confidential Information in their possession, including any copies, notes, summaries, or 
              materials derived from Confidential Information. Members shall confirm in writing that all such 
              materials have been destroyed or returned.
            </Section>

            <Section title="9. No License or Transfer">
              Nothing in this Agreement grants the member any intellectual property rights, license, or ownership 
              interest in any Confidential Information. All rights in and to the Confidential Information remain 
              the exclusive property of The Allocation or the respective brand partners.
            </Section>

            <Section title="10. Severability">
              If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in 
              full force and effect. The Allocation's failure to enforce any provision of this Agreement shall not 
              constitute a waiver of that provision.
            </Section>
          </div>

          {/* Acknowledgment Block */}
          <div className="mt-20 pt-10 border-t border-border/20">
            <div className="border border-border/30 bg-charcoal/30 px-6 py-8">
              <p className="text-warm-gray/40 font-sans mb-6" style={{ fontSize: '0.7rem', lineHeight: 1.8, letterSpacing: '0.02em' }}>
                By logging in to the Platform and accepting the NDA checkbox during authentication, you electronically 
                execute this Confidentiality Agreement with the same legal force and effect as a physical signature. 
                This acknowledgment is timestamped and recorded for compliance purposes.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold/40" />
                <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                  ELECTRONICALLY BINDING UPON PLATFORM ACCESS
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', lineHeight: 1.8, letterSpacing: '0.02em' }}>
              For questions regarding confidentiality obligations or to report a suspected breach, 
              contact compliance@theallocation.com.
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
          <Link to="/terms" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Terms
          </Link>
          <Link to="/privacy" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Privacy
          </Link>
          <Link to="/confidentiality" className="text-warm-white/50 font-sans hover:text-warm-white transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Confidentiality
          </Link>
        </div>
      </div>
    </footer>
  );
}

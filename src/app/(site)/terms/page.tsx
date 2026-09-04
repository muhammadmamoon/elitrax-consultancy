// cspell:words ELITRAX Elitrax Shahrah Faisal
import Link from "next/link";
import { Scale, FileCheck2, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Customer Agreement | ELITRAX Consultancy",
  description:
    "Master Terms of Service, compliance frameworks, and legal disclaimers governing visa consultancy and educational advisory services at Elitrax Consultancy.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060a14] text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gold-400">Master Terms of Service</span>
        </nav>

        {/* Document Header Box */}
        <div className="bg-[#0b1222] border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-widest">
              <Scale className="w-3.5 h-3.5" /> Legal Governance Framework
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              MASTER TERMS OF SERVICE &amp; CUSTOMER AGREEMENT
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
              This statutory agreement defines the operational limits, legal liabilities, cashless policies, and processing parameters between the Client and Elitrax Consultancy.
            </p>

            {/* Document Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-gray-800/80 text-xs text-gray-400">
              <div className="bg-navy-950/60 p-3 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Document Code</span>
                <span className="font-mono font-bold text-white">ELITRAX-MTS-PAK-2026</span>
              </div>
              <div className="bg-navy-950/60 p-3 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Effective Date</span>
                <span className="font-semibold text-white">May 27, 2026</span>
              </div>
              <div className="bg-navy-950/60 p-3 rounded-xl border border-gray-800 sm:col-span-2 md:col-span-1">
                <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Corporate Identifier</span>
                <span className="font-semibold text-gold-400 font-mono">[NTN / Reg. Pending]</span>
              </div>
              <div className="bg-navy-950/60 p-3 rounded-xl border border-gray-800 sm:col-span-2 md:col-span-3">
                <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Governing Jurisdiction &amp; Statutes</span>
                <span className="text-gray-300 font-medium">
                  Sindh, Pakistan (Contract Act, 1872; Specific Relief Act, 1877; Electronic Transactions Ordinance, 2002)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preamble */}
        <section className="bg-[#0b1222] border-l-4 border-gold-500 border-y border-r border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4" /> Preamble: Commercial Consent &amp; Execution
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Welcome to Elitrax Consultancy. By executing a physical service order form, signing this agreement, or remitting any partial or full professional fee payment to the Company via bank transfer, cash receipt, check, or electronic channel, you (the <strong className="text-white">&quot;Client&quot;</strong>) are entering into a legally binding commercial agreement with <strong className="text-white">Elitrax Consultancy</strong> (the <strong className="text-white">&quot;Company&quot;</strong>). This document defines our exact operational boundaries. If you do not agree with our strict no-refund policy, our limitation of liability, our document submission restrictions, or our corporate rules, please do not retain our consulting services.
          </p>
        </section>

        {/* Article 1 */}
        <section className="bg-[#0b1222] border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-gold-400 font-mono">01.</span> Strategic Identity &amp; Absolute Legal Disclaimers
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Elitrax Consultancy operates strictly as a private commercial visa facilitation and educational advisory firm. We operate a hybrid service framework supporting both individual consumers (B2C) and business entities (B2B) from our office in Pakistan.
          </p>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">No Institutional or Diplomatic Affiliation:</strong> The Company is entirely private. We are completely independent of any embassy, high commission, consulate, or sovereign border authority, including but not limited to IRCC Canada, UKVI, USCIS, and the Australian Department of Home Affairs.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">No Attorney-Client Privilege:</strong> Retaining Elitrax Consultancy establishes a commercial administrative contract for clerical documentation review, file formatting, and processing assistance. It does not establish an attorney-client relationship, a fiduciary legal duty, or formal legal defense.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">No Insider Influence or Backdoors:</strong> The Client explicitly acknowledges that Elitrax Consultancy possesses zero internal influence, special access, or back-channel connections to expedite or alter decisions made by foreign visa officers.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Decisions Rest Solely with the State:</strong> The ultimate authority to approve, delay, interview, or deny any visitor or study visa application rests exclusively with the sovereign government of the destination country. Elitrax Consultancy assumes zero liability for independent, sovereign decisions made by foreign immigration authorities.
              </div>
            </li>
          </ul>
        </section>

        {/* Article 2 */}
        <section className="bg-[#0b1222] border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-gold-400 font-mono">02.</span> Detailed Service Extraction &amp; Scope of Work
          </h2>
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Module A: Visitor &amp; Tourist Visa Facilitation
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              The Company&apos;s labor includes researching destination entry criteria, formatting application forms, compiling client-provided financial portfolios, drafting personalized cover letters, and scheduling embassy appointments based on public availability. Visitor visa approvals depend heavily on the Client&apos;s personal ties to Pakistan, verified financial history, asset ownership, and past travel tracks. Our administrative service is legally fulfilled the moment the complete file is compiled and formally submitted or handed over to the Client for submission.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Module B: Study Visa &amp; Educational Advisory Services
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              The Client acknowledges that student visa processing involves a dual-phase process. Phase One consists of Academic Institution Admission, and Phase Two consists of the Foreign Student Visa Application. The Company coordinates with international universities to secure letters of admission or conditional offers. However, the university retains total authority to accept or reject an applicant based on grades, capacity, or internal compliance. Foreign student visas require extensive proof of funds, such as bank statements, source of income details, or bank over-investment certificates. Elitrax Consultancy provides structural review of these files but takes no responsibility for financial document verifications conducted by third-party financial institutions or foreign embassies.
            </p>
          </div>
        </section>

        {/* Article 3 */}
        <section className="bg-[#0b1222] border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-red-400 font-mono">03.</span> Absolute Restrictions &amp; Compliance Enforcement
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            To safeguard the professional integrity of Elitrax Consultancy, the Client is strictly bound by the following operational prohibitions and restrictions. Any violation of these clauses constitutes an uncurable breach of contract and results in immediate termination without notice.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs">
            <div className="bg-navy-950/60 border border-gray-800 p-4 rounded-xl space-y-1.5">
              <strong className="text-red-400 block font-bold">Prohibition of Forged and Fabricated Documentation:</strong>
              <p className="text-gray-300 leading-relaxed">
                The Client is strictly barred from providing any document that has been altered, photoshopped, backdated, or fabricated. This includes fake bank account statements, forged bank maintenance letters, artificial employment certificates, counterfeit salary slips, and unverified academic transcripts or degrees. Elitrax Consultancy does not verify the raw truth of your documents; we format what you give us. The Client assumes absolute civil and criminal liability for the authenticity of every document handed over.
              </p>
            </div>

            <div className="bg-navy-950/60 border border-gray-800 p-4 rounded-xl space-y-1.5">
              <strong className="text-white block font-bold">Embassies and Misrepresentation Restrictions:</strong>
              <p className="text-gray-300 leading-relaxed">
                Foreign embassies aggressively penalize misrepresentation with multi-year or permanent travel bans. If an application is rejected or a permanent ban is issued due to a Client providing fraudulent documentation, the Client assumes 100% of the legal and financial fallout. Elitrax Consultancy is entirely released from any liability and will not assist in appealing bans caused by client fraud.
              </p>
            </div>

            <div className="bg-navy-950/60 border border-gray-800 p-4 rounded-xl space-y-1.5">
              <strong className="text-white block font-bold">Strict Document Delivery Deadlines (14 Days):</strong>
              <p className="text-gray-300 leading-relaxed">
                Visa processing systems operate on non-negotiable statutory timelines. The Client must provide all requested documents to our team within 14 days of signing this contract. If a client fails to provide documents on time, causing a missed biometric appointment deadline, medical examination window, or additional document request deadline issued by an embassy, Elitrax Consultancy will not be held responsible for the resulting rejection, file closure, or cancellation.
              </p>
            </div>

            <div className="bg-navy-950/60 border border-gray-800 p-4 rounded-xl space-y-1.5">
              <strong className="text-white block font-bold">Language and Standardized Testing Restrictions:</strong>
              <p className="text-gray-300 leading-relaxed">
                For student visa pathways, the Client is solely responsible for registering for, paying for, and passing required language proficiency tests, including IELTS, TOEFL, or PTE, within the timeframe specified by the target academic institution. The Company is not responsible if a university offer lapses due to the Client&apos;s failure to achieve the required test scores.
              </p>
            </div>

            <div className="bg-navy-950/60 border border-gray-800 p-4 rounded-xl space-y-1.5">
              <strong className="text-white block font-bold">Direct Communication Restrictions:</strong>
              <p className="text-gray-300 leading-relaxed">
                Since the Company&apos;s online digital portal is currently under construction and closed to the public, all official updates, instructions, and document submission records must occur exclusively via written email, official office WhatsApp business numbers, or signed physical receipts. Verbal conversations inside the office must be backed up by a written summary on these channels to be considered legally binding.
              </p>
            </div>
          </div>
        </section>

        {/* Article 4 */}
        <section className="bg-[#0b1222] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-amber-400 font-mono">04.</span> Cashless Protocols &amp; Absolute No-Refund Policy
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Our consultancy operates on a <strong className="text-gold-400">&quot;Fee-For-Labor&quot;</strong> model. Our professional time, market knowledge, and administrative hours cannot be un-worked or recovered once spent.
          </p>

          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Immediate Earned Fee Model:</strong> The consulting fee is considered fully earned by the Company the moment the initial profile assessment is completed, the visa strategy is finalized, and file processing begins.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">No Outcome-Based Refunds:</strong> A visa rejection, visa delay, or visa refusal by an embassy does not mean our administrative labor failed. Because we do not sell visa stamps—we sell professional documentation services—a negative decision by a visa officer does not entitle the Client to a refund under any circumstances.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Client-Initiated Abandonment:</strong> If a Client changes their mind, decides not to travel, fails to sit for their IELTS exam, encounters personal issues, or stops communicating via our direct office channels after paying their retainer, the file will be flagged as abandoned. All funds paid to date will be permanently forfeited to cover our spent operational capacity.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Third-Party and Government Fees:</strong> All external disbursements, including embassy visa application fees, biometric collection fees, health insurance premiums, international couriers, and university application costs, are completely non-refundable and entirely separate from Elitrax Consultancy&apos;s professional service charges.
              </div>
            </li>
          </ul>
        </section>

        {/* Article 5 */}
        <section className="bg-[#0b1222] border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-gold-400 font-mono">05.</span> Limitation of Liability &amp; The Financial Shield
          </h2>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Financial Liability Cap:</strong> To the absolute maximum extent permitted under the Contract Act of 1872, the total collective financial liability of Elitrax Consultancy, its owners, employees, or managers for any operational error, negligence, omission, or breach of contract shall be strictly capped at the exact amount of the professional consulting fee paid by the Client to the Company for that specific transaction.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Exclusion of Third-Party Expenses:</strong> The Company will never reimburse a Client for secondary, indirect, or cascading losses. This includes non-refundable airline tickets, hotel reservations, international currency exchange drops, or lost university tuition deposits due to visa delays or rejections.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Indemnification Clause:</strong> The Client agrees to fully protect, defend, and hold Elitrax Consultancy harmless from any third-party lawsuits, fines, or government investigations resulting directly from the Client&apos;s illegal actions, fraudulent documents, or subsequent visa overstays in a foreign country.
              </div>
            </li>
          </ul>
        </section>

        {/* Article 6 */}
        <section className="bg-[#0b1222] border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-gold-400 font-mono">06.</span> Mandatory Mediation &amp; Exclusive Jurisdiction
          </h2>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Internal 30-Day Resolution Window:</strong> In the event of an operational dispute or service complaint, the Client must formally notify the Company via a written statement delivered to our office or official email. Both parties agree to a mandatory thirty (30) day internal mediation freeze. The Client agrees not to initiate any public consumer complaints, social media defamation campaigns, or legal claims during this 30-day good-faith resolution window.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Governing Law &amp; Forum Selection:</strong> This agreement is governed exclusively by the laws of the Province of Sindh, Pakistan. Any unresolved legal claims or lawsuits must be filed and argued exclusively in the competent civil courts located in Karachi, Pakistan.
              </div>
            </li>
          </ul>
        </section>

        {/* Article 7 */}
        <section className="bg-[#0b1222] border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-3">
            <span className="text-gold-400 font-mono">07.</span> Severability &amp; Sign-Off Space
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            If any part of this agreement is found to be unenforceable, illegal, or invalid by a court of law, all remaining sections of this contract will continue to stay fully active, intact, and binding.
          </p>
        </section>

        {/* PHYSICAL & LEGAL SIGN-OFF EXECUTION CARD */}
        <div className="bg-[#080d19] border-2 border-gold-500/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Execution &amp; Client Confirmation Box
              </h3>
              <p className="text-[11px] text-gray-500">
                Physical or digital acknowledgement for visa docket submission.
              </p>
            </div>
            <span className="text-[11px] text-gold-400 font-mono font-semibold">
              Ref: ELITRAX-MTS-PAK-2026
            </span>
          </div>

          <p className="text-xs text-gray-400 italic">
            &quot;I, the undersigned Client, confirm that I have completely read, understood, and consented to all seven (7) articles of this Master Terms of Service, specifically acknowledging the Absolute No-Refund policy, document authenticity liabilities, and the exclusive jurisdiction of Karachi courts.&quot;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Client Column */}
            <div className="space-y-4 border border-gray-800/80 rounded-xl p-5 bg-navy-950/40">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block border-b border-gray-800 pb-2">
                Client / Authorized Signatory
              </span>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px]">Full Legal Name:</span>
                  <div className="h-7 border-b border-gray-700 w-full" />
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">CNIC / Passport Number:</span>
                  <div className="h-7 border-b border-gray-700 w-full" />
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Signature &amp; Date:</span>
                  <div className="h-10 border-b border-gray-700 w-full" />
                </div>
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-4 border border-gray-800/80 rounded-xl p-5 bg-navy-950/40">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block border-b border-gray-800 pb-2">
                For &amp; On Behalf of Elitrax Consultancy
              </span>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px]">Authorized Officer:</span>
                  <div className="h-7 border-b border-gray-700 w-full font-semibold text-white pt-1">
                    Managing Partner / Legal Advisor
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Branch Location:</span>
                  <div className="h-7 border-b border-gray-700 w-full text-gray-300 pt-1">
                    Shahrah-e-Faisal, Karachi, Pakistan
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Official Stamp &amp; Endorsement:</span>
                  <div className="h-10 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                    Corporate Seal Here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
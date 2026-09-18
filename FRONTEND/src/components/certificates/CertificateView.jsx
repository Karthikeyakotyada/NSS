import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { FileCheck, Search, ShieldCheck, Download, ExternalLink, Award, CheckCircle2, X, QrCode } from 'lucide-react';

export const CertificateView = () => {
  const { certificates, verifyCertificate, volunteer } = useNSS();
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifySearch = (e) => {
    e.preventDefault();
    const result = verifyCertificate(searchId);
    setVerificationResult({
      searched: true,
      found: !!result,
      data: result
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">Certificate Registry & Verifier</h1>
        <p className="page-sub">Access, view, and verify official National Service Scheme digital participation certificates.</p>
      </div>

      {/* Certificate Verifier Tool Box */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid var(--border-highlight)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} color="var(--nss-gold)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Public Certificate Verifier</h3>
          </div>
          <span className="badge badge-gold">MOCK HASH REGISTRY</span>
        </div>

        <form onSubmit={handleVerifySearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} color="var(--text-sub)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Enter Certificate ID (e.g. CERT-NSS-2026-00421)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            VERIFY CERTIFICATE ID
          </button>
        </form>

        {/* Verification Result Banner */}
        {verificationResult && verificationResult.searched && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
            {verificationResult.found ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--nss-emerald)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 800, fontSize: '1rem' }}>
                  <CheckCircle2 size={20} /> ✓ Certificate Verified Authentic
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <div><span style={{ color: 'var(--text-sub)' }}>Recipient:</span> <strong style={{ color: '#fff' }}>{verificationResult.data.recipient}</strong></div>
                  <div><span style={{ color: 'var(--text-sub)' }}>Event:</span> <strong style={{ color: '#fff' }}>{verificationResult.data.eventTitle}</strong></div>
                  <div><span style={{ color: 'var(--text-sub)' }}>Hours Credited:</span> <strong style={{ color: '#fbbf24' }}>{verificationResult.data.hours} Hours</strong></div>
                  <div><span style={{ color: 'var(--text-sub)' }}>Issue Date:</span> <strong style={{ color: '#fff' }}>{verificationResult.data.issueDate}</strong></div>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--nss-crimson)', borderRadius: 'var(--radius-md)', padding: '1rem', color: '#f87171' }}>
                ✖ Certificate ID not found in NSS verification database. Please verify the code and try again.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Certificates Gallery */}
      <div className="section-title">
        <Award size={20} color="#60a5fa" />
        <span>My Issued Certificates ({certificates.length})</span>
      </div>

      <div className="grid-cards">
        {certificates.map((cert) => (
          <div key={cert.id} className="nss-card nss-card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-emerald">{cert.category}</span>
                <span className="badge badge-gold">STATUS: VERIFIED</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '0.75rem' }}>
                Event: {cert.eventTitle}
              </p>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', justifyContent: 'space-between' }}>
                <span>ID: <strong style={{ color: '#60a5fa' }}>{cert.id}</strong></span>
                <span>{cert.hours} Hours Credit</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => setSelectedCert(cert)}>
                <ExternalLink size={14} /> VIEW CERTIFICATE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Official Render Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div
            className="modal-content"
            style={{
              maxWidth: '720px',
              background: '#0f172a',
              border: '4px double var(--nss-gold)',
              padding: '2.5rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>

            {/* Certificate Layout */}
            <div style={{ border: '2px solid rgba(245, 158, 11, 0.4)', padding: '2rem', textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#1e3a8a', border: '2px solid var(--nss-gold)', color: '#fff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                NSS
              </div>

              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--nss-gold)', fontWeight: 800 }}>
                NATIONAL SERVICE SCHEME • MINISTRY OF YOUTH AFFAIRS
              </h4>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 1.25rem 0', fontFamily: 'serif' }}>
                Certificate of Service & Appreciation
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>This is to certify that</p>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60a5fa', margin: '0.3rem 0' }}>
                {selectedCert.recipient}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>NSS Volunteer ID: {selectedCert.nssId}</p>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', margin: '1.25rem auto', maxWidth: '540px', lineHeight: '1.6' }}>
                has successfully completed <strong>{selectedCert.hours} hours</strong> of dedicated voluntary service in the official NSS event:
              </p>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>
                "{selectedCert.eventTitle}"
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-glass)' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issued Date</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{selectedCert.issueDate}</div>
                  <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, marginTop: '0.2rem' }}>VERIFIED REGISTRY</div>
                </div>

                <div>
                  <QrCode size={48} color="var(--text-sub)" />
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{selectedCert.id}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ borderBottom: '1px solid var(--text-sub)', width: '140px', marginBottom: '0.25rem', paddingBottom: '0.25rem', fontFamily: 'cursive', color: '#fbbf24', fontSize: '1.1rem' }}>
                    R.V. Sharma
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>NSS Program Officer</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button className="btn btn-outline" onClick={() => setSelectedCert(null)}>
                Close
              </button>
              <button className="btn btn-gold" onClick={() => alert(`Mock Download: ${selectedCert.id}.pdf exported!`)}>
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Erro capturado:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '2rem',
            fontFamily: "'Montserrat', sans-serif",
            background: '#FAFAF8',
            textAlign: 'center',
          }}
        >
          {/* Logo ornament */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(141,170,145,0.12)',
              border: '1.5px solid rgba(141,170,145,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            ✦
          </div>

          <div style={{ maxWidth: '420px' }}>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#8DAA91',
                marginBottom: '1rem',
              }}
            >
              Savid Maricá
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: '2rem',
                color: '#1a1a1a',
                marginBottom: '0.75rem',
                lineHeight: 1.2,
              }}
            >
              Algo deu errado
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#777',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Encontramos um problema inesperado. Tente recarregar a página ou
              entre em contato pelo WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  background: '#8DAA91',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Recarregar página
              </button>
              <a
                href="https://wa.me/5521972668520"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  background: 'transparent',
                  color: '#1a1a1a',
                  border: '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

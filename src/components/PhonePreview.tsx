import React, { useState } from 'react';
import { AppConfig, ButtonItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { Check, CheckCircle2, Copy, ExternalLink, MapPin, Share2, Sparkles } from 'lucide-react';

interface PhonePreviewProps {
  config: AppConfig;
  isStandalone?: boolean;
  onShareClick?: () => void;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  config,
  isStandalone = false,
  onShareClick,
}) => {
  const { profile, buttons, style, buttonStyle } = config;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleButtonClick = (btn: ButtonItem, e: React.MouseEvent) => {
    e.preventDefault();

    if (btn.actionType === 'copy') {
      navigator.clipboard.writeText(btn.url).catch(() => {});
      setCopiedId(btn.id);
      showToast(`Copiado: "${btn.url}"`);
      setTimeout(() => setCopiedId(null), 2500);
      return;
    }

    if (btn.actionType === 'whatsapp') {
      showToast(`Abrindo WhatsApp: ${btn.label}`);
      window.open(btn.url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Normal link
    showToast(`Redirecionando: ${btn.label}`);
    window.open(btn.url, '_blank', 'noopener,noreferrer');
  };

  // Font styling class
  const getFontFamilyClass = () => {
    if (style.fontFamily === 'serif') return 'font-serif';
    if (style.fontFamily === 'display') return 'font-mono tracking-tight';
    return 'font-sans';
  };

  // Button radius styling
  const getButtonRadiusClass = () => {
    switch (buttonStyle.shape) {
      case 'pill':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-2xl';
      case 'soft':
        return 'rounded-xl';
      case 'sharp':
        return 'rounded-md';
      default:
        return 'rounded-2xl';
    }
  };

  // Button animation class
  const getButtonAnimationClass = () => {
    switch (buttonStyle.animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'bounce':
        return 'hover:-translate-y-1 transition-transform';
      case 'shimmer':
        return 'relative overflow-hidden group';
      default:
        return 'transition-all duration-200 active:scale-[0.98] hover:opacity-95';
    }
  };

  // Button size class
  const getButtonSizePadding = () => {
    switch (buttonStyle.size) {
      case 'compact':
        return 'py-2.5 px-3 min-h-[48px]';
      case 'spacious':
        return 'py-4 px-5 min-h-[64px]';
      case 'normal':
      default:
        return 'py-3.5 px-4 min-h-[56px]';
    }
  };

  // Button shadow styling
  const getButtonShadowStyle = (color: string) => {
    switch (buttonStyle.shadow) {
      case 'sm':
        return '0 2px 4px rgba(0,0,0,0.15)';
      case 'md':
        return '0 4px 12px rgba(0,0,0,0.25)';
      case 'lg':
        return '0 8px 24px rgba(0,0,0,0.35)';
      case 'glow':
        return `0 0 16px ${color}88, 0 4px 12px rgba(0,0,0,0.3)`;
      case 'none':
      default:
        return 'none';
    }
  };

  // Background styling computation
  const getBackgroundStyle = (): React.CSSProperties => {
    if (style.bgType === 'color') {
      return { backgroundColor: style.bgColor };
    }
    if (style.bgType === 'gradient') {
      const dir =
        style.bgGradientDirection === 'to-br'
          ? 'to bottom right'
          : style.bgGradientDirection === 'to-r'
          ? 'to right'
          : 'to bottom';
      return {
        backgroundImage: `linear-gradient(${dir}, ${style.bgGradientFrom}, ${style.bgGradientTo})`,
      };
    }
    if (style.bgType === 'mesh') {
      return {
        backgroundColor: style.bgColor,
        backgroundImage: `radial-gradient(at 0% 0%, ${style.bgGradientFrom} 0px, transparent 50%), radial-gradient(at 100% 100%, ${style.bgGradientTo} 0px, transparent 50%)`,
      };
    }
    // Pattern or solid fallback
    return {
      backgroundColor: style.bgColor,
      backgroundImage: `linear-gradient(to bottom, ${style.bgGradientFrom}, ${style.bgGradientTo})`,
    };
  };

  const activeButtons = buttons.filter((b) => b.enabled);

  return (
    <div
      className={`relative w-full overflow-hidden text-slate-100 ${getFontFamilyClass()} ${
        isStandalone ? 'min-h-screen py-6 px-4' : 'h-full py-8 px-4 flex flex-col justify-between'
      }`}
      style={getBackgroundStyle()}
    >
      {/* Pattern overlay if enabled */}
      {style.bgPattern === 'dots' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      )}
      {style.bgPattern === 'grid' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {style.bgPattern === 'lines' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 0, transparent 12px)',
          }}
        />
      )}

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-md flex flex-col items-center">
        {/* Top actions (Share button) */}
        <div className="w-full flex justify-end mb-2">
          {onShareClick && (
            <button
              onClick={onShareClick}
              type="button"
              className="p-2 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md text-white/90 transition-all border border-white/10 active:scale-95"
              title="Compartilhar página"
              aria-label="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Profile Header */}
        <header className="flex flex-col items-center text-center mb-6 w-full">
          {/* Logo */}
          <div className="relative mb-3.5 group">
            <div
              className={`overflow-hidden w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-black/40 shadow-xl transition-transform ${
                profile.logoShape === 'circle'
                  ? 'rounded-full'
                  : profile.logoShape === 'rounded'
                  ? 'rounded-2xl'
                  : 'rounded-md'
              }`}
              style={{
                border: profile.hasLogoBorder
                  ? `3px solid ${profile.logoBorderColor}`
                  : '1px solid rgba(255,255,255,0.15)',
                boxShadow: profile.hasLogoBorder ? `0 0 20px ${profile.logoBorderColor}40` : undefined,
              }}
            >
              {profile.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon container if URL fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-amber-400">
                  <Sparkles className="w-8 h-8 mb-1" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Logo</span>
                </div>
              )}
            </div>

            {profile.isVerified && (
              <span
                className="absolute bottom-0 right-0 p-1 bg-sky-500 text-white rounded-full shadow-md"
                title="Estabelecimento Verificado"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Name */}
          <div className="flex items-center gap-1.5 justify-center px-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {profile.name || 'Nome do Estabelecimento'}
            </h1>
          </div>

          {/* Status Badge */}
          {profile.statusBadge && (
            <div className="mt-1.5 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile.statusBadge}</span>
            </div>
          )}

          {/* Tagline */}
          {profile.tagline && (
            <p className="mt-2 text-xs sm:text-sm text-slate-300/90 max-w-xs leading-relaxed">
              {profile.tagline}
            </p>
          )}

          {/* Address pill if available */}
          {profile.address && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400/90">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate max-w-[260px]">{profile.address}</span>
            </div>
          )}
        </header>

        {/* Buttons List (Up to 5 buttons or active list) */}
        <div className="w-full space-y-3">
          {activeButtons.length === 0 ? (
            <div className="p-6 text-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-sm">
              Nenhum botão ativado. Ative botões no menu para exibir aos clientes.
            </div>
          ) : (
            activeButtons.map((btn) => {
              const bg = btn.customBgColor || buttonStyle.bgColor;
              const text = btn.customTextColor || buttonStyle.textColor;
              const border = btn.customBorderColor || buttonStyle.borderColor;
              const isCopied = copiedId === btn.id;

              // Variant styles
              let btnStyleRules: React.CSSProperties = {
                boxShadow: getButtonShadowStyle(bg),
              };

              if (buttonStyle.variant === 'solid') {
                btnStyleRules = {
                  ...btnStyleRules,
                  backgroundColor: bg,
                  color: text,
                  border: `${buttonStyle.borderWidth}px solid ${border}`,
                };
              } else if (buttonStyle.variant === 'outline') {
                btnStyleRules = {
                  ...btnStyleRules,
                  backgroundColor: 'transparent',
                  color: text,
                  border: `${buttonStyle.borderWidth}px solid ${border}`,
                };
              } else if (buttonStyle.variant === 'glass') {
                btnStyleRules = {
                  ...btnStyleRules,
                  backgroundColor: bg.startsWith('#') ? `${bg}40` : bg,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: text,
                  border: `${buttonStyle.borderWidth}px solid ${border}`,
                };
              } else if (buttonStyle.variant === 'glow') {
                btnStyleRules = {
                  ...btnStyleRules,
                  backgroundColor: bg,
                  color: text,
                  border: `${buttonStyle.borderWidth}px solid ${border}`,
                  boxShadow: `0 0 20px ${bg}88, 0 4px 12px rgba(0,0,0,0.4)`,
                };
              } else if (buttonStyle.variant === 'gradient') {
                btnStyleRules = {
                  ...btnStyleRules,
                  backgroundImage: `linear-gradient(135deg, ${bg}, ${border})`,
                  color: text,
                  border: `${buttonStyle.borderWidth}px solid rgba(255,255,255,0.2)`,
                };
              }

              return (
                <div key={btn.id} className="relative group">
                  {/* Highlight Tag */}
                  {btn.highlightTag && (
                    <span
                      className="absolute -top-2 right-4 z-20 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md bg-amber-400 text-slate-950 border border-amber-300"
                    >
                      {btn.highlightTag}
                    </span>
                  )}

                  <button
                    onClick={(e) => handleButtonClick(btn, e)}
                    className={`w-full flex items-center justify-between text-left transition-all ${getButtonRadiusClass()} ${getButtonSizePadding()} ${getButtonAnimationClass()}`}
                    style={btnStyleRules}
                  >
                    {/* Shimmer sweep effect if enabled */}
                    {buttonStyle.animation === 'shimmer' && (
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    )}

                    {/* Left Icon + Text */}
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-black/20 text-current"
                        style={{ color: text }}
                      >
                        {isCopied ? (
                          <Check className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                        ) : (
                          <DynamicIcon name={btn.icon} className="w-5 h-5 shrink-0" />
                        )}
                      </div>

                      <div className="min-w-0 flex flex-col">
                        <span className="font-semibold text-sm sm:text-base leading-snug truncate">
                          {isCopied ? 'Copiado para área de transferência!' : btn.label}
                        </span>
                        {btn.subtitle && !isCopied && (
                          <span
                            className="text-xs opacity-80 leading-normal truncate font-normal"
                            style={{ color: text }}
                          >
                            {btn.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Action Affordance */}
                    <div className="shrink-0 pl-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {btn.actionType === 'copy' ? (
                        <Copy className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-slate-400/80 w-full space-y-1.5 pb-2">
          {profile.instagram && (
            <div className="text-[11px] text-slate-300">
              Instagram: <span className="font-medium text-white">{profile.instagram}</span>
            </div>
          )}
          {profile.phone && (
            <div className="text-[11px] text-slate-300">
              Tel: <span className="font-medium text-white">{profile.phone}</span>
            </div>
          )}
          <div className="pt-2 text-[10px] text-slate-500 tracking-wide">
            © {new Date().getFullYear()} {profile.name || 'Estabelecimento'} · Página Oficial
          </div>
        </footer>
      </div>

      {/* Tactile Feedback Toast */}
      {toastMessage && (
        <div className="absolute bottom-4 left-4 right-4 z-50 flex items-center justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-4 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-medium shadow-2xl border border-white/20 backdrop-blur-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

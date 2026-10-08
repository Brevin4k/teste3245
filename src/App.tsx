import React, { useState, useEffect } from 'react';
import { AppConfig, ButtonItem, ButtonStyleConfig, StyleConfig, ThemePreset } from './types';
import { THEME_PRESETS } from './data/presets';
import { PhonePreview } from './components/PhonePreview';
import { ButtonsEditor } from './components/ButtonsEditor';
import { AppearanceEditor } from './components/AppearanceEditor';
import { EstablishmentEditor } from './components/EstablishmentEditor';
import { ShareAndQrCode } from './components/ShareAndQrCode';
import {
  Sliders,
  Store,
  QrCode,
  Eye,
  EyeOff,
  RotateCcw,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Edit3,
} from 'lucide-react';

const STORAGE_KEY = 'biolink_establishment_config_v1';

export default function App() {
  // Load initial config from localStorage or preset
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile && parsed.buttons) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading config from localStorage', e);
    }
    return THEME_PRESETS[0].config;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'buttons' | 'appearance' | 'profile' | 'share'>('buttons');

  // Preview Mode: 'editor' (with phone mockup) or 'client' (full screen public view)
  const [isClientView, setIsClientView] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving config', e);
    }
  }, [config]);

  // Handlers
  const handleButtonsChange = (buttons: ButtonItem[]) => {
    setConfig((prev) => ({ ...prev, buttons }));
  };

  const handleStyleChange = (style: StyleConfig) => {
    setConfig((prev) => ({ ...prev, style }));
  };

  const handleButtonStyleChange = (buttonStyle: ButtonStyleConfig) => {
    setConfig((prev) => ({ ...prev, buttonStyle }));
  };

  const handleProfileChange = (profile: any) => {
    setConfig((prev) => ({ ...prev, profile }));
  };

  const handleApplyPreset = (preset: ThemePreset) => {
    setConfig(preset.config);
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar para o modelo padrão (Aurora Café & Bistrô)?')) {
      setConfig(THEME_PRESETS[0].config);
    }
  };

  // Fullscreen Customer View Mode
  if (isClientView) {
    return (
      <div className="min-h-screen w-full relative">
        {/* Floating exit button for editor */}
        <div className="fixed top-3 right-3 z-50">
          <button
            type="button"
            onClick={() => setIsClientView(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-400 hover:text-amber-300 text-xs font-semibold shadow-2xl border border-white/20 backdrop-blur-md active:scale-95 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Voltar ao Editor</span>
          </button>
        </div>

        <PhonePreview
          config={config}
          isStandalone={true}
          onShareClick={() => {
            if (navigator.share) {
              navigator.share({
                title: config.profile.name,
                text: `Conheça ${config.profile.name}`,
                url: window.location.href,
              }).catch(() => {});
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Zone 1: Wordmark brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md shadow-amber-500/20">
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>BioLink</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Mobile
              </span>
            </h1>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Segmented control (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('buttons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'buttons'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Botões ({config.buttons.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'appearance'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fundo & Botões
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Logo & Estabelecimento
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('share')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'share'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            QR Code & Compartilhar
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Restaurar padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>

          <button
            type="button"
            onClick={() => setIsClientView(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Ver Modo Cliente</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 pb-24 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick status banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">
                  Estabelecimento:{' '}
                  <strong className="text-white font-semibold">{config.profile.name}</strong>
                </span>
              </div>
              <span className="text-slate-400">
                {config.buttons.filter((b) => b.enabled).length} de 5 botões ativos
              </span>
            </div>

            {/* Active Tab Content */}
            <div className="transition-all">
              {activeTab === 'buttons' && (
                <ButtonsEditor buttons={config.buttons} onChange={handleButtonsChange} />
              )}

              {activeTab === 'appearance' && (
                <AppearanceEditor
                  style={config.style}
                  buttonStyle={config.buttonStyle}
                  onStyleChange={handleStyleChange}
                  onButtonStyleChange={handleButtonStyleChange}
                  onApplyPreset={handleApplyPreset}
                />
              )}

              {activeTab === 'profile' && (
                <EstablishmentEditor
                  profile={config.profile}
                  onChange={handleProfileChange}
                />
              )}

              {activeTab === 'share' && (
                <ShareAndQrCode config={config} onImportConfig={setConfig} />
              )}
            </div>
          </div>

          {/* Right Column: Sticky Live Smartphone Simulator (5 cols on lg) */}
          <div className="lg:col-span-5 hidden lg:block sticky top-20">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  Simulador Mobile ao Vivo
                </span>
                <span className="text-[11px] text-slate-500">Toque nos botões para testar</span>
              </div>

              {/* Realistic Phone Bezel Container */}
              <div className="w-[340px] h-[690px] rounded-[48px] bg-slate-900 border-[8px] border-slate-800 shadow-2xl shadow-black relative overflow-hidden flex flex-col ring-1 ring-white/10">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Status Bar simulation */}
                <div className="h-6 w-full px-7 flex items-center justify-between text-[10px] text-white/70 font-semibold z-20 shrink-0 select-none pt-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <div className="w-4 h-2 border border-white/70 rounded-xs flex items-center p-0.5">
                      <div className="w-full h-full bg-white/90 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Inner Screen Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                  <PhonePreview
                    config={config}
                    isStandalone={false}
                    onShareClick={() => setActiveTab('share')}
                  />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="h-4 w-full flex items-center justify-center shrink-0 bg-transparent z-20 pointer-events-none">
                  <div className="w-28 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Tab Bar (thumb navigation) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-4 items-center h-16 px-2 safe-bottom">
        <button
          type="button"
          onClick={() => setActiveTab('buttons')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'buttons' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Smartphone className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 text-[9px] px-1 rounded-full bg-amber-500 text-slate-950 font-bold">
              {config.buttons.length}
            </span>
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Botões</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appearance')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'appearance' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Fundo/Estilo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Logo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('share')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'share' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">QR Code</span>
        </button>
      </nav>

      {/* Floating Preview Button on Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsClientView(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl active:scale-95 transition-all border border-amber-300"
        >
          <Eye className="w-4 h-4 stroke-[2.5]" />
          <span>Ver Página</span>
        </button>
      </div>
    </div>
  );
}

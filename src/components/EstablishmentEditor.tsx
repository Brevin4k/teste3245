import React, { useRef } from 'react';
import { EstablishmentProfile } from '../types';
import { Store, Upload, Check, Sparkles, MapPin, Phone, Instagram, ShieldCheck } from 'lucide-react';

interface EstablishmentEditorProps {
  profile: EstablishmentProfile;
  onChange: (profile: EstablishmentProfile) => void;
}

const PRESET_LOGOS = [
  {
    name: 'Café & Bistrô',
    url: '/src/assets/images/logo_cafe_bistro_1791477402375.jpg',
  },
  {
    name: 'Burger & Brasa',
    url: '/src/assets/images/logo_burger_artesanal_1791477410076.jpg',
  },
  {
    name: 'Barbearia VIP',
    url: '/src/assets/images/logo_barbearia_vip_1791477417937.jpg',
  },
  {
    name: 'Estética & Spa',
    url: '/src/assets/images/logo_salao_estetica_1791477426460.jpg',
  },
];

export const EstablishmentEditor: React.FC<EstablishmentEditorProps> = ({ profile, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange({ ...profile, logoUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* 1. Logo Section */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Logo do Estabelecimento
            </h3>
          </div>
          <span className="text-xs text-slate-400">Personalize seu avatar</span>
        </div>

        {/* Current Logo Preview & Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div
            className={`w-20 h-20 overflow-hidden flex items-center justify-center bg-black/40 shadow-lg shrink-0 ${
              profile.logoShape === 'circle'
                ? 'rounded-full'
                : profile.logoShape === 'rounded'
                ? 'rounded-2xl'
                : 'rounded-md'
            }`}
            style={{
              border: profile.hasLogoBorder
                ? `2px solid ${profile.logoBorderColor}`
                : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {profile.logoUrl ? (
              <img
                src={profile.logoUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <Sparkles className="w-6 h-6 text-amber-400" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="text-xs text-slate-300 font-medium">
              Envie a foto ou logotipo oficial da sua empresa
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                Fazer Upload do Seu Logo
              </button>

              <button
                type="button"
                onClick={() => onChange({ ...profile, logoUrl: '' })}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
              >
                Remover Logo
              </button>
            </div>
          </div>
        </div>

        {/* Preset Logos Choices */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-medium text-slate-400">Ou use um logo modelo pronto:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_LOGOS.map((item) => {
              const isSelected = profile.logoUrl === item.url;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onChange({ ...profile, logoUrl: item.url })}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <span className="text-xs font-medium truncate">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo Shape & Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Formato do Logo
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'circle', label: 'Círculo' },
                { id: 'rounded', label: 'Arredondado' },
                { id: 'square', label: 'Quadrado' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange({ ...profile, logoShape: s.id as any })}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border ${
                    profile.logoShape === s.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Borda & Destaque
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasLogoBorder}
                  onChange={(e) => onChange({ ...profile, hasLogoBorder: e.target.checked })}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
                />
                <span className="text-xs text-slate-300">Borda colorida</span>
              </label>

              {profile.hasLogoBorder && (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={profile.logoBorderColor}
                    onChange={(e) => onChange({ ...profile, logoBorderColor: e.target.value })}
                    className="w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                  />
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    {profile.logoBorderColor}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Business Details */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Informações do Estabelecimento
        </h3>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nome do Estabelecimento *
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
              placeholder="Ex: Aurora Café & Bistrô"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Tagline / Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Slogan / Descrição Curta
            </label>
            <textarea
              rows={2}
              value={profile.tagline}
              onChange={(e) => onChange({ ...profile, tagline: e.target.value })}
              placeholder="Ex: Cafés especiais, brunch e sobremesas artesanais."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Status Badge & Verified */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Aviso de Status / Horário
              </label>
              <input
                type="text"
                value={profile.statusBadge}
                onChange={(e) => onChange({ ...profile, statusBadge: e.target.value })}
                placeholder="Ex: Aberto agora até 22h"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2.5 p-2 bg-slate-950/80 rounded-xl border border-slate-800 cursor-pointer h-[38px]">
                <input
                  type="checkbox"
                  checked={profile.isVerified}
                  onChange={(e) => onChange({ ...profile, isVerified: e.target.checked })}
                  className="rounded border-slate-700 text-sky-500 focus:ring-0 w-4 h-4"
                />
                <span className="text-xs text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Selo de Verificado Oficial
                </span>
              </label>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Endereço Físico (opcional)
            </label>
            <input
              type="text"
              value={profile.address || ''}
              onChange={(e) => onChange({ ...profile, address: e.target.value })}
              placeholder="Ex: Rua das Flores, 142 - Centro"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Social / Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-slate-400" />
                Usuário do Instagram
              </label>
              <input
                type="text"
                value={profile.instagram || ''}
                onChange={(e) => onChange({ ...profile, instagram: e.target.value })}
                placeholder="@seuestabelecimento"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => onChange({ ...profile, phone: e.target.value })}
                placeholder="(11) 98765-4321"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

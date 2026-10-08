import React from 'react';
import { ButtonStyleConfig, StyleConfig, ThemePreset } from '../types';
import { COLOR_SWATCHES, THEME_PRESETS } from '../data/presets';
import { Sparkles, Palette, Sliders, Check } from 'lucide-react';

interface AppearanceEditorProps {
  style: StyleConfig;
  buttonStyle: ButtonStyleConfig;
  onStyleChange: (style: StyleConfig) => void;
  onButtonStyleChange: (buttonStyle: ButtonStyleConfig) => void;
  onApplyPreset: (preset: ThemePreset) => void;
}

export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({
  style,
  buttonStyle,
  onStyleChange,
  onButtonStyleChange,
  onApplyPreset,
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Presets Catalog */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Temas Prontos em 1 Toque
            </h3>
          </div>
          <span className="text-xs text-slate-400">Escolha um estilo base</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {THEME_PRESETS.map((preset) => {
            const isCurrent = style.themePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isCurrent
                    ? 'border-amber-500 bg-slate-900 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: preset.previewColor }}
                  />
                  {isCurrent && (
                    <span className="p-0.5 rounded-full bg-amber-500 text-slate-950">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white truncate">{preset.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{preset.category}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Background Customization */}
      <section className="space-y-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Personalizar Fundo da Página
          </h3>
        </div>

        {/* Background Type */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Tipo de Fundo</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onStyleChange({ ...style, bgType: 'gradient' })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                style.bgType === 'gradient'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Gradiente
            </button>
            <button
              type="button"
              onClick={() => onStyleChange({ ...style, bgType: 'color' })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                style.bgType === 'color'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Cor Sólida
            </button>
            <button
              type="button"
              onClick={() => onStyleChange({ ...style, bgType: 'mesh' })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                style.bgType === 'mesh'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mesh Suave
            </button>
          </div>
        </div>

        {/* Color controls depending on type */}
        {style.bgType === 'color' ? (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">Cor de Fundo</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={style.bgColor}
                onChange={(e) => onStyleChange({ ...style, bgColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent cursor-pointer border border-slate-700"
              />
              <span className="text-xs font-mono text-slate-300 uppercase">{style.bgColor}</span>
            </div>
            {/* Quick swatches */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {COLOR_SWATCHES.slice(0, 12).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onStyleChange({ ...style, bgColor: c })}
                  className="w-6 h-6 rounded-lg border border-white/10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cor Inicial (Topo)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.bgGradientFrom}
                    onChange={(e) => onStyleChange({ ...style, bgGradientFrom: e.target.value })}
                    className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-700"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    {style.bgGradientFrom}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cor Final (Base)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.bgGradientTo}
                    onChange={(e) => onStyleChange({ ...style, bgGradientTo: e.target.value })}
                    className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-700"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    {style.bgGradientTo}
                  </span>
                </div>
              </div>
            </div>

            {/* Gradient direction */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Direção</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'to-b', label: 'Vertical (↓)' },
                  { id: 'to-br', label: 'Diagonal (↘)' },
                  { id: 'to-r', label: 'Horizontal (→)' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onStyleChange({ ...style, bgGradientDirection: d.id })}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium border ${
                      style.bgGradientDirection === d.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subtle Background Pattern */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-medium text-slate-300">Textura / Padrão</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'none', label: 'Liso' },
              { id: 'dots', label: 'Pontos' },
              { id: 'grid', label: 'Grade' },
              { id: 'lines', label: 'Linhas' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onStyleChange({ ...style, bgPattern: p.id as any })}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border ${
                  style.bgPattern === p.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-medium text-slate-300">Estilo Tipográfico</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sans', label: 'Moderno Sans', font: 'font-sans' },
              { id: 'serif', label: 'Clássico Serif', font: 'font-serif' },
              { id: 'display', label: 'Urbano Display', font: 'font-mono' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onStyleChange({ ...style, fontFamily: f.id as any })}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border ${f.font} ${
                  style.fontFamily === f.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Button Styling Customization */}
      <section className="space-y-5 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Personalizar Botões
          </h3>
        </div>

        {/* Button Shape */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Formato / Bordas</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'pill', label: 'Pílula (Redondo)', class: 'rounded-full' },
              { id: 'rounded', label: 'Suave (Médio)', class: 'rounded-2xl' },
              { id: 'soft', label: 'Moderno (Sutil)', class: 'rounded-xl' },
              { id: 'sharp', label: 'Clássico Reto', class: 'rounded-md' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onButtonStyleChange({ ...buttonStyle, shape: s.id as any })}
                className={`py-2 px-2.5 border text-xs font-semibold ${s.class} transition-all ${
                  buttonStyle.shape === s.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button Variant */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Estilo Visual do Botão</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'solid', label: 'Sólido Preenchido' },
              { id: 'outline', label: 'Contorno Outline' },
              { id: 'glass', label: 'Vidro Glass' },
              { id: 'glow', label: 'Glow Neon' },
              { id: 'gradient', label: 'Gradiente' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => onButtonStyleChange({ ...buttonStyle, variant: v.id as any })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  buttonStyle.variant === v.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button Colors: Bg, Text, Border */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="block text-xs font-medium text-slate-300">Cores Globais dos Botões</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">Cor de Fundo</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={buttonStyle.bgColor.startsWith('#') ? buttonStyle.bgColor : '#78350f'}
                  onChange={(e) => onButtonStyleChange({ ...buttonStyle, bgColor: e.target.value })}
                  className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-700"
                />
                <span className="text-xs font-mono text-slate-300 uppercase">
                  {buttonStyle.bgColor}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] text-slate-400 mb-1">Cor do Texto e Ícone</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={buttonStyle.textColor.startsWith('#') ? buttonStyle.textColor : '#ffffff'}
                  onChange={(e) =>
                    onButtonStyleChange({ ...buttonStyle, textColor: e.target.value })
                  }
                  className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-700"
                />
                <span className="text-xs font-mono text-slate-300 uppercase">
                  {buttonStyle.textColor}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] text-slate-400 mb-1">Cor da Borda</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    buttonStyle.borderColor.startsWith('#') ? buttonStyle.borderColor : '#b45309'
                  }
                  onChange={(e) =>
                    onButtonStyleChange({ ...buttonStyle, borderColor: e.target.value })
                  }
                  className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-700"
                />
                <span className="text-xs font-mono text-slate-300 uppercase">
                  {buttonStyle.borderColor}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Color Swatches Palette */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-1.5">Amostras Rápidas de Cor:</span>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_SWATCHES.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onButtonStyleChange({ ...buttonStyle, bgColor: color })}
                  className="w-6 h-6 rounded-lg border border-white/10 hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: color }}
                  title={`Aplicar cor: ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animation & Attention Grabber */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-medium text-slate-300">
            Efeito & Animação dos Botões
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'shimmer', label: 'Brilho Reflexo (Shimmer)' },
              { id: 'pulse', label: 'Pulso Suave' },
              { id: 'bounce', label: 'Flutuante' },
              { id: 'none', label: 'Estático' },
            ].map((anim) => (
              <button
                key={anim.id}
                type="button"
                onClick={() =>
                  onButtonStyleChange({ ...buttonStyle, animation: anim.id as any })
                }
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  buttonStyle.animation === anim.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {anim.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shadow & Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Profundidade da Sombra
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'none', label: 'Nenhuma' },
                { id: 'sm', label: 'Suave' },
                { id: 'md', label: 'Média' },
                { id: 'glow', label: 'Glow' },
              ].map((sh) => (
                <button
                  key={sh.id}
                  type="button"
                  onClick={() => onButtonStyleChange({ ...buttonStyle, shadow: sh.id as any })}
                  className={`py-1.5 px-2 rounded-xl border text-xs font-medium ${
                    buttonStyle.shadow === sh.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sh.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Altura do Botão
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'compact', label: 'Compacto' },
                { id: 'normal', label: 'Padrão' },
                { id: 'spacious', label: 'Espaçoso' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => onButtonStyleChange({ ...buttonStyle, size: sz.id as any })}
                  className={`py-1.5 px-2 rounded-xl border text-xs font-medium ${
                    buttonStyle.size === sz.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

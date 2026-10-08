import React, { useState } from 'react';
import { ActionType, ButtonItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { IconPickerModal } from './IconPickerModal';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Link,
  MessageCircle,
  Plus,
  Trash2,
  Wifi,
  CreditCard,
  UtensilsCrossed,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface ButtonsEditorProps {
  buttons: ButtonItem[];
  onChange: (buttons: ButtonItem[]) => void;
}

export const ButtonsEditor: React.FC<ButtonsEditorProps> = ({ buttons, onChange }) => {
  const [editingIconBtnId, setEditingIconBtnId] = useState<string | null>(null);
  const [expandedBtnId, setExpandedBtnId] = useState<string | null>(buttons[0]?.id || null);

  const currentEditingBtn = buttons.find((b) => b.id === editingIconBtnId);

  const handleUpdate = (id: string, updates: Partial<ButtonItem>) => {
    onChange(buttons.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const handleAddButton = (template?: Partial<ButtonItem>) => {
    const newId = `btn-${Date.now()}`;
    const newBtn: ButtonItem = {
      id: newId,
      label: template?.label || `Novo Botão ${buttons.length + 1}`,
      subtitle: template?.subtitle || 'Toque para acessar',
      url: template?.url || 'https://',
      icon: template?.icon || 'Link',
      highlightTag: template?.highlightTag || '',
      enabled: true,
      actionType: template?.actionType || 'link',
      customBgColor: template?.customBgColor,
      customTextColor: template?.customTextColor,
    };
    onChange([...buttons, newBtn]);
    setExpandedBtnId(newId);
  };

  const handleDelete = (id: string) => {
    if (buttons.length <= 1) {
      alert('Mantenha pelo menos 1 botão configurado.');
      return;
    }
    onChange(buttons.filter((b) => b.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newButtons = [...buttons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newButtons.length) return;
    const temp = newButtons[index];
    newButtons[index] = newButtons[targetIndex];
    newButtons[targetIndex] = temp;
    onChange(newButtons);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Botões e Links</h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                buttons.length === 5
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {buttons.length} {buttons.length === 5 ? 'botões (ideal)' : 'botões'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure os 5 botões principais que seus clientes verão na página.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleAddButton()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Adicionar Botão
        </button>
      </div>

      {/* Quick Add Presets (1-click template accelerators) */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
          Modelos Rápidos Prontos
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() =>
              handleAddButton({
                label: 'Falar no WhatsApp',
                subtitle: 'Atendimento direto com nossa equipe',
                url: 'https://wa.me/5511999999999',
                icon: 'MessageCircle',
                actionType: 'whatsapp',
                highlightTag: 'ONLINE',
                customBgColor: '#16a34a',
                customTextColor: '#ffffff',
              })
            }
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">WhatsApp</div>
              <div className="text-[10px] text-slate-400 truncate">+ Mensagem</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddButton({
                label: 'Cardápio Digital',
                subtitle: 'Conheça nossos pratos e bebidas',
                url: 'https://cardapio.exemplo.com',
                icon: 'UtensilsCrossed',
                actionType: 'link',
                highlightTag: 'CARDÁPIO',
              })
            }
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left transition-all group flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Cardápio</div>
              <div className="text-[10px] text-slate-400 truncate">+ Pratos</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddButton({
                label: 'Senha do Wi-Fi',
                subtitle: 'Toque para copiar a senha da rede',
                url: 'MinhaSenhaWi-Fi2026',
                icon: 'Wifi',
                actionType: 'copy',
                highlightTag: 'WI-FI',
              })
            }
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-left transition-all group flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <Wifi className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Wi-Fi Fácil</div>
              <div className="text-[10px] text-slate-400 truncate">1 Toque copia</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddButton({
                label: 'Chave PIX Oficial',
                subtitle: 'Toque para copiar a chave de pagamento',
                url: 'contato@meuestabelecimento.com.br',
                icon: 'CreditCard',
                actionType: 'copy',
                highlightTag: 'PAGAR',
              })
            }
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-left transition-all group flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Chave PIX</div>
              <div className="text-[10px] text-slate-400 truncate">Pagamento</div>
            </div>
          </button>
        </div>
      </div>

      {/* Buttons List Accordion */}
      <div className="space-y-3">
        {buttons.map((btn, index) => {
          const isExpanded = expandedBtnId === btn.id;

          return (
            <div
              key={btn.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-black/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              } ${!btn.enabled ? 'opacity-60' : ''}`}
            >
              {/* Accordion Summary Row */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                {/* Drag / Reorder Buttons */}
                <div className="flex flex-col gap-0.5 shrink-0 text-slate-500">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    title="Mover para cima"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === buttons.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Icon Button */}
                <button
                  type="button"
                  onClick={() => setEditingIconBtnId(btn.id)}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700 hover:border-amber-500 flex items-center justify-center shrink-0 text-white transition-all group"
                  title="Alterar ícone"
                >
                  <DynamicIcon name={btn.icon} className="w-5 h-5" />
                </button>

                {/* Clickable Title & Subtitle */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setExpandedBtnId(isExpanded ? null : btn.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white truncate">{btn.label}</span>
                    {btn.highlightTag && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-slate-950 uppercase shrink-0">
                        {btn.highlightTag}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {btn.actionType === 'copy' ? '📋 Copia: ' : '🔗 '}
                    {btn.url || 'Sem link configurado'}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => handleUpdate(btn.id, { enabled: !btn.enabled })}
                    className={`p-2 rounded-xl transition-colors ${
                      btn.enabled
                        ? 'text-emerald-400 hover:bg-emerald-500/10'
                        : 'text-slate-500 hover:bg-slate-800'
                    }`}
                    title={btn.enabled ? 'Botão visível' : 'Botão oculto'}
                  >
                    {btn.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(btn.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Excluir botão"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Expand Chevron */}
                  <button
                    type="button"
                    onClick={() => setExpandedBtnId(isExpanded ? null : btn.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Form Details */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                  {/* Label & Subtitle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Título do Botão
                      </label>
                      <input
                        type="text"
                        value={btn.label}
                        onChange={(e) => handleUpdate(btn.id, { label: e.target.value })}
                        placeholder="Ex: Pedir no WhatsApp"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Subtítulo / Descrição Curta
                      </label>
                      <input
                        type="text"
                        value={btn.subtitle || ''}
                        onChange={(e) => handleUpdate(btn.id, { subtitle: e.target.value })}
                        placeholder="Ex: Entregas em 30 min"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Action Type & URL/Content */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">Tipo de Ação</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(btn.id, { actionType: 'link' })}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                          btn.actionType === 'link'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Link className="w-3.5 h-3.5" />
                        Link / Site
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdate(btn.id, { actionType: 'whatsapp' })}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                          btn.actionType === 'whatsapp'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdate(btn.id, { actionType: 'copy' })}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                          btn.actionType === 'copy'
                            ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Wifi className="w-3.5 h-3.5" />
                        Copiar Texto
                      </button>
                    </div>

                    {/* URL Input */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">
                          {btn.actionType === 'whatsapp'
                            ? 'Link do WhatsApp ou número com DDD'
                            : btn.actionType === 'copy'
                            ? 'Texto para copiar ao clicar (PIX, Wi-Fi, etc.)'
                            : 'Endereço do Link (URL)'}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={btn.url}
                        onChange={(e) => handleUpdate(btn.id, { url: e.target.value })}
                        placeholder={
                          btn.actionType === 'whatsapp'
                            ? 'https://wa.me/5511999999999 ou (11) 99999-9999'
                            : btn.actionType === 'copy'
                            ? 'Ex: Senha123 ou CNPJ PIX'
                            : 'https://seusite.com.br'
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Highlight Tag & Icon selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Etiqueta de Destaque (opcional)
                      </label>
                      <input
                        type="text"
                        value={btn.highlightTag || ''}
                        onChange={(e) => handleUpdate(btn.id, { highlightTag: e.target.value })}
                        placeholder="Ex: NOVO, PROMO, MAIS PEDIDO"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Ícone Atual
                      </label>
                      <button
                        type="button"
                        onClick={() => setEditingIconBtnId(btn.id)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white hover:border-amber-500 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <DynamicIcon name={btn.icon} className="w-4 h-4 text-amber-400" />
                          <span>{btn.icon}</span>
                        </div>
                        <span className="text-xs text-amber-400 font-medium">Trocar...</span>
                      </button>
                    </div>
                  </div>

                  {/* Custom color override (optional) */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">
                        Cor personalizada exclusiva deste botão (opcional)
                      </span>
                      {btn.customBgColor && (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdate(btn.id, {
                              customBgColor: undefined,
                              customTextColor: undefined,
                            })
                          }
                          className="text-[11px] text-rose-400 hover:underline"
                        >
                          Usar cor padrão
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={btn.customBgColor || '#78350f'}
                          onChange={(e) => handleUpdate(btn.id, { customBgColor: e.target.value })}
                          className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                        />
                        <span className="text-xs text-slate-300">Fundo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={btn.customTextColor || '#ffffff'}
                          onChange={(e) => handleUpdate(btn.id, { customTextColor: e.target.value })}
                          className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                        />
                        <span className="text-xs text-slate-300">Texto</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Icon Picker Modal */}
      {currentEditingBtn && (
        <IconPickerModal
          isOpen={!!editingIconBtnId}
          currentIcon={currentEditingBtn.icon}
          onSelect={(iconName) => {
            handleUpdate(currentEditingBtn.id, { icon: iconName });
            setEditingIconBtnId(null);
          }}
          onClose={() => setEditingIconBtnId(null)}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { AVAILABLE_ICONS } from '../data/presets';
import { DynamicIcon } from './DynamicIcon';
import { Search, X } from 'lucide-react';

interface IconPickerModalProps {
  isOpen: boolean;
  currentIcon: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  currentIcon,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredIcons = AVAILABLE_ICONS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-base">Escolher Ícone do Botão</h3>
            <p className="text-xs text-slate-400">Selecione um ícone para representar sua ação</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar ícone (WhatsApp, cardápio, mapa, wifi...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Icon Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {filteredIcons.map((item) => {
            const isSelected = item.name === currentIcon;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  onSelect(item.name);
                  onClose();
                }}
                className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800/80 text-current">
                  <DynamicIcon name={item.name} className="w-4 h-4" />
                </div>
                <span className="text-[11px] leading-tight line-clamp-2">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { AppConfig } from '../types';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Share2,
  Printer,
  Smartphone,
  Sparkles,
  FileDown,
  FileUp,
} from 'lucide-react';

interface ShareAndQrCodeProps {
  config: AppConfig;
  onImportConfig: (config: AppConfig) => void;
}

export const ShareAndQrCode: React.FC<ShareAndQrCodeProps> = ({ config, onImportConfig }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrColor, setQrColor] = useState(
    config.buttonStyle.bgColor.startsWith('#') ? config.buttonStyle.bgColor : '#78350f'
  );
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Target share URL
  const pageUrl = window.location.href;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        pageUrl,
        {
          width: 240,
          margin: 2,
          color: {
            dark: qrColor,
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR Code', error);
        }
      );
    }
  }, [pageUrl, qrColor]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: config.profile.name,
          text: `Acesse os links e cardápio de ${config.profile.name}`,
          url: pageUrl,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQr = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qrcode-${config.profile.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `biolink-backup-${config.profile.name.toLowerCase().replace(/\s+/g, '-')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.buttons) {
          onImportConfig(parsed);
          alert('Configuração importada com sucesso!');
        } else {
          alert('Arquivo de configuração inválido.');
        }
      } catch (err) {
        alert('Erro ao ler o arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* 1. QR Code Card */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              QR Code do Estabelecimento
            </h3>
          </div>
          <span className="text-xs text-slate-400">Pronto para imprimir</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Gere o QR Code oficial para colocar em mesas, balcão de atendimento, comandas, sacolas de
          delivery ou vitrine. O cliente aponta a câmera do celular e acessa seus botões
          instantaneamente!
        </p>

        {/* QR Code Canvas Display */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            <canvas ref={canvasRef} className="rounded-lg max-w-[220px] max-h-[220px]" />
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-semibold text-white block">{config.profile.name}</span>
            <span className="text-[11px] text-slate-400">Escaneie com a câmera do celular</span>
          </div>

          {/* Color adjustment for QR Code */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-400">Cor do QR Code:</span>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              className="w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"
            />
          </div>
        </div>

        {/* Action Buttons for QR Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadQr}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            Baixar Imagem do QR Code (PNG)
          </button>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            Imprimir Display de Mesa
          </button>
        </div>
      </section>

      {/* 2. Direct Share Link */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Compartilhar Link da Página
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 truncate font-mono">
            {pageUrl}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex-1 sm:flex-initial py-2 px-3 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Enviar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Backup / Import / Export */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Backup e Gerenciamento
        </h3>
        <p className="text-xs text-slate-400">
          Suas alterações ficam salvas automaticamente neste navegador. Você também pode exportar
          um arquivo de backup para restaurar quando quiser.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleExportJson}
            className="py-2 px-3 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Baixar Backup (JSON)
          </button>

          <label className="py-2 px-3 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors">
            <FileUp className="w-3.5 h-3.5" />
            <span>Restaurar Backup</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>
      </section>

      {/* Printable Display Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Display de Mesa (Pré-visualização)</h3>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Fechar
              </button>
            </div>

            {/* Printable card preview */}
            <div className="p-6 bg-white text-slate-950 rounded-2xl shadow-lg text-center flex flex-col items-center space-y-3 border-2 border-dashed border-slate-300">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm">
                {config.profile.logoUrl ? (
                  <img
                    src={config.profile.logoUrl}
                    alt={config.profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Sparkles className="w-6 h-6 text-amber-500" />
                )}
              </div>

              <h4 className="font-bold text-sm tracking-tight">{config.profile.name}</h4>
              <p className="text-[11px] text-slate-600 leading-tight">
                Aponte a câmera do seu celular para ver nosso cardápio, WhatsApp e promoções:
              </p>

              {/* QR Code Canvas clone */}
              <div className="p-2 border-2 border-slate-900 rounded-xl">
                <canvas
                  ref={(node) => {
                    if (node) {
                      QRCode.toCanvas(
                        node,
                        pageUrl,
                        {
                          width: 150,
                          margin: 1,
                          color: { dark: '#000000', light: '#ffffff' },
                        },
                        () => {}
                      );
                    }
                  }}
                  className="w-[140px] h-[140px]"
                />
              </div>

              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Wi-Fi &bull; Cardápio &bull; Atendimento
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4 stroke-[2.5]" />
                Imprimir Agora
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="py-2 px-4 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs hover:text-white"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

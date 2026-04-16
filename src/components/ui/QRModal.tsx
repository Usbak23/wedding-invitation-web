'use client';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, MessageCircle } from 'lucide-react';
import { isMobile } from 'react-device-detect';
import Button from './Button';

interface QRModalProps {
  open: boolean;
  guestName: string;
  guestPhone?: string;
  invitationUrl: string;
  onClose: () => void;
}

export default function QRModal({ open, guestName, guestPhone, invitationUrl, onClose }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(invitationUrl, {
      width: 280,
      margin: 2,
      color: { dark: '#881337', light: '#ffffff' },
    }).then(setQrDataUrl);

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, invitationUrl, {
        width: 280,
        margin: 2,
        color: { dark: '#881337', light: '#ffffff' },
      });
    }
  }, [open, invitationUrl]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `undangan-${guestName.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  const handleWhatsApp = () => {
    const message = `Halo ${guestName}! 🎊\n\nKami mengundang kehadiran Anda di acara pernikahan kami.\n\nBuka link undangan Anda di sini:\n${invitationUrl}\n\n_Dengan hormat,_\n_Keluarga Pengantin_ 💍`;
    const encoded = encodeURIComponent(message);
    const phone = guestPhone?.replace(/\D/g, '').replace(/^0/, '62');
    const url = phone
      ? `https://wa.me/${phone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-semibold text-gray-900">Undangan untuk</p>
            <p className="text-rose-500 font-bold text-lg">{guestName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-2xl border-2 border-rose-100 shadow-sm">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* URL */}
        <p className="text-center text-xs text-gray-400 font-mono mb-5 truncate px-2">{invitationUrl}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" onClick={handleDownload}>
            <Download className="h-4 w-4" />Download QR
          </Button>
          <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600" onClick={handleWhatsApp}>
            <MessageCircle className="h-4 w-4" />
            {isMobile ? 'Kirim WA' : 'Share WA'}
          </Button>
        </div>
      </div>
    </div>
  );
}

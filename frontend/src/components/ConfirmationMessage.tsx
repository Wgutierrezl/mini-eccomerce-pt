import { CheckCircle } from 'lucide-react';

interface ConfirmationMessageProps {
  show: boolean;
}

export function ConfirmationMessage({ show }: ConfirmationMessageProps) {
  if (!show) return null;

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-[slideDown_0.3s_ease-out]">
      <CheckCircle size={24} />
      <span className="text-lg">Carrito guardado correctamente</span>
    </div>
  );
}

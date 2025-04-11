
import React from 'react';
import { Clock } from 'lucide-react';

interface DeliveryEstimateProps {
  estimatedDays: number | null;
}

const DeliveryEstimate = ({ estimatedDays }: DeliveryEstimateProps) => {
  if (estimatedDays === null) return null;
  
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="flex items-start">
        <div className="rounded-full bg-primary/10 p-3 shadow-sm mr-4 transition-all duration-300">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-secondary mb-1">Estimativa de prazo:</h4>
          <p className="text-sm text-gray-700 font-medium">
            Aproximadamente <span className="text-primary font-semibold">{estimatedDays}</span> {estimatedDays === 1 ? 'dia útil' : 'dias úteis'} após a aprovação do orçamento
          </p>
          <p className="text-xs text-gray-500 mt-2 font-light">
            Esta é apenas uma estimativa inicial. O prazo exato será confirmado após análise dos arquivos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEstimate;

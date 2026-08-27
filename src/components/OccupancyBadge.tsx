import React from 'react';
import { Accessibility, User, Users } from 'lucide-react';
import { BusArrivalInfo, LoadStatus } from '../types';

export const getLoadColor = (load: LoadStatus) => {
  switch (load) {
    case 'SEATS_AVAILABLE':
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: 'text-emerald-500',
        label: 'Seats Avail',
      };
    case 'STANDING_AVAILABLE':
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        label: 'Standing Avail',
      };
    case 'LIMITED_STANDING':
      return {
        text: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        icon: 'text-rose-500',
        label: 'Ltd Standing',
      };
  }
};

interface BusTimingBadgeProps {
  timing: BusArrivalInfo;
  isSubsequent?: boolean;
}

export const BusTimingBadge: React.FC<BusTimingBadgeProps> = ({ timing, isSubsequent = false }) => {
  const loadColors = getLoadColor(timing.load);
  const isArriving = timing.estimatedArrivalMinutes === 0;

  if (isArriving) {
    return (
      <div className="flex items-center space-x-1.5 font-bold">
        <span className="text-amber-600 text-sm tracking-tight flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-ping opacity-75" />
          ARRIVING
        </span>
        {timing.isWheelchairAccessible && (
          <Accessibility className="w-3.5 h-3.5 text-teal-600 inline-block ml-0.5" title="Wheelchair Accessible" />
        )}
      </div>
    );
  }

  const minsText = timing.estimatedArrivalMinutes === 1 ? '1 min' : `${timing.estimatedArrivalMinutes} mins`;

  return (
    <div className="flex items-center space-x-1.5 font-medium">
      <span className={`text-sm font-bold ${loadColors.text}`}>
        {minsText}
      </span>
      {timing.isWheelchairAccessible && (
        <Accessibility className="w-3.5 h-3.5 text-teal-600 inline-block ml-0.5" title="Wheelchair Accessible" />
      )}
    </div>
  );
};

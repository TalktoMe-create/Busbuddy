import React, { useState } from 'react';
import { 
  Accessibility, 
  RotateCw, 
  ArrowLeftRight, 
  MapPin, 
  Info,
  ChevronDown,
  ChevronUp,
  Bus as BusIcon,
  Flame,
  CheckCircle2,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { BusService, BusStopTiming } from '../types';
import { ALL_BUS_STOPS } from '../data/busServices';
import { BusTimingBadge } from './OccupancyBadge';

interface ArrivalCardProps {
  service: BusService;
  selectedDirection: number;
  onToggleDirection: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  highlightedStopCode?: string;
  onSelectStopCode?: (stopCode: string) => void;
}

export const ArrivalCard: React.FC<ArrivalCardProps> = ({
  service,
  selectedDirection,
  onToggleDirection,
  onRefresh,
  isRefreshing,
  highlightedStopCode,
  onSelectStopCode,
}) => {
  const [showAllStops, setShowAllStops] = useState(false);
  const [selectedStopDetail, setSelectedStopDetail] = useState<BusStopTiming | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);

  const currentRoute = service.directions.find((d) => d.directionNumber === selectedDirection) || service.directions[0];
  const allStops = currentRoute.stops;

  // Initial visible count matches the screenshot (5 stops), or show all if expanded
  const INITIAL_STOP_COUNT = 5;
  const displayedStops = showAllStops ? allStops : allStops.slice(0, INITIAL_STOP_COUNT);

  const toggleFavorite = (stopCode: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFavorites((prev) =>
      prev.includes(stopCode) ? prev.filter((c) => c !== stopCode) : [...prev, stopCode]
    );
  };

  return (
    <div
      id="arrival-timings-card"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
    >
      {/* Top Header Row */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div className="flex items-center space-x-4 flex-wrap gap-y-2">
          {/* Service Badge */}
          <div className="bg-[#e67323] hover:bg-[#d96719] transition-colors text-white font-extrabold text-lg px-4 py-1.5 rounded-xl shadow-xs flex items-center space-x-1.5 select-none">
            <span>Service {service.serviceNumber}</span>
          </div>

          {/* Operator */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              OPERATED BY
            </span>
            <span className="text-base font-black text-slate-800 tracking-tight">
              {service.operator}
            </span>
          </div>
        </div>

        {/* Legend & Refresh */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 font-medium">
          {/* Wheelchair Accessible */}
          <div className="flex items-center space-x-1.5">
            <Accessibility className="w-4 h-4 text-teal-600" />
            <span className="text-slate-600">Wheelchair Accessible</span>
          </div>

          {/* Seats Avail */}
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-slate-600">Seats Avail</span>
          </div>

          {/* Standing Avail */}
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-600">Standing Avail</span>
          </div>

          {/* Ltd Standing */}
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="text-slate-600">Ltd Standing</span>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            id="refresh-timings-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 active:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors shadow-2xs cursor-pointer ml-auto sm:ml-2"
          >
            <RotateCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin text-[#0f4c75]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Direction Banner */}
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            FROM
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900">
            {currentRoute.originName}
          </span>
        </div>

        {/* Direction Swap Button */}
        <button
          type="button"
          id="toggle-direction-btn"
          onClick={onToggleDirection}
          title="Switch Direction"
          className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-[#0f4c75] transition-all shadow-2xs mx-3 cursor-pointer group"
        >
          <ArrowLeftRight className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>

        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            TO
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-900">
            {currentRoute.destinationName}
          </span>
        </div>
      </div>

      {/* Timings Table / Stop List */}
      <div className="overflow-x-auto">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
          <div className="col-span-6 sm:col-span-7 pl-8">BUS STOP</div>
          <div className="col-span-3 sm:col-span-3 text-left">NEXT BUS</div>
          <div className="col-span-3 sm:col-span-2 text-left">SUBSEQUENT BUS</div>
        </div>

        {/* Stops List */}
        <div className="divide-y divide-slate-100 relative">
          {displayedStops.map((stop, index) => {
            const isHighlighted = highlightedStopCode === stop.stopCode;
            const isArriving = stop.nextBus.estimatedArrivalMinutes === 0;
            const isFirst = index === 0;
            const isLast = index === displayedStops.length - 1;
            const isSaved = savedFavorites.includes(stop.stopCode);

            return (
              <div
                key={stop.stopCode}
                id={`stop-row-${stop.stopCode}`}
                onClick={() => {
                  setSelectedStopDetail(selectedStopDetail?.stopCode === stop.stopCode ? null : stop);
                  if (onSelectStopCode) onSelectStopCode(stop.stopCode);
                }}
                className={`grid grid-cols-12 gap-2 px-6 py-4 items-center transition-colors cursor-pointer relative ${
                  isHighlighted
                    ? 'bg-amber-50/60 hover:bg-amber-50'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Timeline Line & Pin Column */}
                <div className="col-span-6 sm:col-span-7 flex items-center space-x-3.5 relative">
                  {/* Vertical Connecting Metro Line */}
                  <div className="relative flex items-center justify-center w-6 shrink-0">
                    {/* Line Above */}
                    {!isFirst && (
                      <span className="absolute top-0 bottom-1/2 w-0.5 bg-slate-200 -mt-4" />
                    )}
                    {/* Line Below */}
                    {!isLast && (
                      <span className="absolute top-1/2 bottom-0 w-0.5 bg-slate-200 -mb-4" />
                    )}
                    
                    {/* Pin Marker */}
                    <div
                      className={`relative z-10 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white transition-transform ${
                        isArriving
                          ? 'border-amber-500 bg-amber-500 ring-4 ring-amber-100 scale-110'
                          : isHighlighted
                          ? 'border-[#0f4c75] bg-[#0f4c75] ring-4 ring-blue-100 scale-110'
                          : 'border-slate-400 group-hover:border-slate-600'
                      }`}
                    >
                      {isArriving ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Stop Name & Code */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm tracking-tight truncate">
                        {stop.stopCode} - {stop.stopName}
                      </span>
                      {(() => {
                        const stopOpt = ALL_BUS_STOPS.find((s) => s.stopCode === stop.stopCode);
                        const postal = stop.postalCode || stopOpt?.postalCode;
                        if (!postal) return null;
                        return (
                          <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            📮 {postal}
                          </span>
                        );
                      })()}
                      {isHighlighted && (
                        <span className="text-[10px] font-bold bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded">
                          Selected
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block truncate mt-0.5">
                      {stop.roadName}
                    </span>
                  </div>

                </div>

                {/* Next Bus Timing */}
                <div className="col-span-3 sm:col-span-3 flex items-center">
                  <BusTimingBadge timing={stop.nextBus} />
                </div>

                {/* Subsequent Bus Timing */}
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <BusTimingBadge timing={stop.subsequentBus} isSubsequent />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Stop Detail Box (if user clicked on a stop) */}
      {selectedStopDetail && (
        <div className="bg-slate-50 p-4 border-t border-slate-200 animate-in fade-in duration-200">
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BusIcon className="w-5 h-5 text-[#0f4c75]" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-800">
                      {selectedStopDetail.stopCode} - {selectedStopDetail.stopName}
                    </h4>
                    {(() => {
                      const stopOpt = ALL_BUS_STOPS.find((s) => s.stopCode === selectedStopDetail.stopCode);
                      const postal = selectedStopDetail.postalCode || stopOpt?.postalCode;
                      if (!postal) return null;
                      return (
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          Postal {postal}
                        </span>
                      );
                    })()}
                  </div>
                  <p className="text-xs text-slate-500">{selectedStopDetail.roadName}</p>
                </div>

              </div>
              <button
                type="button"
                onClick={() => setSelectedStopDetail(null)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-semibold block mb-1">Next Arrival</span>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedStopDetail.nextBus.estimatedArrivalMinutes === 0
                    ? 'Now Arriving'
                    : `In ${selectedStopDetail.nextBus.estimatedArrivalMinutes} min(s)`}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Est. {selectedStopDetail.nextBus.exactTimestamp} • {selectedStopDetail.nextBus.busType === 'DD' ? 'Double Deck' : 'Single Deck'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-semibold block mb-1">Subsequent Bus</span>
                <span className="font-bold text-slate-800 text-sm">
                  In {selectedStopDetail.subsequentBus.estimatedArrivalMinutes} min(s)
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Est. {selectedStopDetail.subsequentBus.exactTimestamp} • {selectedStopDetail.subsequentBus.busType === 'DD' ? 'Double Deck' : 'Single Deck'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-semibold block mb-1">Operating Hours</span>
                <span className="font-bold text-slate-800 text-sm">
                  {currentRoute.firstBus} - {currentRoute.lastBus}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Category: {service.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action: Load More Stops */}
      {allStops.length > INITIAL_STOP_COUNT && (
        <div className="p-4 bg-white border-t border-slate-100 flex justify-center">
          <button
            type="button"
            id="load-more-stops-btn"
            onClick={() => setShowAllStops(!showAllStops)}
            className="inline-flex items-center space-x-1.5 px-6 py-2 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <span>{showAllStops ? 'Show Fewer Stops' : 'Load More Stops'}</span>
            {showAllStops ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

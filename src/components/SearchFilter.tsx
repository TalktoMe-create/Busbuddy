import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Mail, MapPin, Bus, Navigation, Sparkles } from 'lucide-react';
import { BusService, BusStopOption, SearchMode, PostalCodeLocation } from '../types';
import { POSTAL_CODE_LOCATIONS } from '../data/busServices';

interface SearchFilterProps {
  services: BusService[];
  allStops: BusStopOption[];
  selectedServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  selectedStopNo: string;
  onSelectStop: (stopNo: string) => void;
  onEstimateArrivalTime: () => void;
  selectedPostalCode?: string;
  onSelectPostalCode?: (postalCode: string, stopCode: string, serviceNo?: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  services,
  allStops,
  selectedServiceNo,
  onSelectService,
  selectedStopNo,
  onSelectStop,
  onEstimateArrivalTime,
  selectedPostalCode,
  onSelectPostalCode,
}) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('service');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [stopSearchQuery, setStopSearchQuery] = useState(selectedStopNo);
  const [isStopSuggestionsOpen, setIsStopSuggestionsOpen] = useState(false);

  // Postal Code search state
  const [postalQuery, setPostalQuery] = useState(selectedPostalCode || '');
  const [isPostalDropdownOpen, setIsPostalDropdownOpen] = useState(false);
  const [selectedPostalInfo, setSelectedPostalInfo] = useState<PostalCodeLocation | null>(null);

  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const stopDropdownRef = useRef<HTMLDivElement>(null);
  const postalDropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal stop query if prop changes
  useEffect(() => {
    setStopSearchQuery(selectedStopNo);
  }, [selectedStopNo]);

  // Sync postal info if selectedStopNo or selectedPostalCode changes
  useEffect(() => {
    if (selectedPostalCode) {
      setPostalQuery(selectedPostalCode);
      const matched = POSTAL_CODE_LOCATIONS.find((p) => p.postalCode === selectedPostalCode);
      if (matched) setSelectedPostalInfo(matched);
    } else if (selectedStopNo) {
      const stop = allStops.find((s) => s.stopCode === selectedStopNo);
      if (stop && stop.postalCode) {
        const matched = POSTAL_CODE_LOCATIONS.find((p) => p.postalCode === stop.postalCode);
        if (matched) {
          setSelectedPostalInfo(matched);
          setPostalQuery(matched.postalCode);
        }
      }
    }
  }, [selectedPostalCode, selectedStopNo, allStops]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(target)) {
        setIsServiceDropdownOpen(false);
      }
      if (stopDropdownRef.current && !stopDropdownRef.current.contains(target)) {
        setIsStopSuggestionsOpen(false);
      }
      if (postalDropdownRef.current && !postalDropdownRef.current.contains(target)) {
        setIsPostalDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStops = allStops.filter((stop) => {
    const q = stopSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      stop.stopCode.toLowerCase().includes(q) ||
      stop.stopName.toLowerCase().includes(q) ||
      stop.roadName.toLowerCase().includes(q) ||
      (stop.postalCode && stop.postalCode.includes(q))
    );
  });

  const filteredPostalLocations = POSTAL_CODE_LOCATIONS.filter((loc) => {
    const q = postalQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      loc.postalCode.includes(q) ||
      loc.buildingOrArea.toLowerCase().includes(q) ||
      loc.roadName.toLowerCase().includes(q) ||
      loc.nearestStopCode.includes(q)
    );
  });

  const handleStopSelect = (stopCode: string) => {
    setStopSearchQuery(stopCode);
    onSelectStop(stopCode);
    setIsStopSuggestionsOpen(false);
  };

  const handleClearStop = () => {
    setStopSearchQuery('');
    onSelectStop('');
  };

  const handlePostalSelect = (loc: PostalCodeLocation) => {
    setPostalQuery(loc.postalCode);
    setSelectedPostalInfo(loc);
    setIsPostalDropdownOpen(false);
    
    // Find matching bus stop
    const matchingStop = allStops.find((s) => s.stopCode === loc.nearestStopCode);
    if (matchingStop) {
      onSelectStop(matchingStop.stopCode);
      if (onSelectPostalCode) {
        onSelectPostalCode(loc.postalCode, matchingStop.stopCode, matchingStop.services[0]);
      }
      // If current selected service is not at this stop, pick the first available service
      if (matchingStop.services.length > 0 && !matchingStop.services.includes(selectedServiceNo)) {
        onSelectService(matchingStop.services[0]);
      }
    }
  };

  const handleClearPostal = () => {
    setPostalQuery('');
    setSelectedPostalInfo(null);
  };

  const currentStopObj = allStops.find((s) => s.stopCode === selectedStopNo);

  return (
    <div
      id="search-filter-card"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 mb-8 transition-shadow hover:shadow-sm"
    >
      {/* Search Mode Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Search Type
          </label>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Choose how you want to find bus arrivals
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 p-1.5 bg-slate-100/80 rounded-xl">
          {/* Mode 1: By Bus Service */}
          <button
            type="button"
            id="search-mode-service-btn"
            onClick={() => setSearchMode('service')}
            className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              searchMode === 'service'
                ? 'bg-white text-[#0f4c75] shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Bus className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="truncate">By Bus Service</span>
          </button>

          {/* Mode 2: By Bus Stop */}
          <button
            type="button"
            id="search-mode-stop-btn"
            onClick={() => setSearchMode('stop')}
            className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              searchMode === 'stop'
                ? 'bg-white text-[#0f4c75] shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">By Bus Stop</span>
          </button>

          {/* Mode 3: By Postal Code (NEW) */}
          <button
            type="button"
            id="search-mode-postal-btn"
            onClick={() => setSearchMode('postal')}
            className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              searchMode === 'postal'
                ? 'bg-white text-[#0f4c75] shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate">By Postal Code</span>
          </button>
        </div>
      </div>

      {/* MODE 1: SEARCH BY BUS SERVICE */}
      {searchMode === 'service' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end animate-in fade-in duration-150">
          {/* Service Selector Dropdown */}
          <div className="relative" ref={serviceDropdownRef}>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Search by Service No.
            </label>
            <button
              type="button"
              id="service-select-button"
              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-xl text-left text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f4c75] focus:border-transparent transition-all shadow-2xs hover:border-slate-400 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-slate-900">
                  {selectedServiceNo ? `Bus ${selectedServiceNo}` : 'Select Bus Service'}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                  isServiceDropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Service Dropdown Menu */}
            {isServiceDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Available Bus Routes
                </div>
                {services.map((service) => (
                  <button
                    key={service.serviceNumber}
                    id={`select-service-${service.serviceNumber}`}
                    onClick={() => {
                      onSelectService(service.serviceNumber);
                      setIsServiceDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedServiceNo === service.serviceNumber
                        ? 'bg-blue-50/70 text-[#0f4c75] font-bold'
                        : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center justify-center w-8 h-7 bg-orange-500 text-white font-bold text-sm rounded-md shadow-2xs">
                        {service.serviceNumber}
                      </span>
                      <div>
                        <span className="text-sm font-semibold">
                          {service.directions[0].originName} → {service.directions[0].destinationName}
                        </span>
                        <span className="block text-xs text-slate-400 font-normal">
                          Operated by {service.operatorFullName}
                        </span>
                      </div>
                    </div>
                    {selectedServiceNo === service.serviceNumber && (
                      <Check className="w-4 h-4 text-[#0f4c75]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Optional Bus Stop Filter */}
          <div className="relative" ref={stopDropdownRef}>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Filter by Bus Stop No. <span className="text-xs text-slate-400 font-normal">(*optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="stop-search-input"
                value={stopSearchQuery}
                onChange={(e) => {
                  setStopSearchQuery(e.target.value);
                  onSelectStop(e.target.value);
                  setIsStopSuggestionsOpen(true);
                }}
                onFocus={() => setIsStopSuggestionsOpen(true)}
                placeholder="e.g. 99009, Changi Village, Bedok"
                className="w-full pl-4 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c75] focus:border-transparent transition-all shadow-2xs text-sm font-medium hover:border-slate-400"
              />
              {stopSearchQuery ? (
                <button
                  type="button"
                  onClick={handleClearStop}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Bus Stop Suggestions Dropdown */}
            {isStopSuggestionsOpen && filteredStops.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Matching Bus Stops
                </div>
                {filteredStops.slice(0, 8).map((stop) => (
                  <button
                    key={stop.stopCode}
                    id={`select-stop-${stop.stopCode}`}
                    onClick={() => handleStopSelect(stop.stopCode)}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                          {stop.stopCode}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0f4c75]">
                          {stop.stopName}
                        </span>
                        {stop.postalCode && (
                          <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                            📮 {stop.postalCode}
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {stop.roadName} • Services: {stop.services.join(', ')}
                      </span>
                    </div>
                    {selectedStopNo === stop.stopCode && (
                      <Check className="w-4 h-4 text-[#0f4c75]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: SEARCH DIRECTLY BY BUS STOP */}
      {searchMode === 'stop' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="relative" ref={stopDropdownRef}>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Search by Bus Stop Code, Stop Name, or Road
            </label>
            <div className="relative">
              <input
                type="text"
                id="direct-stop-search-input"
                value={stopSearchQuery}
                onChange={(e) => {
                  setStopSearchQuery(e.target.value);
                  onSelectStop(e.target.value);
                  setIsStopSuggestionsOpen(true);
                }}
                onFocus={() => setIsStopSuggestionsOpen(true)}
                placeholder="Enter 5-digit Stop Code (e.g. 99009, 84049) or Name (e.g. Orchard)..."
                className="w-full pl-11 pr-11 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-2xs text-sm font-medium hover:border-slate-400"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
                <MapPin className="w-5 h-5" />
              </div>
              {stopSearchQuery && (
                <button
                  type="button"
                  onClick={handleClearStop}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions list */}
            {isStopSuggestionsOpen && filteredStops.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Bus Stop
                </div>
                {filteredStops.map((stop) => (
                  <button
                    key={stop.stopCode}
                    onClick={() => {
                      handleStopSelect(stop.stopCode);
                      if (stop.services.length > 0 && !stop.services.includes(selectedServiceNo)) {
                        onSelectService(stop.services[0]);
                      }
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                          {stop.stopCode}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700">
                          {stop.stopName}
                        </span>
                        {stop.postalCode && (
                          <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            📮 {stop.postalCode}
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-slate-400 mt-1">
                        {stop.roadName} • Services: {stop.services.join(', ')}
                      </span>
                    </div>
                    {selectedStopNo === stop.stopCode && (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick stop selection pill info if selected */}
          {currentStopObj && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-emerald-900">
                  Active Stop: {currentStopObj.stopCode} - {currentStopObj.stopName}
                </span>
                {currentStopObj.postalCode && (
                  <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded text-emerald-800 border border-emerald-200">
                    Postal: {currentStopObj.postalCode}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-slate-500">Connecting Services:</span>
                {currentStopObj.services.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => onSelectService(svc)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                      selectedServiceNo === svc
                        ? 'bg-orange-500 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-orange-400'
                    }`}
                  >
                    Bus {svc}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: SEARCH BY POSTAL CODE (NEW) */}
      {searchMode === 'postal' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="relative" ref={postalDropdownRef}>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Search by Singapore 6-Digit Postal Code or Location
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Enter your destination or current postal code to find nearest bus stops and arrival timings.
            </p>

            <div className="relative">
              <input
                type="text"
                id="postal-code-search-input"
                value={postalQuery}
                onChange={(e) => {
                  setPostalQuery(e.target.value);
                  setIsPostalDropdownOpen(true);
                }}
                onFocus={() => setIsPostalDropdownOpen(true)}
                placeholder="Enter 6-digit Postal Code (e.g. 508528, 469588, 238872) or building name..."
                className="w-full pl-11 pr-11 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs text-sm font-medium hover:border-slate-400"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600 pointer-events-none">
                <Mail className="w-5 h-5" />
              </div>
              {postalQuery && (
                <button
                  type="button"
                  onClick={handleClearPostal}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Postal suggestions dropdown */}
            {isPostalDropdownOpen && filteredPostalLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Matching Singapore Postal Codes</span>
                  <span>Nearest Stop</span>
                </div>
                {filteredPostalLocations.map((loc) => {
                  const matchingStop = allStops.find((s) => s.stopCode === loc.nearestStopCode);
                  const isSelected = selectedPostalInfo?.postalCode === loc.postalCode;
                  return (
                    <button
                      key={loc.postalCode}
                      id={`select-postal-${loc.postalCode}`}
                      onClick={() => handlePostalSelect(loc)}
                      className={`w-full px-4 py-3 text-left hover:bg-indigo-50/50 flex items-center justify-between group transition-colors cursor-pointer border-b border-slate-100 last:border-0 ${
                        isSelected ? 'bg-indigo-50 text-indigo-900' : ''
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded border border-indigo-200">
                            📮 {loc.postalCode}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                            {loc.buildingOrArea}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">
                          {loc.roadName}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>Stop {loc.nearestStopCode}</span>
                        </div>
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          ~{loc.distanceMetres}m walk
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Popular Postal Code Pills */}
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular Postal Codes in Singapore:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { code: '508528', label: 'Changi Village' },
                { code: '238872', label: 'Orchard Rd / ION' },
                { code: '469588', label: 'Bedok Mall / Hub' },
                { code: '099114', label: 'HarbourFront / Vivo' },
                { code: '519634', label: 'Pasir Ris Central' },
                { code: '179429', label: 'Victoria Concert Hall' },
                { code: '129905', label: 'Clementi Mall' },
                { code: '689810', label: 'Choa Chu Kang Int' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    const loc = POSTAL_CODE_LOCATIONS.find((p) => p.postalCode === item.code);
                    if (loc) handlePostalSelect(loc);
                  }}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    postalQuery === item.code
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className="font-mono font-bold">{item.code}</span>
                  <span className="opacity-80">({item.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Postal Resolution Card */}
          {selectedPostalInfo && (
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-extrabold px-2.5 py-0.5 bg-indigo-600 text-white rounded-md">
                      📮 Singapore {selectedPostalInfo.postalCode}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {selectedPostalInfo.buildingOrArea}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedPostalInfo.roadName} • Located ~{selectedPostalInfo.distanceMetres}m from Bus Stop{' '}
                    <strong className="text-slate-800">{selectedPostalInfo.nearestStopCode}</strong>
                  </p>
                </div>

                <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-1 rounded-md border border-indigo-200 shrink-0">
                  Nearest Transit
                </span>
              </div>

              {/* Connected bus services list */}
              {(() => {
                const stop = allStops.find((s) => s.stopCode === selectedPostalInfo.nearestStopCode);
                if (!stop) return null;
                return (
                  <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-indigo-200/60">
                    <span className="text-xs font-semibold text-slate-700">
                      Services at {stop.stopName} ({stop.stopCode}):
                    </span>
                    {stop.services.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => onSelectService(svc)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          selectedServiceNo === svc
                            ? 'bg-orange-500 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-300 hover:border-orange-400'
                        }`}
                      >
                        Bus {svc}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Action Row - Estimate Arrival Time */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          id="estimate-arrival-btn"
          onClick={onEstimateArrivalTime}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#0f4c75] hover:bg-[#0b3856] active:bg-[#082a42] text-white text-sm font-bold rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Estimate Arrival Time
        </button>
      </div>
    </div>
  );
};

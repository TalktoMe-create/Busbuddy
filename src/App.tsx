/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchFilter } from './components/SearchFilter';
import { ArrivalCard } from './components/ArrivalCard';
import { BUS_SERVICES, ALL_BUS_STOPS } from './data/busServices';
import { BusService, BusStopOption } from './types';
import { Bus, MapPin, ChevronRight, Bookmark, ArrowUpDown, Search, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bus');
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('2');
  const [selectedStopNo, setSelectedStopNo] = useState<string>('');
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>('');
  const [selectedDirection, setSelectedDirection] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [servicesData, setServicesData] = useState<BusService[]>(BUS_SERVICES);
  const [currentTime, setCurrentTime] = useState<string>('14:34 SGT');
  const [stopSearchFilter, setStopSearchFilter] = useState('');


  // Clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} SGT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Periodic ETA simulated countdown (every 30 seconds)
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setServicesData((prev) =>
        prev.map((service) => ({
          ...service,
          directions: service.directions.map((dir) => ({
            ...dir,
            stops: dir.stops.map((stop) => {
              // jitter ETA slightly for realistic live feed
              const nextMins = Math.max(0, stop.nextBus.estimatedArrivalMinutes);
              return {
                ...stop,
                nextBus: {
                  ...stop.nextBus,
                  estimatedArrivalMinutes: nextMins === 0 ? 9 : Math.max(0, nextMins - 1),
                },
                subsequentBus: {
                  ...stop.subsequentBus,
                  estimatedArrivalMinutes: Math.max(
                    nextMins + 5,
                    stop.subsequentBus.estimatedArrivalMinutes - 1
                  ),
                },
              };
            }),
          })),
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  const handleEstimateArrivalTime = () => {
    handleRefresh();
  };

  const currentService =
    servicesData.find((s) => s.serviceNumber === selectedServiceNo) || servicesData[0];

  const handleToggleDirection = () => {
    setSelectedDirection((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-800 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTime={currentTime}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumbs */}
        <nav
          id="breadcrumb-trail"
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6 select-none"
        >
          <button
            type="button"
            onClick={() => setActiveTab('bus')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => setActiveTab('bus')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Bus
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-bold">NextBus Arrival Timings</span>
        </nav>

        {/* Tab 1: NextBus Arrival Timings (Main Screen Matching Screenshot) */}
        {activeTab === 'bus' && (
          <div className="space-y-6">
            {/* Page Header */}
            <div id="page-header" className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0e3e5b] tracking-tight">
                NextBus Arrival Timings
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-normal">
                Find out the estimated arrival time of your next bus!
              </p>
            </div>

            {/* Search and Filters Card */}
            <SearchFilter
              services={servicesData}
              allStops={ALL_BUS_STOPS}
              selectedServiceNo={selectedServiceNo}
              onSelectService={(serviceNo) => {
                setSelectedServiceNo(serviceNo);
                setSelectedDirection(1);
              }}
              selectedStopNo={selectedStopNo}
              onSelectStop={(stopNo) => setSelectedStopNo(stopNo)}
              onEstimateArrivalTime={handleEstimateArrivalTime}
              selectedPostalCode={selectedPostalCode}
              onSelectPostalCode={(postal, stopCode, svc) => {
                setSelectedPostalCode(postal);
                setSelectedStopNo(stopCode);
                if (svc) setSelectedServiceNo(svc);
              }}
            />


            {/* Arrival Timings Schedule Card */}
            <ArrivalCard
              service={currentService}
              selectedDirection={selectedDirection}
              onToggleDirection={handleToggleDirection}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              highlightedStopCode={selectedStopNo}
              onSelectStopCode={(stopCode) => setSelectedStopNo(stopCode)}
            />
          </div>
        )}

        {/* Tab 2: Bus Stops Directory */}
        {activeTab === 'stops' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold text-[#0e3e5b] tracking-tight">
                Bus Stops Directory
              </h1>
              <p className="text-slate-500 text-sm">
                Explore bus stop codes, locations, and available connecting services.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="relative mb-6">
                <input
                  type="text"
                  value={stopSearchFilter}
                  onChange={(e) => setStopSearchFilter(e.target.value)}
                  placeholder="Search by Stop Code (e.g. 99009), Name, Road, or 6-digit Postal Code (e.g. 508528)..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0f4c75] focus:outline-none shadow-2xs"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_BUS_STOPS.filter(
                  (s) =>
                    !stopSearchFilter ||
                    s.stopCode.includes(stopSearchFilter) ||
                    s.stopName.toLowerCase().includes(stopSearchFilter.toLowerCase()) ||
                    s.roadName.toLowerCase().includes(stopSearchFilter.toLowerCase()) ||
                    (s.postalCode && s.postalCode.includes(stopSearchFilter))
                ).map((stop) => (
                  <div
                    key={stop.stopCode}
                    onClick={() => {
                      setSelectedStopNo(stop.stopCode);
                      if (stop.postalCode) setSelectedPostalCode(stop.postalCode);
                      if (stop.services.length > 0) {
                        setSelectedServiceNo(stop.services[0]);
                      }
                      setActiveTab('bus');
                    }}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#0f4c75] hover:bg-blue-50/30 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#0f4c75] group-hover:text-white transition-colors text-slate-600">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                            {stop.stopCode}
                          </span>
                          <span className="font-bold text-slate-800 text-sm group-hover:text-[#0f4c75]">
                            {stop.stopName}
                          </span>
                          {stop.postalCode && (
                            <span className="font-mono text-[11px] font-semibold px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                              📮 {stop.postalCode}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 block mt-1">
                          {stop.roadName}
                        </span>
                        <div className="flex items-center space-x-1.5 mt-2 flex-wrap gap-1">
                          {stop.services.map((svc) => (
                            <span
                              key={svc}
                              className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800"
                            >
                              Bus {svc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f4c75] transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold text-[#0e3e5b] tracking-tight">
                Bus Routes
              </h1>
              <p className="text-slate-500 text-sm">
                View all public bus routes, operators, and terminals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesData.map((service) => (
                <div
                  key={service.serviceNumber}
                  onClick={() => {
                    setSelectedServiceNo(service.serviceNumber);
                    setSelectedDirection(1);
                    setActiveTab('bus');
                  }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0f4c75] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-10 h-8 rounded-lg bg-[#e67323] text-white font-extrabold flex items-center justify-center text-base shadow-2xs">
                        {service.serviceNumber}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                          {service.category} Route
                        </span>
                        <h3 className="text-sm font-bold text-slate-800">
                          Operated by {service.operatorFullName} ({service.operator})
                        </h3>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f4c75] transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Direction 1:</span>
                      <span className="font-bold text-slate-800">
                        {service.directions[0].originName} → {service.directions[0].destinationName}
                      </span>
                    </div>
                    {service.directions[1] && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Direction 2:</span>
                        <span className="font-bold text-slate-800">
                          {service.directions[1].originName} → {service.directions[1].destinationName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Favourites */}
        {activeTab === 'favourites' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold text-[#0e3e5b] tracking-tight">
                Favourite Stops & Services
              </h1>
              <p className="text-slate-500 text-sm">
                Quick access to your most frequently checked bus arrivals.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 mx-auto flex items-center justify-center mb-4">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Pin Your Frequent Bus Stops
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Click on any bus stop in the arrival timetable to view arrival schedules and quickly switch services!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceNo('2');
                  setActiveTab('bus');
                }}
                className="px-6 py-2.5 bg-[#0f4c75] hover:bg-[#0b3856] text-white text-sm font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                View Service 2 Timings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-[#0f3b57] text-white flex items-center justify-center">
              <Bus className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-700">BusBuddy Singapore</span>
            <span>• Real-Time NextBus Timings</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Data synced with Land Transport Authority (LTA) Datamall standards
          </p>
        </div>
      </footer>
    </div>
  );
}


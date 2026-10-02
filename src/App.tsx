import React, { useState } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { CinematicLoader } from './components/CinematicLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationExplorer } from './components/DestinationExplorer';
import { GeographicMap } from './components/GeographicMap';
import { TripBuilder } from './components/TripBuilder';
import { ExperienceMarketplace } from './components/ExperienceMarketplace';
import { ProviderVerification } from './components/ProviderVerification';
import { LanguageLearning } from './components/LanguageLearning';
import { CultureSection } from './components/CultureSection';
import { TravelSafety } from './components/TravelSafety';
import { ForHosts } from './components/ForHosts';
import { MyTripsDashboard } from './components/MyTripsDashboard';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { AdminDemoModal } from './components/AdminDemoModal';
import { Footer } from './components/Footer';

import { DestinationId, GeneratedItinerary, BookingRecord, Experience, Provider } from './types';
import { destinations } from './data/destinations';
import { generateTripItinerary } from './data/generator';

function MainAppContent() {
  const { showToast } = useToast();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>('explore');

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingItinerary, setBookingItinerary] = useState<GeneratedItinerary | null>(null);

  // Saved bookings and itineraries for "My Trips"
  const [savedBookings, setSavedBookings] = useState<BookingRecord[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>([]);

  // Synchronized hovered destination state across cards and map
  const [hoveredDestinationId, setHoveredDestinationId] = useState<DestinationId | null>(null);

  // Trip builder prefill state
  const [tripPrefill, setTripPrefill] = useState<{
    destinationId?: DestinationId;
    budgetTier?: 'budget' | 'comfort' | 'luxury';
    travelerType?: 'solo' | 'couple' | 'family' | 'friends';
  }>({
    destinationId: 'swat',
    budgetTier: 'comfort',
    travelerType: 'family'
  });

  // Handler: Start journey from Hero search bar
  const handleStartJourney = (prefill?: {
    destinationId?: DestinationId;
    budgetTier?: 'budget' | 'comfort' | 'luxury';
    travelerType?: 'solo' | 'couple' | 'family' | 'friends';
  }) => {
    if (prefill) {
      setTripPrefill(prev => ({ ...prev, ...prefill }));
    }
    setActiveTab('planner');
    
    // Smooth scroll to trip builder
    setTimeout(() => {
      const el = document.getElementById('trip-builder-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handler: Build trip directly from Destination modal / card
  const handleBuildTripFromDestination = (destId: DestinationId) => {
    setTripPrefill(prev => ({ ...prev, destinationId: destId }));
    setActiveTab('planner');
    setTimeout(() => {
      const el = document.getElementById('trip-builder-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handler: Initiate booking flow from Trip Builder
  const handleInitiateBooking = (itinerary: GeneratedItinerary) => {
    setBookingItinerary(itinerary);
    setBookingModalOpen(true);
  };

  // Handler: Save trip to My Trips
  const handleSaveTrip = (itinerary: GeneratedItinerary) => {
    setSavedItineraries(prev => [itinerary, ...prev.filter(t => t.id !== itinerary.id)]);
  };

  // Handler: Booking completion
  const handleBookingComplete = (newBooking: BookingRecord) => {
    setSavedBookings(prev => [newBooking, ...prev]);
  };

  // Handler: Add experience to trip
  const handleAddExperienceToTrip = (exp: Experience) => {
    setTripPrefill(prev => ({ ...prev, destinationId: exp.destinationId }));
    setActiveTab('planner');
    setTimeout(() => {
      const el = document.getElementById('trip-builder-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handler: Navigate to Language Learning
  const handleNavigateToLearn = (_language: string) => {
    setActiveTab('learn');
    setTimeout(() => {
      const el = document.getElementById('learn-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Global search handlers
  const handleSelectSearchResultDest = (destId: DestinationId) => {
    handleBuildTripFromDestination(destId);
  };

  const handleSelectSearchResultExp = (exp: Experience) => {
    handleAddExperienceToTrip(exp);
  };

  const handleSelectSearchResultProv = (prov: Provider) => {
    handleBuildTripFromDestination(prov.destinationId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#151D1A]">
      <CinematicLoader />
      <CustomCursor />

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'explore') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const sectionMap: Record<string, string> = {
              'explore': 'explore-section',
              'map': 'map-section',
              'trips': 'trip-builder-section',
              'planner': 'trip-builder-section',
              'experiences': 'experiences-section',
              'learn': 'learn-section',
              'safety': 'safety-section',
              'hosts': 'hosts-section',
            };
            const targetId = sectionMap[tab];
            if (targetId) {
              const el = document.getElementById(targetId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        onOpenSearch={() => setSearchOpen(true)}
        savedTripsCount={savedBookings.length > 0 ? savedBookings.length : 1}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'my-trips' ? (
          // Dedicated My Trips view
          <MyTripsDashboard
            savedBookings={savedBookings}
            savedItineraries={savedItineraries}
            onContinueLearning={() => handleNavigateToLearn('Pashto')}
            onOpenTripBuilder={() => handleStartJourney({ destinationId: 'swat' })}
          />
        ) : (
          // Complete Experience Homepage
          <>
            {/* Cinematic Hero with Search Bar */}
            <Hero
              onStartJourney={handleStartJourney}
              onExploreDestinations={() => {
                const el = document.getElementById('explore-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Destination Explorer */}
            <DestinationExplorer
              onBuildTrip={handleBuildTripFromDestination}
              onSelectExperience={(expId) => {
                const el = document.getElementById('experiences-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onHoverDestination={setHoveredDestinationId}
            />

            {/* Lightweight Geographic Map & Mountain Corridors Visualization */}
            <GeographicMap
              onSelectDestination={handleBuildTripFromDestination}
              onBuildTrip={handleBuildTripFromDestination}
              externalHoveredId={hoveredDestinationId}
            />

            {/* Flagship Interactive Trip Builder */}
            <TripBuilder
              initialDestinationId={tripPrefill.destinationId}
              initialTravelerType={tripPrefill.travelerType}
              initialBudgetTier={tripPrefill.budgetTier}
              onBookTrip={handleInitiateBooking}
              onSaveTrip={handleSaveTrip}
              onNavigateToLearn={handleNavigateToLearn}
            />

            {/* Experience Marketplace */}
            <ExperienceMarketplace
              onAddExperienceToTrip={handleAddExperienceToTrip}
            />

            {/* Verified Provider Showcase */}
            <ProviderVerification />

            {/* Language Learning: Learn Before You Go */}
            <LanguageLearning />

            {/* Cultural Intelligence: Know Before You Go */}
            <CultureSection />

            {/* Real-time Safety & Route Operations Dashboard */}
            <TravelSafety />

            {/* Host Onboarding & Economic Impact */}
            <ForHosts />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          const sectionMap: Record<string, string> = {
            'explore': 'explore-section',
            'planner': 'trip-builder-section',
            'experiences': 'experiences-section',
            'learn': 'learn-section',
            'safety': 'safety-section',
            'hosts': 'hosts-section',
          };
          const targetId = sectionMap[tab];
          if (targetId) {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Global Interactive Modals */}
      <BookingModal
        itinerary={bookingItinerary}
        onClose={() => setBookingModalOpen(false)}
        onBookingComplete={handleBookingComplete}
        onViewMyTrips={() => {
          setBookingModalOpen(false);
          setActiveTab('my-trips');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDestination={handleSelectSearchResultDest}
        onSelectExperience={handleSelectSearchResultExp}
        onSelectProvider={handleSelectSearchResultProv}
      />

      <AdminDemoModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainAppContent />
    </ToastProvider>
  );
}

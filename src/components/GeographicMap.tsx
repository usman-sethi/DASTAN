import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Compass, Navigation, Mountain, Car, Plane, 
  ArrowRight, ShieldCheck, Thermometer, Info, Eye, Sparkles
} from 'lucide-react';
import { DestinationId } from '../types';
import { destinations } from '../data/destinations';

interface GeographicMapProps {
  onSelectDestination: (destId: DestinationId) => void;
  onBuildTrip: (destId: DestinationId) => void;
  externalHoveredId?: DestinationId | null;
}

interface ClusterNode {
  id: DestinationId;
  name: string;
  urduName: string;
  region: string;
  mountainRange: string;
  coords: { x: number; y: number }; // Percentage on SVG coordinate space (0-100)
  altitude: string;
  transitFromIslamabad: {
    drive: string;
    flight?: string;
    route: string;
  };
  prominentPeaks: string[];
  description: string;
  accentColor: string;
  thumbnail: string;
}

const CLUSTERS: ClusterNode[] = [
  {
    id: 'chitral',
    name: 'Chitral & Kalash',
    urduName: 'چترال و کیلاش',
    region: 'Khyber Pakhtunkhwa',
    mountainRange: 'Hindu Kush Range',
    coords: { x: 24, y: 32 },
    altitude: '1,500m – 3,500m',
    transitFromIslamabad: {
      drive: '6.5 – 7.5 hrs (via Lowari Tunnel)',
      flight: '50 mins (Islamabad to Chitral Airport)',
      route: 'M-16 Motorway → Dir → Lowari Tunnel → Ayun'
    },
    prominentPeaks: ['Tirich Mir (7,708m)', 'Noshaq (7,492m)'],
    description: 'Western frontier valley shadowed by Tirich Mir. Home to the indigenous polytheistic Kalash communities in Bumburet and Rumbur.',
    accentColor: '#B94726',
    thumbnail: '/src/assets/images/dest_chitral_culture_1790930771028.jpg'
  },
  {
    id: 'kalam',
    name: 'Kalam Valley',
    urduName: 'کالام',
    region: 'Khyber Pakhtunkhwa',
    mountainRange: 'Upper Swat Alpine Zone',
    coords: { x: 38, y: 39 },
    altitude: '2,000m – 3,200m',
    transitFromIslamabad: {
      drive: '5.5 hrs (Paved highway to Kalam)',
      route: 'M-16 Swat Expressway → Mingora → Bahrain → Kalam'
    },
    prominentPeaks: ['Falak Sar (5,918m)', 'Mankial Peak (5,598m)'],
    description: 'Alpine deodar sanctuary where glacial streams form the Swat River. Gateway to Mahodand and Saifullah alpine lakes.',
    accentColor: '#164E3D',
    thumbnail: '/src/assets/images/dest_kalam_mountains_1790930758794.jpg'
  },
  {
    id: 'swat',
    name: 'Swat Valley',
    urduName: 'وادیٔ سوات',
    region: 'Khyber Pakhtunkhwa',
    mountainRange: 'Lower Hindu Kush Foothills',
    coords: { x: 35, y: 55 },
    altitude: '991m – 2,800m',
    transitFromIslamabad: {
      drive: '3.5 hrs (Direct 4-lane expressway)',
      route: 'M-16 Swat Motorway via Colonel Sher Khan interchange'
    },
    prominentPeaks: ['Malam Jabba Ridge (2,804m)', 'Elum Peak (2,800m)'],
    description: 'Ancient Gandhara kingdom of Uddiyana with Buddhist stupas, emerald riverbanks, and terraced peach orchards.',
    accentColor: '#0F382C',
    thumbnail: '/src/assets/images/hero_swat_valley_1790930745484.jpg'
  },
  {
    id: 'hunza',
    name: 'Hunza Valley',
    urduName: 'ہنزہ',
    region: 'Gilgit-Baltistan',
    mountainRange: 'Central Karakoram Range',
    coords: { x: 67, y: 22 },
    altitude: '2,438m',
    transitFromIslamabad: {
      drive: '12 – 14 hrs (via Karakoram Highway)',
      flight: '45 mins (Islamabad to Gilgit + 1.5 hr drive)',
      route: 'Karakoram Highway (N-35) through Chilas & Raikot'
    },
    prominentPeaks: ['Rakaposhi (7,788m)', 'Passu Cones (6,106m)', 'Ultar Sar (7,388m)'],
    description: 'Legendary Silk Road mountain kingdom famous for thousand-year-old stone forts, high literacy, and turquoise Attabad Lake.',
    accentColor: '#E28413',
    thumbnail: '/src/assets/images/dest_hunza_passu_1790930782780.jpg'
  },
  {
    id: 'skardu',
    name: 'Skardu & Deosai',
    urduName: 'سکردو',
    region: 'Gilgit-Baltistan',
    mountainRange: 'Karakoram & Himalayan Junction',
    coords: { x: 82, y: 44 },
    altitude: '2,228m (Deosai Plateau: 4,114m)',
    transitFromIslamabad: {
      drive: '14 hrs (via Jaglot-Skardu all-weather road)',
      flight: '55 mins (Direct daily jet flights to Skardu Airport)',
      route: 'KKH → Jaglot Junction → Indus River Gorge Road'
    },
    prominentPeaks: ['K2 (8,611m - 2nd highest)', 'Broad Peak (8,051m)', 'Masherbrum (7,821m)'],
    description: 'High-altitude cold desert, ancient Kharpocho fortress, and Deosai (Land of Giants) — world’s 2nd highest alpine plateau.',
    accentColor: '#D97706',
    thumbnail: '/src/assets/images/hero_swat_valley_1790930745484.jpg'
  }
];

export const GeographicMap: React.FC<GeographicMapProps> = ({
  onSelectDestination,
  onBuildTrip,
  externalHoveredId = null
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<DestinationId>('swat');
  const [internalHoveredId, setInternalHoveredId] = useState<DestinationId | null>(null);
  const [showPeaks, setShowPeaks] = useState(true);
  const [showCorridors, setShowCorridors] = useState(true);
  const [regionFilter, setRegionFilter] = useState<'all' | 'kp' | 'gb'>('all');

  // Active highlighted destination priority: internal hover > external card hover > selected
  const activeHoveredId = internalHoveredId || externalHoveredId;
  const highlightedId = activeHoveredId || selectedClusterId;

  const selectedCluster = CLUSTERS.find(c => c.id === selectedClusterId) || CLUSTERS[2];
  const activeCluster = CLUSTERS.find(c => c.id === highlightedId) || selectedCluster;
  const matchedDest = destinations.find(d => d.id === selectedCluster.id);

  const filteredClusters = CLUSTERS.filter(c => {
    if (regionFilter === 'kp') return c.region === 'Khyber Pakhtunkhwa';
    if (regionFilter === 'gb') return c.region === 'Gilgit-Baltistan';
    return true;
  });

  return (
    <section id="map-section" className="py-16 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F382C] mb-2">
              <Compass className="w-4 h-4 text-[#0F382C]" />
              <span>Geographic Orientation & Mountain Corridors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
              Navigate Pakistan’s mountain kingdoms
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-light">
              Hover over any destination card to spotlight its mountain corridor, elevations, and transit passes directly on the topological relief map.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 rounded-xl text-xs font-medium self-start md:self-auto">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                regionFilter === 'all'
                  ? 'bg-white text-[#0F382C] font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Corridors (5)
            </button>
            <button
              onClick={() => setRegionFilter('kp')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                regionFilter === 'kp'
                  ? 'bg-white text-[#0F382C] font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Khyber Pakhtunkhwa (3)
            </button>
            <button
              onClick={() => setRegionFilter('gb')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                regionFilter === 'gb'
                  ? 'bg-white text-[#0F382C] font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Gilgit-Baltistan (2)
            </button>
          </div>
        </div>

        {/* Interactive Destination Cards Deck (Hover to Spotlight on Map) */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-2.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-neutral-400">
              Interactive Destination Cards (Hover to Highlight on Map):
            </span>
            <span className="hidden sm:inline text-[11px]">
              Active focus: <strong className="text-[#0F382C]">{activeCluster.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CLUSTERS.map((cluster) => {
              const isHovered = activeHoveredId === cluster.id;
              const isSelected = selectedClusterId === cluster.id;
              const isHighlighted = highlightedId === cluster.id;

              return (
                <div
                  key={cluster.id}
                  onMouseEnter={() => setInternalHoveredId(cluster.id)}
                  onMouseLeave={() => setInternalHoveredId(null)}
                  onClick={() => setSelectedClusterId(cluster.id)}
                  className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isHighlighted
                      ? 'bg-white border-[#0F382C] shadow-md ring-2 ring-[#0F382C]/30 scale-[1.02]'
                      : 'bg-white/70 border-neutral-200 hover:bg-white hover:border-neutral-300'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all"
                    style={{
                      backgroundColor: isHighlighted ? cluster.accentColor : 'transparent'
                    }}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {cluster.region.includes('Khyber') ? 'KP' : 'GB'}
                      </span>
                      <span className="font-nastaliq text-xs text-[#0F382C] font-semibold">
                        {cluster.urduName}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-neutral-900 truncate">
                      {cluster.name}
                    </div>

                    <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {cluster.mountainRange.split(' ')[0]} {cluster.mountainRange.split(' ')[1]}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="tabular-nums font-medium">{cluster.altitude.split(' ')[0]}</span>
                    <span
                      className={`font-semibold transition-colors ${
                        isHighlighted ? 'text-[#0F382C]' : 'text-neutral-400'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : 'Hover / Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Map + Cluster Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Stylized Interactive SVG Relief Map (7 Cols) */}
          <div className="lg:col-span-7 bg-[#151D1A] rounded-3xl p-4 sm:p-6 shadow-xl border border-neutral-800 text-white relative overflow-hidden min-h-[500px] flex flex-col justify-between">
            {/* Top Map Controls Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E28413] animate-pulse" />
                <span className="font-semibold text-neutral-200">Interactive Topographic Canvas</span>
                {activeHoveredId && (
                  <span className="text-[11px] font-bold text-[#FEF3C7] bg-[#0F382C] px-2 py-0.5 rounded-full border border-white/10 animate-in fade-in">
                    Spotlight: {activeCluster.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={showPeaks}
                    onChange={(e) => setShowPeaks(e.target.checked)}
                    className="rounded text-[#0F382C] accent-[#E28413]"
                  />
                  <span>Show Peaks</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={showCorridors}
                    onChange={(e) => setShowCorridors(e.target.checked)}
                    className="rounded text-[#0F382C] accent-[#E28413]"
                  />
                  <span>Highways & Routes</span>
                </label>
              </div>
            </div>

            {/* Stylized SVG Map Graphics Container */}
            <div className="relative w-full aspect-[4/3] my-auto">
              <svg
                viewBox="0 0 1000 750"
                className="w-full h-full select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Lines & Gradients */}
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#1B332A" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#151D1A" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0E1412" stopOpacity="1" />
                  </radialGradient>
                  <linearGradient id="swatRiver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="indusRiver" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="spotlightGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <rect width="1000" height="750" fill="url(#mapGlow)" rx="16" />

                {/* Latitude & Longitude Subtle Coordinates */}
                <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
                  <line x1="50" y1="180" x2="950" y2="180" />
                  <line x1="50" y1="360" x2="950" y2="360" />
                  <line x1="50" y1="540" x2="950" y2="540" />
                  <line x1="250" y1="50" x2="250" y2="700" />
                  <line x1="500" y1="50" x2="500" y2="700" />
                  <line x1="750" y1="50" x2="750" y2="700" />
                </g>

                {/* Mountain Range Relief Shading / Topography Silhouettes */}
                {/* Hindu Kush Topography */}
                <path
                  d="M120 180 Q220 280 320 260 T480 320 Q380 480 260 520 T100 460 Z"
                  fill="#1C2E26"
                  opacity={highlightedId === 'chitral' || highlightedId === 'swat' || highlightedId === 'kalam' ? "0.8" : "0.5"}
                  className="transition-opacity duration-300"
                />
                {/* Karakoram Topography */}
                <path
                  d="M480 120 Q620 90 780 140 T920 280 Q840 400 700 360 T480 280 Z"
                  fill="#1E332B"
                  opacity={highlightedId === 'hunza' || highlightedId === 'skardu' ? "0.85" : "0.55"}
                  className="transition-opacity duration-300"
                />
                {/* Himalayas & Deosai Plateau */}
                <path
                  d="M620 420 Q760 380 900 440 T860 620 Q720 660 600 580 Z"
                  fill="#213B31"
                  opacity={highlightedId === 'skardu' ? "0.8" : "0.45"}
                  className="transition-opacity duration-300"
                />

                {/* River Pathways */}
                {/* Swat River (from Kalam down through Swat Valley to Kabul River) */}
                <path
                  d="M380 290 Q360 350 350 410 T330 520 Q310 590 280 660"
                  stroke="url(#swatRiver)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />
                {/* Indus River (flows through Baltistan/Skardu down past Chilas and Besham) */}
                <path
                  d="M940 320 Q820 330 760 380 T660 480 Q560 520 490 600 T440 720"
                  stroke="url(#indusRiver)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Hunza River tributary into Gilgit */}
                <path
                  d="M670 160 Q650 220 620 290 T540 380"
                  stroke="#38BDF8"
                  strokeOpacity="0.6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Mountain Highway Routes & Corridors */}
                {showCorridors && (
                  <g>
                    {/* M-16 Swat Expressway */}
                    <path
                      d="M420 680 Q380 610 350 550"
                      stroke={highlightedId === 'swat' || highlightedId === 'kalam' ? '#F59E0B' : '#E28413'}
                      strokeWidth={highlightedId === 'swat' || highlightedId === 'kalam' ? '5' : '3'}
                      strokeDasharray={highlightedId === 'swat' || highlightedId === 'kalam' ? '8 4' : '6 3'}
                      className="transition-all duration-300"
                    />
                    <text x="390" y="620" fill="#FEF3C7" fontSize="13" fontWeight="600" opacity="0.8">
                      M-16 Swat Motorway
                    </text>

                    {/* Lowari Tunnel to Chitral */}
                    <path
                      d="M350 550 Q280 440 240 320"
                      stroke={highlightedId === 'chitral' ? '#F59E0B' : '#E28413'}
                      strokeWidth={highlightedId === 'chitral' ? '5' : '2.5'}
                      strokeDasharray={highlightedId === 'chitral' ? '8 4' : '5 3'}
                      className="transition-all duration-300"
                    />
                    <text x="180" y="420" fill="#FEF3C7" fontSize="13" fontWeight="600" opacity="0.8">
                      Lowari Tunnel Pass
                    </text>

                    {/* N-35 Karakoram Highway (KKH) */}
                    <path
                      d="M420 680 Q520 520 620 360 T670 220"
                      stroke={highlightedId === 'hunza' ? '#F59E0B' : '#E28413'}
                      strokeWidth={highlightedId === 'hunza' ? '5' : '3.5'}
                      strokeDasharray={highlightedId === 'hunza' ? '8 4' : '6 3'}
                      className="transition-all duration-300"
                    />
                    <text x="590" y="470" fill="#FEF3C7" fontSize="13" fontWeight="600" opacity="0.8">
                      N-35 Karakoram Highway
                    </text>

                    {/* Skardu Strategic All-Weather Road */}
                    <path
                      d="M620 360 Q710 380 820 330"
                      stroke={highlightedId === 'skardu' ? '#F59E0B' : '#E28413'}
                      strokeWidth={highlightedId === 'skardu' ? '5' : '2.5'}
                      strokeDasharray={highlightedId === 'skardu' ? '8 4' : '4 3'}
                      className="transition-all duration-300"
                    />
                    <text x="690" y="340" fill="#FEF3C7" fontSize="12" fontWeight="600" opacity="0.8">
                      Jaglot-Skardu Road
                    </text>
                  </g>
                )}

                {/* Mountain Peak Markers */}
                {showPeaks && (
                  <g fontSize="12" fontWeight="600" fill="#A7F3D0" opacity="0.85">
                    {/* Tirich Mir (Hindu Kush) */}
                    <path d="M190 200 L200 180 L210 200 Z" fill="#ffffff" />
                    <text x="215" y="195">Tirich Mir 7,708m</text>

                    {/* Falak Sar (Swat/Kalam) */}
                    <path d="M410 250 L418 234 L426 250 Z" fill="#ffffff" />
                    <text x="430" y="245">Falak Sar 5,918m</text>

                    {/* Rakaposhi (Hunza) */}
                    <path d="M630 180 L640 162 L650 180 Z" fill="#ffffff" />
                    <text x="655" y="175">Rakaposhi 7,788m</text>

                    {/* Nanga Parbat */}
                    <path d="M570 380 L580 360 L590 380 Z" fill="#ffffff" />
                    <text x="595" y="375">Nanga Parbat 8,126m</text>

                    {/* K2 (Karakoram) */}
                    <path d="M880 160 L892 138 L904 160 Z" fill="#ffffff" />
                    <text x="795" y="150">K2 8,611m</text>
                  </g>
                )}

                {/* Gateway Point: Islamabad Capital Transit Hub */}
                <g transform="translate(420, 680)">
                  <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#0F382C" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.2" />
                  <text x="14" y="5" fill="#ffffff" fontSize="14" fontWeight="700">
                    Islamabad (Gateway Hub)
                  </text>
                </g>

                {/* Regional Range Editorial Watermarks */}
                <text x="130" y="120" fill="#ffffff" fontSize="18" fontWeight="800" opacity="0.12" letterSpacing="4">
                  HINDU KUSH RANGE
                </text>
                <text x="560" y="90" fill="#ffffff" fontSize="18" fontWeight="800" opacity="0.12" letterSpacing="4">
                  KARAKORAM RANGE
                </text>
                <text x="660" y="650" fill="#ffffff" fontSize="18" fontWeight="800" opacity="0.12" letterSpacing="4">
                  WESTERN HIMALAYAS
                </text>

                {/* Interactive Cluster Destination Pins */}
                {filteredClusters.map((cluster) => {
                  const isSelected = selectedClusterId === cluster.id;
                  const isHovered = activeHoveredId === cluster.id;
                  const isHighlighted = highlightedId === cluster.id;
                  const isDimmed = activeHoveredId !== null && activeHoveredId !== cluster.id;

                  const cx = cluster.coords.x * 10;
                  const cy = cluster.coords.y * 7.5;

                  return (
                    <g
                      key={cluster.id}
                      className="cursor-pointer transition-all duration-300"
                      opacity={isDimmed ? 0.35 : 1}
                      onClick={() => setSelectedClusterId(cluster.id)}
                      onMouseEnter={() => setInternalHoveredId(cluster.id)}
                      onMouseLeave={() => setInternalHoveredId(null)}
                    >
                      {/* Active Spotlight Radar Halo */}
                      {isHighlighted && (
                        <>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="36"
                            fill={cluster.accentColor}
                            opacity="0.2"
                            className="animate-ping"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r="24"
                            fill={cluster.accentColor}
                            opacity="0.3"
                          />
                        </>
                      )}

                      {/* Ambient ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHighlighted ? 18 : 12}
                        fill={cluster.accentColor}
                        opacity={isHighlighted ? 0.5 : 0.3}
                        className="transition-all duration-200"
                      />

                      {/* Main Node Pin */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHighlighted ? 10 : 8}
                        fill={isHighlighted ? '#FEF3C7' : '#ffffff'}
                        stroke={cluster.accentColor}
                        strokeWidth={isHighlighted ? '4' : '3'}
                        className="transition-all duration-200 shadow-lg"
                      />

                      {/* Cluster Label Pill or Expanded Spotlight Callout */}
                      {isHighlighted ? (
                        // Expanded Spotlight Callout Card (shown on hover/select)
                        <g transform={`translate(${cx}, ${cy - 52})`} className="animate-in fade-in duration-200">
                          {/* Card Frame */}
                          <rect
                            x="-85"
                            y="-28"
                            width="170"
                            height="48"
                            rx="10"
                            fill="#0F382C"
                            stroke="#E28413"
                            strokeWidth="2"
                            filter="url(#spotlightGlow)"
                          />
                          {/* Triangular pointer */}
                          <polygon
                            points="-6,20 6,20 0,26"
                            fill="#0F382C"
                            stroke="#E28413"
                            strokeWidth="1"
                          />

                          {/* Title */}
                          <text
                            x="0"
                            y="-11"
                            fill="#ffffff"
                            fontSize="12"
                            fontWeight="800"
                            textAnchor="middle"
                          >
                            {cluster.name}
                          </text>

                          {/* Subtitle / Altitude */}
                          <text
                            x="0"
                            y="4"
                            fill="#FEF3C7"
                            fontSize="10"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {cluster.altitude} · {cluster.region.includes('Khyber') ? 'KP' : 'GB'}
                          </text>

                          <text
                            x="0"
                            y="15"
                            fill="#A7F3D0"
                            fontSize="9"
                            fontWeight="500"
                            textAnchor="middle"
                          >
                            {cluster.transitFromIslamabad.drive.split('(')[0]}
                          </text>
                        </g>
                      ) : (
                        // Quiet unboxed label
                        <g transform={`translate(${cx}, ${cy - 20})`}>
                          <rect
                            x="-55"
                            y="-14"
                            width="110"
                            height="20"
                            rx="5"
                            fill="#1E2522"
                            stroke="#334155"
                            strokeWidth="1"
                            opacity="0.85"
                          />
                          <text
                            x="0"
                            y="-1"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {cluster.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Map Legend */}
            <div className="relative z-10 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E28413]" />
                  Active Corridor Spotlight
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rotate-45 bg-white inline-block" />
                  High Glacial Peaks
                </span>
              </div>
              <span className="text-neutral-400">
                Hover any card above or click a pin to inspect
              </span>
            </div>
          </div>

          {/* Right: Detailed Geographic Orientation Dossier (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-sm space-y-6">
            {/* Cluster Title Banner */}
            <div className="space-y-1 pb-4 border-b border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E28413] uppercase tracking-wider">
                  {activeCluster.region} · {activeCluster.mountainRange}
                </span>
                <span className="font-nastaliq text-base text-[#0F382C] font-semibold">
                  {activeCluster.urduName}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-neutral-900">
                {activeCluster.name}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {activeCluster.description}
              </p>
            </div>

            {/* Elevation & Mountain Peaks */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="text-[11px] text-neutral-400 font-semibold uppercase flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-[#0F382C]" />
                  Elevation Range
                </div>
                <div className="text-xs font-bold text-neutral-900 mt-1 tabular-nums">
                  {activeCluster.altitude}
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="text-[11px] text-neutral-400 font-semibold uppercase flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#E28413]" />
                  Active Weather
                </div>
                <div className="text-xs font-bold text-neutral-900 mt-1">
                  {matchedDest ? `${matchedDest.weatherSummary.tempC}°C · ${matchedDest.weatherSummary.condition}` : 'Alpine Crisp'}
                </div>
              </div>
            </div>

            {/* Transit & Highway Access */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Transit from Islamabad / Gateway:
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-neutral-800">
                  <Car className="w-4 h-4 text-[#0F382C]" />
                  <span>Road Route: {activeCluster.transitFromIslamabad.drive}</span>
                </div>
                <div className="text-[11px] text-neutral-500 pl-6 leading-snug">
                  {activeCluster.transitFromIslamabad.route}
                </div>

                {activeCluster.transitFromIslamabad.flight && (
                  <div className="flex items-center gap-2 font-semibold text-neutral-800 pt-1 border-t border-neutral-200">
                    <Plane className="w-4 h-4 text-[#E28413]" />
                    <span>Flight: {activeCluster.transitFromIslamabad.flight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Prominent High Peaks */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Prominent Mountain Peaks:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCluster.prominentPeaks.map((peak, idx) => (
                  <span
                    key={idx}
                    className="bg-[#EBF3EF] text-[#0F382C] px-2.5 py-1 rounded-lg text-xs font-semibold"
                  >
                    {peak}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Providers & Stays in this cluster */}
            {matchedDest && (
              <div className="p-3.5 bg-[#FEF3C7]/40 rounded-xl border border-[#FDE68A] text-xs text-[#78350F] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                  <span>
                    <strong>{matchedDest.verifiedProvidersCount}</strong> verified local hosts active in this cluster
                  </span>
                </div>
                <span className="font-bold tabular-nums">
                  From PKR {matchedDest.startingPricePKR.toLocaleString()}
                </span>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => onBuildTrip(activeCluster.id)}
                className="flex-1 py-3 px-4 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build {activeCluster.name.split(' ')[0]} Trip</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
              </button>

              <button
                onClick={() => onSelectDestination(activeCluster.id)}
                className="py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Region Stories</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

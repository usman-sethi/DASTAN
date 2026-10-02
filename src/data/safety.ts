export interface RoadStatusItem {
  route: string;
  condition: 'open' | 'advisory' | 'restricted';
  note: string;
  lastChecked: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  availability: string;
  notes: string;
}

export const roadStatuses: RoadStatusItem[] = [
  {
    route: 'Swat Motorway (M-16: Colonel Sher Khan to Chakdara)',
    condition: 'open',
    note: 'Clear, 4-lane expressway with smooth traffic flow. Tunnels fully illuminated.',
    lastChecked: 'Updated 20 mins ago (Live Mock)'
  },
  {
    route: 'Mingora to Bahrain & Kalam Artery',
    condition: 'open',
    note: 'Paved highway clear; minor road widening near Madyan with local flagmen.',
    lastChecked: 'Updated 35 mins ago'
  },
  {
    route: 'Kalam to Mahodand & Saifullah Lake Trail',
    condition: 'advisory',
    note: '4x4 high-clearance vehicles mandatory; snowmelt streams active across road bed.',
    lastChecked: 'Updated 1 hour ago'
  },
  {
    route: 'Dir to Chitral via Lowari Tunnel',
    condition: 'open',
    note: 'Lowari Tunnel open 24/7 for all passenger and tourist vehicles.',
    lastChecked: 'Updated 45 mins ago'
  },
  {
    route: 'Karakoram Highway (KKH: Islamabad to Hunza)',
    condition: 'open',
    note: 'All sections unobstructed; smooth transit through Kohistan and Diamer.',
    lastChecked: 'Updated 25 mins ago'
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    service: 'KPK Tourism Police Helpline',
    number: '1422',
    availability: '24/7 Dedicated Multilingual Support',
    notes: 'Tourist escorts, roadside assistance, travel clearances in KP.'
  },
  {
    service: 'Emergency Rescue Service',
    number: '1122',
    availability: '24/7 Rapid Ambulance & Mountain Rescue',
    notes: 'Active stations in Mingora, Saidu Sharif, Madyan, Kalam & Chitral.'
  },
  {
    service: 'National Highway & Motorway Police (NHMP)',
    number: '130',
    availability: '24/7 Patrol & Road Safety',
    notes: 'Coverage on M-16 Swat Expressway and major national highways.'
  },
  {
    service: 'DASTAN Community Traveler SOS Desk',
    number: '+92 (946) 728-100',
    availability: '24/7 Direct Concierge for In-Journey Travelers',
    notes: 'Connects directly to verified local host and logistics coordinator.'
  }
];

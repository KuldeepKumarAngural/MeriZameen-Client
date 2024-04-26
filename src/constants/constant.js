export const SESSION_KEYS = {
  TOKEN: 'TOKEN',
  EXPIRY: 'EXPIRY',
  FACILITY: 'FACILITY',
  USER:'USER'
}

export const medium = [
  { value: 'Sell', label: 'Sell' },
  { value: 'Rent', label: 'Rent' },
];

export const state = ['Punjab', 'Himachal'];

export const propertyTypes = [
  { value: '1Bhk', label: '1Bhk' },
  { value: '2Bhk', label: '2Bhk' },
  { value: '3Bhk', label: '3Bhk' },
  { value: '3+Bhk', label: '3+Bhk' },
  { value: 'Pg', label: 'Pg' },
  { value: 'Plot', label: 'Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Residential', label: 'Residential' },
];

export const amenities = [
  { name: 'carParking', label: 'Car parking' },
  { name: 'maintenance', label: 'Maintenance' },
  { name: 'vastuCompliant', label: 'Vastu compliant' },
  { name: 'powerBackup', label: 'Pawer Backup' },
  { name: 'park', label: 'Park' },
  { name: 'gym', label: 'Gym' },
  { name: 'clubHouse', label: 'Club House' },
];

export const landMarks = [
  { name: 'hospital', label: 'Hospital', erroMessage: '' },
  { name: 'atm', label: 'Atm', erroMessage: '' },
  { name: 'bank', label: 'Bank', erroMessage: '' },
  { name: 'railway', label: 'Railway-Station', erroMessage: '' },
  { name: 'metro', label: 'Metro-Station', erroMessage: '' },
  { name: 'airport', label: 'Airport', erroMessage: '' },
];

export const basicInfo = [
  { name: 'bedRoom', label: 'Bedroom' },
  { name: 'bathRoom', label: 'Bathroom' },
  { name: 'totalArea', label: `Total Area in \u00B2 Yards` },
  { name: 'carpetArea', label: `Carpet Area in \u00B2 Yards` },
  { name: 'propertyAge', label: `Age of Property in Years` },
];

export const pages = ['Products', 'Pricing', 'Blog'];

export const userSettings = [
  'Profile', 'Account', 'Dashboard', 'Logout'
];

export const options = [
  { value: 'Agent', label: 'Agent' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Individual', label: 'Individual' },
  { value: 'Other', label: 'Other' },
];

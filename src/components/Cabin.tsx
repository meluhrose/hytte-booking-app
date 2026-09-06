import { useState, useEffect } from 'react';
import { useApiConfig } from '../context/ApiConfigContext';

// Interface representing a single cabin
interface Cabin {
  id: number;
  name: string;
  region: string;
  pricePerNight: number;
}

// Mock cabin data used to simulate an API response
const mockCabins: Cabin[] = [
  { id: 1, name: 'Fjellro', region: 'Fjellheimen', pricePerNight: 1200 },
  { id: 2, name: 'Bølgeskvulp', region: 'Kysten', pricePerNight: 1500 },
  { id: 3, name: 'Granstua', region: 'Skogen', pricePerNight: 900 },
  { id: 4, name: 'Utsikten', region: 'Fjellheimen', pricePerNight: 1350 },
  { id: 5, name: 'Havbris', region: 'Kysten', pricePerNight: 1600 },
];

// All distinct regions derived from mock data, plus "Alle" option
const regions = ['Alle', 'Fjellheimen', 'Kysten', 'Skogen'];

export function CabinList() {
  const { baseUrl } = useApiConfig();

  // Typed state for cabins, loading, error, and region filter
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Simulate fetching cabin data on mount
  useEffect(() => {
    console.log('API base URL from context:', baseUrl);

    const timer = setTimeout(() => {
      setCabins(mockCabins);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [baseUrl]);

  // Filter cabins by selected region, or show all if none selected
  const displayedCabins =
    selectedRegion && selectedRegion !== 'Alle'
      ? cabins.filter((c) => c.region === selectedRegion)
      : cabins;

  if (loading) return <p>Laster hytter...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <h2>Tilgjengelige Hytter</h2>

      {/* Region filter dropdown */}
      <label htmlFor="region-select">Filtrer etter region: </label>
      <select
        id="region-select"
        value={selectedRegion ?? 'Alle'}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedRegion(e.target.value === 'Alle' ? null : e.target.value)
        }
        style={{ marginBottom: '16px' }}
      >
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Cabin list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {displayedCabins.map((cabin) => (
          <li
            key={cabin.id}
            style={{
              border: '2px solid #353533',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '8px',
            }}
          >
            <strong>{cabin.name}</strong> — {cabin.region} —{' '}
            {cabin.pricePerNight} kr/natt
          </li>
        ))}
      </ul>

      {displayedCabins.length === 0 && <p>Ingen hytter funnet for denne regionen.</p>}
    </div>
  );
}
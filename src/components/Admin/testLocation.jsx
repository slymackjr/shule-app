import React, { useEffect, useState } from 'react';

const YourComponent = () => {
    const [regions, setRegions] = useState([]); 
    const [districts, setDistricts] = useState([]); 
    const [wards, setWards] = useState([]); 
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        fetch('/GeoData/Regions.json')
            .then((response) => response.json())
            .then((data) => {
                if (data.features && Array.isArray(data.features)) {
                    const regionList = data.features.map((feature) => ({
                        id: feature.properties.region, // Assuming region names are unique identifiers
                        name: feature.properties.region
                    }));
                    setRegions(regionList);
                    
                } else {
                    console.error('Invalid data format for regions:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching regions:', error);
            });
    }, []);

    const handleRegionChange = (e) => {
        const selectedRegionId = e.target.value;
        setSelectedRegion(selectedRegionId);
        setDistricts([]); // Clear districts on region change
        setWards([]); // Clear wards on region change
    
        // Append " Region" to match the Districts.json format
        const regionWithSuffix = `${selectedRegionId} Region`;
    
        fetch('/GeoData/Districts.json')
            .then((response) => response.json())
            .then((data) => {
                if (data.features && Array.isArray(data.features)) {
                    const filteredDistricts = data.features
                        .filter(feature => feature.properties.region === regionWithSuffix) // Match by region
                        .map(feature => ({
                            id: feature.properties.District, // Use District as the id
                            name: feature.properties.District
                        }));
    
                    console.log('Filtered Districts:', filteredDistricts); // Debugging output
                    setDistricts(filteredDistricts);
                } else {
                    console.error('Invalid data format for districts:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    };
    
    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setSelectedDistrict(selectedDistrictId);
    
        fetch('/GeoData/Wards.json')
            .then((response) => response.json())
            .then((data) => {
                if (data.features && Array.isArray(data.features)) {
                    const filteredWards = data.features
                        .filter(feature => feature.properties.District === selectedDistrictId) // Match directly
                        .map(feature => ({
                            id: feature.properties.Ward,
                            name: feature.properties.Ward
                        }));
    
                    console.log('Filtered Wards:', filteredWards); // Debugging output
                    setWards(filteredWards);
                } else {
                    console.error('Invalid data format for wards:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching wards:', error);
            });
    };
    
    
    return (
        <div>
            <select onChange={handleRegionChange}>
                <option value="">Select a Region</option>
                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                        {region.name}
                    </option>
                ))}
            </select>

            <select onChange={handleDistrictChange} disabled={!districts.length}>
                <option value="">Select a District</option>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>

            <select disabled={!wards.length}>
                <option value="">Select a Ward</option>
                {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                        {ward.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YourComponent;

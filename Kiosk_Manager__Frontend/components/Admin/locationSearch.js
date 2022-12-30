import React, { PureComponent, useState, useEffect, ScrollView } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


function LocationSearch() {

    const [gAddress, setgAddress] = useState('')
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);

        const ll = await getLatLng(results[0])
        console.log(ll)
        setgAddress(value)
        setCoordinates(ll)
    }

    


return (
    <div className ='locationSearch'> 
    <PlacesAutocomplete
        value={gAddress}
        onChange={setgAddress}
        onSelect={handleSelect}
    >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div key={suggestions.description }>
                Location Address
                <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        </PlacesAutocomplete>
    </div>

);
};
export default LocationSearch
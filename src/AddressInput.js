import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

const AddressInput = (props) => {
  const API_KEY = `14CraLu2VcHf-xDpHsvbQEnQovHbizw4PjHep-Xb21o`;
  const [address, setAddress] = useState('');
  const handleChange = debounce((address) => {
    setAddress(address);
  }, 800);

  useEffect(() => {  
    return () => {
      handleChange.cancel();
    }
  }, [])

  useEffect(async () => {
    if(address !== ""){
      try {
        const response = await fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${API_KEY}&query=${address}`);
        const json = await response.json();
        if(json.suggestions){
          locationQuerySearchResults(json.suggestions, address);
        }  
      } catch (e) {
        console.log(e);
      }
    }
  }, [address]);


  const locationQuerySearchResults = (results, address) => {
    document.getElementById('dropDownResults').innerHTML = '';
    results.forEach(element => {
      if(address!== element.label){
        document.getElementById('dropDownResults').insertAdjacentHTML('beforeend', `
        <option value="${element.label}"></option>`)
      } else {
        props.onSelectInfo(element.address.postalCode, element.address.city, element.address.state,  element.address.country, address);
      }
    });
  }

  return(
    <>
      <input type="text" className="form-control" name="address" placeholder={props.address || "Address"} onChange={e => handleChange(e.target.value)} list="dropDownResults"/>
      <datalist id="dropDownResults"></datalist>
    </>
  ) 
}

export default AddressInput;








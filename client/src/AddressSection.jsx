import React, { useState } from 'react';
import './AddressSection.css'; 

function AddressSection () {
  const [formData, setFormData] = useState({
    streetNumber: '',
    streetAddress: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className='address-form-container'>
      <div></div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='streetNumber'>Street Number</label>
          <input
            type='text'
            id='streetNumber'
            name='streetNumber'
            value={formData.streetNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='streetAddress'>Street Address</label>
          <input
            type='text'
            id='streetAddress'
            name='streetAddress'
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='city'>City Name</label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='zip'>ZIP Code</label>
          <input
            type='text'
            id='zip'
            name='zip'
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default AddressSection;

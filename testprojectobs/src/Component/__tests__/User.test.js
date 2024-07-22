// import React from "react";
// import User from "../User";
import {handlePhoneChange} from "../User";

describe('handlePhoneChange', () => {
  it('should update the phone number when a valid number is entered', () => {
    const setPhoneMock = jest.fn();
    const event = { target: { value: '1234567890' } };
    
    handlePhoneChange(event, setPhoneMock);
    
    expect(setPhoneMock).toHaveBeenCalledWith('1234567890');
  });

  it('should not update the phone number when an invalid number is entered', () => {
    const setPhoneMock = jest.fn();
    const event = { target: { value: '1234abc' } };
    
    handlePhoneChange(event, setPhoneMock);
    
    expect(setPhoneMock).not.toHaveBeenCalled();
  });

  it('should not update the phone number when the number exceeds 12 digits', () => {
    const setPhoneMock = jest.fn();
    const event = { target: { value: '1234567890123' } };
    
    handlePhoneChange(event, setPhoneMock);
    
    expect(setPhoneMock).not.toHaveBeenCalled();
  });
});
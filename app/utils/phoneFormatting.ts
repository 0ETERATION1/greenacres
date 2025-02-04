export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '').substring(0, 10);
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>, 
  setPhone: (value: string) => void
) => {
  const formattedNumber = formatPhoneNumber(e.target.value);
  setPhone(formattedNumber);
}; 
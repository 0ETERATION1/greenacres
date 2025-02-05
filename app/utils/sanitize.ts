export function sanitizeInput(input: string): string {
  // Allow letters, numbers, all whitespace characters, and basic punctuation
  return input.replace(/[^a-zA-Z0-9\s\n\r.,!?-]/g, '');
}

// Add new function for email sanitization
export function sanitizeEmail(email: string): string {
  // Remove all whitespace characters
  return email.replace(/\s/g, '');
}

export function handleDetailsChange(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setDetails: (value: string) => void,
  maxLength: number = MAX_DETAILS_LENGTH
) {
  const sanitizedValue = sanitizeInput(e.target.value);
  if (sanitizedValue.length <= maxLength) {
    setDetails(sanitizedValue);
  }
}

// Add new function for email change handling
export function handleEmailChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: (value: string) => void
) {
  const sanitizedValue = sanitizeEmail(e.target.value);
  setEmail(sanitizedValue);
}

export function getCharacterCountText(
  currentLength: number,
  maxLength: number = MAX_DETAILS_LENGTH
): string {
  return `${currentLength}/${maxLength} characters`;
}

export const MAX_DETAILS_LENGTH = 2000; 
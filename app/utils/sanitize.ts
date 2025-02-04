export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"`;]/g, '') // Remove dangerous characters
    .trim();
};

export const MAX_DETAILS_LENGTH = 2000; // Centralized character limit

export const handleDetailsChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setDetails: (value: string) => void
) => {
  const text = e.target.value;
  if (text.length <= MAX_DETAILS_LENGTH) {
    setDetails(sanitizeInput(text));
  }
};

// Helper for character count display
export const getCharacterCountText = (currentLength: number) => 
  `(${currentLength}/${MAX_DETAILS_LENGTH} characters)`; 
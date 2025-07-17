// Mock for image utilities
export const uploadImage = async (file: File): Promise<string> => {
  // Return a mock URL for the uploaded image
  return `https://via.placeholder.com/400x300/6366F1/FFFFFF?text=${encodeURIComponent(file.name)}`
}

// Mock for router
export const mockRouter = {
  push: (to: string) => console.log('Navigate to:', to),
  replace: (to: string) => console.log('Replace with:', to),
  currentRoute: { value: { path: '/', params: {}, query: {} } }
}
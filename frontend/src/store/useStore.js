import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  assets: [],
  
  // Update the user session
  setUser: (user) => set({ user }),
  
  // Update the asset list globally
  setAssets: (assets) => set({ assets }),
  
  // Add a new asset to the list without re-fetching
  addAsset: (asset) => set((state) => ({ 
    assets: [...state.assets, asset] 
  })),
}));
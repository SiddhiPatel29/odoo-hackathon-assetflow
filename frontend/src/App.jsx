import { useState, useEffect } from 'react' // 1. Added useEffect
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 2. Import your Store and API
import { useStore } from './store/useStore'
import { fetchAssets } from './services/api'

function App() {
  const [count, setCount] = useState(0)
  
  // 3. Connect to your store
  const { assets, setAssets } = useStore()

  // 4. Fetch data when the app starts
  useEffect(() => {
    fetchAssets()
      .then((data) => {
        setAssets(data)
        console.log("Assets fetched successfully:", data)
      })
      .catch((err) => console.error("Error fetching assets:", err))
  }, [setAssets])

  return (
    <>
      <section id="center">
        {/* ... (Keep your existing hero images) ... */}
        <div>
          <h1>AssetFlow Dashboard</h1>
          {/* 5. Display count of assets to prove connection works */}
          <p>Total Assets in System: {assets.length}</p> 
        </div>
        
        {/* ... (Keep your counter button) ... */}
      </section>

      {/* ... (Keep the rest of your JSX) ... */}
    </>
  )
}

export default App
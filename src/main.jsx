import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import CollectionPage from './CollectionPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CollectionPage />
  </StrictMode>,
)

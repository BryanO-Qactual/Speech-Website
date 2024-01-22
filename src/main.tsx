import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { MainContextProvider } from './context/MainContext.tsx'
import { SaveContextProvider } from './context/SaveContext.tsx'

render(
    <SaveContextProvider>
        <MainContextProvider>
            <App />
        </MainContextProvider>
    </SaveContextProvider>
, document.getElementById('app')!)

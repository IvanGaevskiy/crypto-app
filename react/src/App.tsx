import { createRoot } from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router'

import './App.css'
import { MainLayout } from './MainLayout'
import { NotFoundPage } from './components/NotFoundPage'
import { CompletedTransactionPage } from './pages/completed-transaction/CompletedTransactionPage'
import { ExchangePage } from './pages/exchange/ExchangePage'

createRoot(document.getElementById('root')!).render(
  <div className="flex min-h-[100dvh] w-full items-center justify-center">
    <img className="absolute h-full w-full" src="./src/assets/body.svg"></img>
    <div className="relative z-10">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<ExchangePage />} />
            <Route path="/completed_transaction" element={<CompletedTransactionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
)

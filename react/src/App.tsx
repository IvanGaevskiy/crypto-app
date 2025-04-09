import { createRoot } from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router'

import './App.css'
import { MainLayout } from './MainLayout'
import { NotFoundPage } from './components/NotFoundPage'
import { CompletedTransactionPage } from './pages/completed-transaction/CompletedTransactionPage'
import { ExchangePage } from './pages/exchange/ExchangePage'

createRoot(document.getElementById('root')!).render(
  // <div className="flex min-h-[100dvh] w-full items-center justify-center">
  //   <img className="absolute h-full w-full" src="./src/assets/space.svg"></img>
  <div className="flex min-h-[100dvh] w-full items-center justify-center">
    <div className="absolute top-0 z-0 h-[120%] w-full overflow-hidden ">
      <img
        className="absolute block h-auto w-full bottom-1/12 transform [-translate-x:50%] [translate-y:16%]"
        src="./src/assets/space.svg"
      ></img>
      <img
        className="absolute block h-auto w-full bottom-0 transform [-translate-x:50%] [translate-y:16%]"
        src="./src/assets/planets.svg"
      ></img>
    </div>
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

import './app.css'
import OpenHeart from './components/OpenHeart/OpenHeart'
import TransactionOfValue from './components/TransactionOfValue/TransactionOfValue'
import Intro from "./components/Intro/Intro"
import HeadContent from './components/HeadContent/HeadContent'
import HeadContent1 from './components/HeadContent1/HeadContent1'
import HeadContent2 from './components/HeadContent2/HeadContent2'
import HeadContent3 from './components/HeadContent3/HeadContent3'
import CallToAction from './components/CallToAction/CallToAction.tsx'
import ClosingHeart from './components/ClosingHeart/ClosingHeart.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'

export function App() {
  return (
    <>
      <Sidebar/>
      <Intro/>
      <OpenHeart/>
      <TransactionOfValue/>
      <HeadContent/>
      <HeadContent1/>
      <HeadContent2/>
      <HeadContent3/>
      <CallToAction/>
      <ClosingHeart/>
    </>
  )
}

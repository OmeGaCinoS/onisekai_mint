import wholeBg from "./assets/images/whole_bg.png"
import Header from "./components/Header"
import Hero from "./components/Hero"
import arrow from "./assets/images/arrow.png"
import Mint from "./components/Mint"
import CharacterWrapper from "./components/CharacterWrapper"
import Footer from "./components/Footer"

// Rainbow kit setup
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function App() {

  const { chains, provider } = configureChains(
    [mainnet, goerli],
    [
      // alchemyProvider({ apiKey: ALCHEMY_ID }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })



  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}
        theme={darkTheme({
          accentColor: '#767674CC',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
          fonts: 'freeSansBold'
          // connectButtonBackground: "#767674CC",
          // accentColorForeground: "#767674CC",
          // connectButtonInnerBackground: "#767674CC",
          // menuItemBackground: "#767674CC",
          // profileAction: "#767674CC"
        })}>

        <div className="overflow-hidden">
          {/* <div className="apply-bg fixed inset-0">
        <img
          src={wholeBg}
          alt="background"
          className="fixed-bg h-full w-full bg-fixed object-cover transition-all duration-500 sm:h-auto sm:object-contain"
        />
      </div> */}
          <div className="relative z-10 text-white">
            <Header />
            <Hero />
            <div className="mx-auto hidden w-full lg:block">
              <img
                src={arrow}
                alt="arrow"
                className="mx-auto block animate-bounce"
              />
            </div>
            <Mint />
            <CharacterWrapper />
            <Footer />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App

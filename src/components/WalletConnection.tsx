import { Wallet, CheckCircle2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { WalletProvider } from "@/types";
import { useWallet } from "@/contexts/WalletContext";
import { useEffect, useRef } from "react";
import yoursLogo from "../assets/yours-logo.png";

interface WalletConnectionProps {
  enabledWallets?: WalletProvider[];
  onConnect?: (address: string, provider: WalletProvider) => void;
  onDisconnect?: () => void;
}

export function WalletConnection({
  enabledWallets = ["rainbowkit", "yours"],
  onConnect,
  onDisconnect,
}: WalletConnectionProps) {
  const { isConnected, address, provider, disconnect, connectYours } =
    useWallet();

  // Track if we've already called onConnect for this connection
  const hasCalledOnConnect = useRef(false);

  // Watch for wallet connections and call onConnect callback
  useEffect(() => {
    if (isConnected && address && provider && !hasCalledOnConnect.current) {
      onConnect?.(address, provider);
      hasCalledOnConnect.current = true;
    } else if (!isConnected && hasCalledOnConnect.current) {
      // Reset flag when wallet disconnects
      hasCalledOnConnect.current = false;
    }
  }, [isConnected, address, provider, onConnect]);

  const handleYoursConnect = async () => {
    try {
      await connectYours();
      if (address) {
        onConnect?.(address, "yours");
      }
    } catch (error) {
      alert(
        "Failed to connect Yours Wallet. Please make sure the extension is installed."
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onDisconnect?.();
    } catch (error) {
      // Silently handle disconnect errors
    }
  };

  // Show connected state
  if (isConnected && address) {
    return (
      <div className="border rounded-lg p-4 space-y-3 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Wallet Connected</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-mono text-sm text-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              via {provider}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  // Show wallet options
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="h-5 w-5 text-foreground" />
        <h3 className="font-semibold text-foreground">Connect Wallet</h3>
      </div>

      <div className="space-y-2">
        {/* RainbowKit/WalletConnect (Web3 wallets) */}
        {(enabledWallets.includes("rainbowkit") ||
          enabledWallets.includes("walletconnect")) && (
          <div className="w-full">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                const connected = mounted && account && chain;

                return (
                  <div
                    {...(!mounted && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button
                            onClick={openConnectModal}
                            variant="outline"
                            className="w-full justify-start text-foreground"
                          >
                            <img
                              src="https://avatars.githubusercontent.com/u/48327834?s=200&v=4"
                              alt="Web3 Wallets"
                              className="w-6 h-6 mr-2 rounded"
                            />
                            Connect Web3 Wallet
                          </Button>
                        );
                      }

                      return null;
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        )}

        {/* Yours Wallet (BSV) */}
        {enabledWallets.includes("yours") && (
          <Button
            onClick={handleYoursConnect}
            variant="outline"
            className="w-full justify-start text-foreground"
          >
            <div className="w-6 h-6 mr-2 bg-black rounded flex items-center justify-center p-0.5">
              <img
                src={yoursLogo}
                alt="Yours Wallet"
                className="w-full h-full object-contain"
              />
            </div>
            Connect Yours Wallet
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Your wallet will be used to complete the payment securely
      </p>
    </div>
  );
}

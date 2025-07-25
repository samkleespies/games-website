'use client'

import { useEffect, useRef, useState, forwardRef } from 'react'

interface GameIframeProps {
  src: string
  title: string
  className?: string
  onLoad?: () => void
}

const GameIframe = forwardRef<HTMLIFrameElement, GameIframeProps>(
  ({ src, title, className = '', onLoad }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Use forwarded ref or internal ref
    const iframe = (ref as React.RefObject<HTMLIFrameElement>) || iframeRef



    useEffect(() => {
      const iframeElement = iframe.current
      if (!iframeElement) return

      const handleIframeLoad = () => {
        onLoad?.()

        // Try to inject mouse capture into the iframe content
        try {
          const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow?.document
          if (iframeDoc) {
            // Inject mouse capture script
            const script = iframeDoc.createElement('script')
            script.textContent = `
              (function() {
                function initMouseCapture() {
                  const canvas = document.getElementById('canvas');
                  if (!canvas) return;

                  // Set cursor style
                  canvas.style.cursor = 'grab';

                  // Click handler for mouse capture
                  canvas.addEventListener('click', function() {
                    if (!document.pointerLockElement) {
                      canvas.requestPointerLock();
                    }
                  });

                  // Pointer lock change handler
                  document.addEventListener('pointerlockchange', function() {
                    if (document.pointerLockElement === canvas) {
                      canvas.style.cursor = 'none';
                    } else {
                      canvas.style.cursor = 'grab';
                    }
                  });
                }

                // Initialize when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initMouseCapture);
                } else {
                  initMouseCapture();
                }

                // Also try after a delay in case the canvas loads later
                setTimeout(initMouseCapture, 1000);
              })();
            `
            iframeDoc.head.appendChild(script)
          }
        } catch (error) {
          // Cross-origin restrictions - this is expected for some games
          console.log('Cross-origin iframe detected, mouse capture will be handled by the game itself')
        }
      }

      iframeElement.addEventListener('load', handleIframeLoad)
      
      return () => {
        iframeElement.removeEventListener('load', handleIframeLoad)
      }
    }, [iframe, onLoad])

    const handleContainerClick = () => {
      // If we can't access iframe content due to cross-origin,
      // try to request pointer lock on the iframe itself
      if (iframe.current && !document.pointerLockElement) {
        try {
          iframe.current.requestPointerLock()
        } catch (error) {
          console.log('Pointer lock not available on iframe')
        }
      }
    }

    return (
      <div className="relative w-full h-full">
        <iframe
          ref={iframe}
          src={src}
          className={`w-full h-full ${className}`}
          title={title}
          allow="fullscreen; gamepad; microphone; camera; pointer-lock"
          allowFullScreen
          onClick={handleContainerClick}
        />
        

      </div>
    )
  }
)

GameIframe.displayName = 'GameIframe'

export default GameIframe

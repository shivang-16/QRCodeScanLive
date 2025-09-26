'use client'

import React, { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'

export default function Home() {
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isScanning, setIsScanning] = useState<boolean>(true)

  const handleScan = (result: any[]) => {
    if (result && result.length > 0) {
      setResult(result[0].rawValue)
      setError('')
      setIsScanning(false)
    }
  }

  const handleError = (error: any) => {
    console.error('QR Scanner Error:', error)
    setError('Error accessing camera or scanning QR code. Please check camera permissions.')
  }

  const handleRescan = () => {
    setResult('')
    setError('')
    setIsScanning(true)
  }

  const formatResult = (text: string) => {
    if (text.startsWith('http://') || text.startsWith('https://')) {
      return { type: 'url', value: text }
    } else if (text.includes('@') && text.includes('.')) {
      return { type: 'email', value: text }
    } else if (/^\d+$/.test(text)) {
      return { type: 'number', value: text }
    } else {
      return { type: 'text', value: text }
    }
  }

  const formattedResult = result ? formatResult(result) : null

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          QR Code Scanner
        </h1>

        {/* Main Content Area */}
        <div className="mb-6">
          {isScanning ? (
            /* Scanner View - Made smaller */
            <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{
                  facingMode: 'environment',
                }}
                formats={['qr_code']}
                scanDelay={500}
                styles={{
                  container: {
                    width: '100%',
                    height: '100%',
                  },
                  video: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                }}
              />
            </div>
          ) : (
            /* Result View - Shows in place of scanner */
            <div className="w-full min-h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6 flex flex-col items-center justify-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 text-center mb-2">
                  QR Code Scanned!
                </h3>
              </div>

              {/* Formatted Result Display */}
              <div className="w-full bg-white rounded-lg border p-4 mb-4">
                <div className="flex items-center mb-2">
                  {formattedResult?.type === 'url' && (
                    <div className="flex items-center text-blue-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="text-sm font-medium">Website URL</span>
                    </div>
                  )}
                  {formattedResult?.type === 'email' && (
                    <div className="flex items-center text-purple-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span className="text-sm font-medium">Email Address</span>
                    </div>
                  )}
                  {formattedResult?.type === 'number' && (
                    <div className="flex items-center text-orange-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="text-sm font-medium">Number</span>
                    </div>
                  )}
                  {formattedResult?.type === 'text' && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="text-sm font-medium">Text</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 break-all font-mono text-sm bg-gray-50 p-2 rounded">
                  {result}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  {formattedResult?.type === 'url' && (
                    <a
                      href={result}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
                    >
                      Open Link
                    </a>
                  )}
                  {formattedResult?.type === 'email' && (
                    <a
                      href={`mailto:${result}`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
                    >
                      Send Email
                    </a>
                  )}
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Rescan Button */}
              <button
                onClick={handleRescan}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Scan Another QR Code
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Instructions - Only show when scanning */}
        {isScanning && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Hold your device steady and point the camera at a QR code
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
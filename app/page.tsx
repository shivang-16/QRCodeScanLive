'use client'

import React, { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'

export default function Home() {
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const handleScan = (result: any[]) => {
    if (result && result.length > 0) {
      setResult(result[0].rawValue)
      setError('')
    }
  }

  const handleError = (error: any) => {
    console.error('QR Scanner Error:', error)
    setError('Error accessing camera or scanning QR code. Please check camera permissions.')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          QR Code Scanner
        </h1>

        {/* Scanner Container */}
        <div className="mb-6">
          <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
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
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Result Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Scan Result:
          </h2>
          {result ? (
            <div className="bg-white border rounded p-3">
              <p className="text-gray-800 break-all">{result}</p>
              {result.startsWith('http') && (
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Open Link
                </a>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Point your camera at a QR code to scan it
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Hold your device steady and point the camera at a QR code
          </p>
        </div>
      </div>
    </div>
  )
}
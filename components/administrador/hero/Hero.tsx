"use client"
import React from 'react'
import Dropzone from 'react-dropzone'

export default function Hero() {
    const [images, setImages] = React.useState<File[]>([])
    return (
        <div className='flex-1 p-4 flex flex-col  '>
            <span className='text-xs text-gray-400'>Hero</span>
            <h2 className='font-bold'>Imagenes del Hero</h2>
            <p className='text-sm'>Gestiona las imagenes que se motraran en el slideshow principal del sitio.</p>

            <Dropzone onDrop={acceptedFiles => setImages(prev => [...prev, ...acceptedFiles])}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className="max-w-2xl w-full mx-auto p-4" {...getRootProps()}>
                            <div
                                className=" border-dashed border-2 border-gray-400 rounded-3xl shadow-sm p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"

                            >
                                <input {...getInputProps()} />
                                {/* Contenedor del Icono Circular */}
                                <div className="flex items-center justify-center h-16 w-16 border rounded-full mb-8">
                                    {/* Icono de Subida (SVG de Heroicons) */}
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                        />
                                    </svg>
                                </div>

                                {/* Textos */}
                                <div className="text-center">
                                    <p className="text-lg font-medium text-gray-200">
                                        Arrastrá imágenes o hacé click para seleccionar
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        PNG, JPG, WEBP - múltiples archivos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div className='overflow-x-auto flex   self-center  gap-2 w-9/12'>
                {images.map((image, index) => (
                    <div key={index} className="mb-4  shrink-0">
                        <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-28  h-auto rounded-lg shadow-md" />
                    </div>
                ))}

            </div>

        </div>

    )
}

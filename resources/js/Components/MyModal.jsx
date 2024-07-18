import React from 'react';
import { __ } from '@/Libs/Lang';

const Modal = ({ isOpen, onClose,onClickFct, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <div className="absolute top-0 right-0 m-4">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-medium mb-4">{__('stgD')}</h3>
                    <p><strong>{__('name')}:</strong> {user.original.name}</p>
                    <p><strong>{__('email')}:</strong> {user.original.email}</p>
                    <p><strong>{__('apogee')}:</strong> {user.original.apogee}</p>
                    <p><strong>{__('intitule')}:</strong> {user.original.intitule}</p>
                    <p><strong>{__('description')}:</strong> {user.original.description}</p>

                </div>
                <div className="mt-8 text-center">
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none">
                        {__('fermerB')}
                    </button>
                    <button onClick={onClickFct} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mx-2 rounded-md focus:outline-none">
                        {__('validerB')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

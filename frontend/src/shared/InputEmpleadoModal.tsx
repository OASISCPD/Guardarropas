import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BaseUrl } from '../logic/api';

interface Empleado {
    legajo: string;
    nombre: string;
    apellido?: string;
    mail?: string;
    contacto_numero?: string;
}

interface ApiResponse {
    success: boolean;
    data: Empleado[];
    total: number;
}

interface InputEmpleadoModalProps {
    value: string;
    onChange: (legajo: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    initialLegajo?: string;
}

export const InputEmpleadoModal: React.FC<InputEmpleadoModalProps> = ({
    value,
    onChange,
    error,
    required = false,
    placeholder = "Buscar empleado...",
    initialLegajo
}) => {
    const [query, setQuery] = useState('');
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
    const debounceRef = useRef<number>();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchEmpleados = async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setEmpleados([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`${BaseUrl}/empleados/search`, {
                params: { legajo: searchQuery },
                withCredentials: true
            });

            if (response.data.success) {
                setEmpleados(response.data.data || []);
            } else {
                setEmpleados([]);
            }
        } catch (error) {
            console.error('Error buscando empleados:', error);
            setEmpleados([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchEmpleadoInicial = async (legajo: string) => {
            if (!legajo) return;

            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`${BaseUrl}/empleados/search`, {
                    params: { legajo },
                    withCredentials: true
                });

                if (response.data.success && response.data.data.length > 0) {
                    const empleado = response.data.data.find(emp => emp.legajo === legajo);
                    if (empleado) {
                        setSelectedEmpleado(empleado);
                        onChange(empleado.legajo);
                    }
                }
            } catch (error) {
                console.error('Error buscando empleado inicial:', error);
            } finally {
                setLoading(false);
            }
        };

        if (initialLegajo && !selectedEmpleado) {
            fetchEmpleadoInicial(initialLegajo);
        }
    }, [initialLegajo]);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (query && !selectedEmpleado) {
                fetchEmpleados(query);
                setShowDropdown(true);
            } else {
                setEmpleados([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, selectedEmpleado]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        if (selectedEmpleado) {
            setSelectedEmpleado(null);
            onChange('');
        }

        if (/^\d+$/.test(inputValue)) {
            onChange(inputValue);
        }
    };

    const handleSelectEmpleado = (empleado: Empleado) => {
        setSelectedEmpleado(empleado);
        setQuery('');
        onChange(empleado.legajo);
        setShowDropdown(false);
    };

    const handleRemoveSelection = () => {
        setSelectedEmpleado(null);
        setQuery('');
        onChange('');
    };

    // ...existing code...

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Tarjeta del empleado seleccionado con tema slate */}
            {selectedEmpleado && (
                <div className="mb-3 p-3 bg-slate-800 border border-slate-600 rounded-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-600 text-slate-100">
                                {selectedEmpleado.legajo}
                            </span>
                            <div>
                                <div className="font-semibold text-slate-100 text-sm">
                                    {selectedEmpleado.nombre} {selectedEmpleado.apellido || ''}
                                </div>
                                {selectedEmpleado.mail && (
                                    <div className="text-xs text-slate-400">
                                        {selectedEmpleado.mail}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveSelection}
                            className="p-1 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-slate-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Input con tema slate */}
            {!selectedEmpleado && (
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full px-3 py-2 border border-slate-600 rounded bg-slate-900 focus:outline-none placeholder:text-slate-400 text-slate-100 focus:ring-2 focus:ring-slate-500 transition-all duration-200 ${showDropdown ? 'rounded-b-none border-slate-500' : ''
                            } ${error ? 'border-red-400 focus:ring-red-400' : ''
                            }`}
                        autoComplete="off"
                        required={required && !selectedEmpleado}
                    />

                    {/* Icono de búsqueda o loader con tema slate */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {loading ? (
                            <div className="animate-spin w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full"></div>
                        ) : (
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {/* Dropdown con tema slate oscuro */}
            {showDropdown && empleados.length > 0 && !selectedEmpleado && (
                <div className="absolute z-50 w-full bg-slate-900 border border-slate-600 border-t-0 rounded-b-md shadow-xl max-h-60 overflow-auto">
                    {empleados.map((empleado, index) => (
                        <button
                            key={empleado.legajo}
                            type="button"
                            onClick={() => handleSelectEmpleado(empleado)}
                            className={`w-full px-4 py-3 text-left hover:bg-slate-800 focus:bg-slate-800 focus:outline-none transition-colors duration-150 ${index !== empleados.length - 1 ? 'border-b border-slate-700' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                                    {empleado.legajo}
                                </span>
                                <div>
                                    <div className="font-semibold text-slate-100 text-sm">
                                        {empleado.nombre} {empleado.apellido || ''}
                                    </div>
                                    {empleado.mail && (
                                        <div className="text-xs text-slate-400">
                                            {empleado.mail}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Estado vacío con tema slate */}
            {showDropdown && !loading && empleados.length === 0 && query.length >= 2 && !selectedEmpleado && (
                <div className="absolute z-50 w-full bg-slate-900 border border-slate-600 border-t-0 rounded-b-md shadow-xl">
                    <div className="px-4 py-6 text-center text-slate-400">
                        <svg className="mx-auto h-8 w-8 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm">No se encontraron empleados</p>
                        <p className="text-xs text-slate-500 mt-1">Intenta con otro término de búsqueda</p>
                    </div>
                </div>
            )}

            {/* Error con tema slate */}
            {error && (
                <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

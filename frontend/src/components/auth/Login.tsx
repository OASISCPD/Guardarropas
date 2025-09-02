import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../logic/api';
import { domain } from '../../config/domain.ts';
import { toast } from 'react-toastify';
import { useSidebar } from '../../context/SideBarContex.tsx';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineLogin } from 'react-icons/hi';

const image = `/images/${domain.toLowerCase()}/logoLogin.png`

export function Login() {
    const [id_usuario, setId_usuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setSelectedLink } = useSidebar();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const body = new URLSearchParams();
            body.append("id_usuario", id_usuario);
            body.append("contraseña", contraseña);

            const response = await fetch(`${BaseUrl}/hacer_login`, {
                method: 'POST',
                body: body,
                credentials: 'include' as RequestCredentials,
                redirect: 'follow' as RequestRedirect,
                mode: "cors" as RequestMode,
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud. Volver a intentar');
            }

            const cookies: any = response.headers.get('Set-Cookie');
            localStorage.setItem('cookies', cookies);

            const result = await response.json();
            setSelectedLink('/home');
            toast.success(result.message);
            navigate("/home");

        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al iniciar sesión. Verifique sus credenciales.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
            <div className="bg-slate-700/50 backdrop-blur-sm shadow-2xl rounded-2xl border border-slate-700 max-w-md w-full p-8">
                {/* Header con logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center ">
                        <img className="object-contain" src={image} alt="logo" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 mb-2">Iniciar Sesión</h1>
                    <p className="text-slate-400 text-sm">Accede a tu cuenta del sistema</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Campo Usuario */}
                    <div className="space-y-2">
                        <label htmlFor="id_usuario" className="block text-sm font-medium text-slate-300">
                            Usuario
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                id="id_usuario"
                                name="id_usuario"
                                value={id_usuario}
                                onChange={(e) => setId_usuario(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorOrange focus:border-colorOrange transition-all duration-200"
                                placeholder="Ingresa tu legajo"
                                autoComplete="username"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Campo Contraseña */}
                    <div className="space-y-2">
                        <label htmlFor="contraseña" className="block text-sm font-medium text-slate-300">
                            Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="contraseña"
                                name="contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                className="w-full pl-10 pr-12 py-3 bg-slate-900/50 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorOrange focus:border-colorOrange transition-all duration-200"
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="w-5 h-5" />
                                ) : (
                                    <FiEye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Botón de login */}
                    <button
                        type="submit"
                        disabled={isLoading || !id_usuario.trim() || !contraseña.trim()}
                        className="w-full bg-gradient-to-r from-colorOrange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Iniciando sesión...</span>
                            </>
                        ) : (
                            <>
                                <HiOutlineLogin className="w-5 h-5" />
                                <span>Ingresar</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500">
                        Sistema de Gestión de Guardarropas
                    </p>
                </div>
            </div>
        </section>
    );

};


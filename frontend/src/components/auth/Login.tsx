import { FormEvent, useState } from 'react';
/* import LogoBingo from '../img/LogoLoginNew.png'; */
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../logic/api';
import { domain } from '../../config/domain.ts';
import { toast } from 'react-toastify';
import { useSidebar } from '../../context/SideBarContex.tsx';

const image = `/images/${domain.toLowerCase()}/logoLogin.png`
export function Login() {
    const [id_usuario, setId_usuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    const { setSelectedLink } = useSidebar();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const body = new URLSearchParams();
            body.append("id_usuario", id_usuario);
            body.append("contraseña", contraseña);
            try {
                const response = await fetch(`${BaseUrl}/hacer_login`, {
                    method: 'POST',
                    body: body,
                    credentials: 'include' as RequestCredentials,
                    redirect: 'follow' as RequestRedirect,
                    mode: "cors" as RequestMode,
                });
                if (!response.ok) {
                    throw new Error('Error en la solicitud. Volver a internar');
                    //mostrar modal de error mediante toast
                }
                const cookies: any = response.headers.get('Set-Cookie');

                // Guardar las cookies en el almacenamiento local (localStorage)
                localStorage.setItem('cookies', cookies);
                const result = await response.json();
                console.log(result.message)
                setSelectedLink('/home')
                toast.success(result.message)
                //aca mandar un message por asi decirlo
                navigate("/home")
            } catch (error) {
                console.error('Error:', error);
            }

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <section className="bg-zinc-900 min-h-screen flex items-center justify-center">
            <div className="bg-colorBlueComponents shadow-lg rounded-2xl max-w-md w-full px-10 py-8">
                <div className="flex flex-col items-center space-y-6">
                    <p className="flex  items-center justify-center mb-6 text-2xl  text-gray-100 ">
                        <img className="  mr-2" src={image} alt="logo" />
                    </p>
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-300 mb-1 text-center">
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="id_usuario"
                                name="id_usuario"
                                value={id_usuario}
                                onChange={(e) => setId_usuario(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="Legajo"
                                autoComplete="off"
                            />
                        </div>

                        <div>
                            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-300 mb-1 text-center">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-black text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                autoComplete="off"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md transition duration-200 shadow-lg"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );

};


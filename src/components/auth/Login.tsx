import React, { FormEvent, useState } from 'react';
/* import LogoBingo from '../img/LogoLoginNew.png'; */
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../logic/api';
import { domain } from '../../config/domain.ts';

const image = `/images/${domain.toLowerCase()}/logoLogin.png`
export function Login() {
    const [id_usuario, setId_usuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();

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
                //aca mandar un message por asi decirlo
                /* navigate("/home") */
            } catch (error) {
                console.error('Error:', error);
            }

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <section className="bg-zinc-900 uppercase">
            <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen py-0">
                <div className="w-full bg-colorGray rounded-lg shadow shadow-stone-500 max-w-md xl:p-0">
                    <div className="space-y-4 md:space-y-6 py-8 px-12">
                        <p className="flex  items-center justify-center mb-6 text-2xl  text-gray-100 ">
                            <img className="  mr-2" src={image} alt="logo" />
                        </p>
                        <form className=" space-y-[2dvh]" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id_usuario" className="block mb-2 text-sm  text-gray-100 text-center">Usuario</label>
                                <input
                                    type="text"
                                    id="id_usuario"
                                    name="id_usuario"
                                    value={id_usuario}
                                    onChange={(e) => setId_usuario(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-md leading-tight focus:shadow-outline focus:outline-none focus:border-red-200 focus:ring focus:ring-red-700 block w-full p-2.5"
                                    placeholder="Legajo"
                                    /*  required="Ingrese su usuario" */
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="contraseña" className="block mb-2 text-sm  text-gray-100 text-center">Contraseña</label>
                                <input
                                    type="password"
                                    id="contraseña"
                                    name="contraseña"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-md leading-tight focus:shadow-outline focus:outline-none focus:border-red-200 focus:ring focus:ring-red-700 block w-full p-2.5"
                                    /* required='Ingrese su password' */
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-md text-sm px-5 py-2.5 text-center"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


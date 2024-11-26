import { useMediaQuery } from "react-responsive";
import { Home } from "../home/HomeDesktop";
import { HomeMobile } from "../mobile/home/HomeMobile";

export function TestingPage() {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1223px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    // Extraer el dominio completo del hostname
    const hostname = window.location.hostname;
    /*  const hostname = 'https://atc.bingopilar.com.ar'
    
     // Dividir el hostname para obtener el subdominio */
    const subdomain = hostname.split(".")[1]; // Esto obtiene 'bingopilar', 'oasiszarate', etc.

    // Imprimir el subdominio en la consola
    console.log("Subdominio:", subdomain);
    return (
        <>
            {isMobile && <HomeMobile />}
            {isTablet && <div>Tablet View</div>}
            {isDesktop && <div>Desktop View</div>}
        </>
    );
}
export default function Footer() {
  return (
    <footer className="bg-white mt-12 pt-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div>
            <h3 className="font-medium mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">MercadoLibre</a></li>
              <li><a href="#">Investor relations</a></li>
              <li><a href="#">Tendencias</a></li>
              <li><a href="#">Sustentabilidad</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Otros sitios</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">Developers</a></li>
              <li><a href="#">MercadoPago</a></li>
              <li><a href="#">MercadoShops</a></li>
              <li><a href="#">MercadoEnvíos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">Comprar</a></li>
              <li><a href="#">Vender</a></li>
              <li><a href="#">Resolución de problemas</a></li>
              <li><a href="#">Centro de seguridad</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Redes sociales</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t py-6 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p>&copy; 1999-2025 MercadoLibre S.R.L.</p>
            </div>
            <div className="flex gap-4">
              <a href="#">Términos y condiciones</a>
              <a href="#">Cómo cuidamos tu privacidad</a>
              <a href="#">Información al usuario financiero</a>
              <a href="#">Ayuda</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
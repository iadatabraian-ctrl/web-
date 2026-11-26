/* Splash corto de la home: pantalla oscura con «Hola» y después «Somos Deploy», unos 2 segundos, una sola vez por visita.
   Es CSS puro (ver .splash en globals.css) más un script en línea que decide, antes del primer pintado, si mostrarlo.
   Mientras dura, la entrada de la portada queda en pausa (clase splash-on) y se libera sola, sin depender de React. */
const SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem('splash')){d.classList.add('no-splash')}else{sessionStorage.setItem('splash','1');d.classList.add('splash-on');setTimeout(function(){d.classList.remove('splash-on')},1700)}}catch(e){}`;

export function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div className="splash" aria-hidden="true">
        <span className="s1">Hola</span>
        <span className="s2">
          Somos <b>Deploy</b>
        </span>
      </div>
    </>
  );
}

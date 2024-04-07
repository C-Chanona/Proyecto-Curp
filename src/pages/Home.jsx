import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import curp from "curp";
import "../assets/home.css";

function CURP() {
    const formData = useRef()
    const recaptchaRef = useRef();
    const persona = curp.getPersona();

    const handlerClick = (e) => {
        e.preventDefault();
        if(recaptchaRef.current.getValue()){
            const data = new FormData(formData.current)
            const reverse = data.get('fecha').split('-').reverse().join('-');
            persona.nombre = data.get("nombre");
            persona.apellidoPaterno = data.get("apellidoP");
            persona.apellidoMaterno = data.get("apellidoM");
            persona.genero = data.get("genero");
            persona.fechaNacimiento = reverse;
            persona.estado = data.get("estado");
            const generated = curp.generar(persona)
            alert(generated)
        }else {
            alert('No has verificado que no eres un robot')
        }
    }

    const validateInput = (e) => {
        const re = /^[a-zA-Z\s]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            return true;
        }
        e.preventDefault();
        alert('Solo se permiten letras');
        e.target.value = '';
    }

    const validateDate = (e) => {
        const date = new Date(e.target.value);
        const today = new Date();
        if (date > today) {
            alert('La fecha no puede ser mayor a la actual');
            e.target.value = '';
        }
    }

    return ( 
      
            <div className="container">
                <form action="#" ref={formData} className="form">
                    <h1>Generador de CURP</h1>
                    <label htmlFor="">Nombre(S)</label>
                    <input type="text" name="nombre" onChange={validateInput}/>
                    <label htmlFor="">Apellido Paterno</label>
                    <input type="text" name="apellidoP" onChange={validateInput} />
                    <label htmlFor="">Apellido Materno</label>
                    <input type="text" name="apellidoM" onChange={validateInput} />
                    <label htmlFor="">Genero</label>
                    <select name="genero" id="">
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                    </select>
                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type="date" name="fecha" onChange={validateDate} />
                    <label htmlFor="">Entidad Federativa</label>
                    <select name="estado" id="">
                        <option value="CS">Chiapas</option>
                    </select>
                    <button  className='button' onClick={handlerClick}>Generar CURP</button>
                </form>
                <div>
                    <ReCAPTCHA sitekey="6LdnzZcpAAAAAPI-6JAzjsUvqqz-QhlG69202h5D" ref={recaptchaRef} />
                </div>
            </div>
      
     );
}

export default CURP;
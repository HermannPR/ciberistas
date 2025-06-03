using System.ComponentModel.DataAnnotations;

namespace ApiCiberistas
{
    public class Inscripcion
    {
        public int id_inscripcion { get; set; }
        public int id_taller { get; set; }
        public string nombre_completo { get; set; } = "";
        public string email { get; set; } = "";
        public string telefono { get; set; } = "";
        public int edad { get; set; }
        public string nivel_educativo { get; set; } = "";
        public string experiencia { get; set; } = "";
        public string motivacion { get; set; } = "";
        public DateTime fecha_inscripcion { get; set; }
        public string estado { get; set; } = "pendiente"; // pendiente, confirmada, cancelada
    }
}

using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;

namespace ApiCiberistas.Controllers;

[ApiController]
[Route("[controller]")]
public class CiberistasController : ControllerBase
{
    string connectionString = "Server=127.0.0.1;Port=3306;Database=ciberistas;Uid=root;password=root;";    // devuelve todos los libros con todos sus datos    [Route("GetTalleres")]
    [HttpGet]
    public List<Talleres> GetTalleres() {
        List<Talleres> listaTalleres = new List<Talleres>();
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.Text;
        cmd.CommandText = "SELECT id_taller, nombre, descripcion, fecha, requisitos, modalidad, cupo FROM talleres ORDER BY fecha";
        cmd.Connection = conexion;

        using (var reader = cmd.ExecuteReader()) {
            while (reader.Read())
            {
                Talleres taller = new Talleres();
                taller.id_taller = Convert.ToInt32(reader["id_taller"]);
                taller.nombre = reader["nombre"]?.ToString() ?? "";
                taller.fecha = DateTime.Parse(reader["fecha"]?.ToString() ?? DateTime.Now.ToString());
                taller.descripcion = reader["descripcion"]?.ToString() ?? "";
                taller.requisitos = reader["requisitos"]?.ToString() ?? "";
                taller.modalidad = reader["modalidad"]?.ToString() ?? "";
                taller.cupo = Convert.ToInt32(reader["cupo"]);
                listaTalleres.Add(taller);
            }
        }

        conexion.Close();
        return listaTalleres;
    }[Route("GetTallerConId/{_id}")]
    [HttpGet]
    public Talleres GetTallerConId(int _id) {
        Talleres taller = new Talleres();
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandText = "SP_LGG_GetTaller";
        cmd.Connection = conexion;

        cmd.Parameters.AddWithValue("@_id", _id);        using (var reader = cmd.ExecuteReader()) {
            if (reader.Read())
            {
                taller.id_taller = Convert.ToInt32(reader["id_taller"]);
                taller.nombre = reader["nombre"]?.ToString() ?? "";
                taller.fecha = DateTime.Parse(reader["fecha"]?.ToString() ?? DateTime.Now.ToString());
                taller.descripcion = reader["descripcion"]?.ToString() ?? "";
                taller.requisitos = reader["requisitos"]?.ToString() ?? "";
                taller.modalidad = reader["modalidad"]?.ToString() ?? "";
                taller.cupo = Convert.ToInt32(reader["cupo"]);
            }
        }

        conexion.Close();
        return taller;
    }

    // Inserte una nueva página a un libro
    [Route("CrearTaller")]
    [HttpPost]
    public void AgregarTaller(string nom, DateTime _fecha, string descr, string req, string _modalidad, string _cupo) {
        
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandText = "SP_LGG_crearTaller";
        cmd.Connection = conexion;
        cmd.Parameters.AddWithValue("@nom", nom);
        cmd.Parameters.AddWithValue("@_fecha", _fecha);
        cmd.Parameters.AddWithValue("@descr", descr);
        cmd.Parameters.AddWithValue("@req", req);
        cmd.Parameters.AddWithValue("@_modalidad", _modalidad);
        cmd.Parameters.AddWithValue("@_cupo", _cupo);
        cmd.Prepare();
        cmd.ExecuteNonQuery();
        conexion.Close();
    }

    // Inserte una nueva página a un libro
    [Route("ModificarTaller")]
    [HttpPut]
    public void AgregarPagina(int _id, string nom, DateTime _fecha, string descr, string req, string _modalidad, string _cupo) {
        
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandText = "SP_LGG_modifyTalleres";
        cmd.Connection = conexion;
        cmd.Parameters.AddWithValue("@nom", nom);
        cmd.Parameters.AddWithValue("@_fecha", _fecha);
        cmd.Parameters.AddWithValue("@descr", descr);
        cmd.Parameters.AddWithValue("@req", req);
        cmd.Parameters.AddWithValue("@_modalidad", _modalidad);
        cmd.Parameters.AddWithValue("@_cupo", _cupo);        cmd.Prepare();
        cmd.ExecuteNonQuery();
        conexion.Close();
    }

    // Crear una nueva inscripción
    [Route("CrearInscripcion")]
    [HttpPost]
    public IActionResult CrearInscripcion([FromBody] Inscripcion inscripcion)
    {
        try
        {
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            
            // Primero verificar si el taller existe y tiene cupo disponible
            MySqlCommand cmdCheck = new MySqlCommand(
                "SELECT cupo, (SELECT COUNT(*) FROM inscripciones WHERE id_taller = @id_taller AND estado != 'cancelada') as inscritos FROM talleres WHERE id_taller = @id_taller", 
                conexion);
            cmdCheck.Parameters.AddWithValue("@id_taller", inscripcion.id_taller);
            
            using (var reader = cmdCheck.ExecuteReader())
            {
                if (reader.Read())
                {
                    int cupo = Convert.ToInt32(reader["cupo"]);
                    int inscritos = Convert.ToInt32(reader["inscritos"]);
                    
                    if (inscritos >= cupo)
                    {
                        conexion.Close();
                        return BadRequest(new { message = "El taller ha alcanzado su cupo máximo" });
                    }
                }
                else
                {
                    conexion.Close();
                    return NotFound(new { message = "Taller no encontrado" });
                }
            }
            
            // Insertar la inscripción
            MySqlCommand cmd = new MySqlCommand(
                @"INSERT INTO inscripciones (id_taller, nombre_completo, email, telefono, edad, nivel_educativo, experiencia, motivacion, fecha_inscripcion, estado) 
                  VALUES (@id_taller, @nombre_completo, @email, @telefono, @edad, @nivel_educativo, @experiencia, @motivacion, @fecha_inscripcion, @estado)", 
                conexion);
            
            cmd.Parameters.AddWithValue("@id_taller", inscripcion.id_taller);
            cmd.Parameters.AddWithValue("@nombre_completo", inscripcion.nombre_completo);
            cmd.Parameters.AddWithValue("@email", inscripcion.email);
            cmd.Parameters.AddWithValue("@telefono", inscripcion.telefono);
            cmd.Parameters.AddWithValue("@edad", inscripcion.edad);
            cmd.Parameters.AddWithValue("@nivel_educativo", inscripcion.nivel_educativo);
            cmd.Parameters.AddWithValue("@experiencia", inscripcion.experiencia);
            cmd.Parameters.AddWithValue("@motivacion", inscripcion.motivacion ?? "");
            cmd.Parameters.AddWithValue("@fecha_inscripcion", DateTime.Now);
            cmd.Parameters.AddWithValue("@estado", "confirmada");
            
            cmd.ExecuteNonQuery();
            conexion.Close();
            
            return Ok(new { message = "Inscripción creada exitosamente", id_inscripcion = cmd.LastInsertedId });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // Obtener inscripciones por taller
    [Route("GetInscripciones/{id_taller}")]
    [HttpGet]
    public List<Inscripcion> GetInscripciones(int id_taller)
    {
        List<Inscripcion> listaInscripciones = new List<Inscripcion>();
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        
        MySqlCommand cmd = new MySqlCommand(
            "SELECT * FROM inscripciones WHERE id_taller = @id_taller ORDER BY fecha_inscripcion DESC", 
            conexion);
        cmd.Parameters.AddWithValue("@id_taller", id_taller);
        
        using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                Inscripcion inscripcion = new Inscripcion
                {
                    id_inscripcion = Convert.ToInt32(reader["id_inscripcion"]),
                    id_taller = Convert.ToInt32(reader["id_taller"]),
                    nombre_completo = reader["nombre_completo"]?.ToString() ?? "",
                    email = reader["email"]?.ToString() ?? "",
                    telefono = reader["telefono"]?.ToString() ?? "",
                    edad = Convert.ToInt32(reader["edad"]),
                    nivel_educativo = reader["nivel_educativo"]?.ToString() ?? "",
                    experiencia = reader["experiencia"]?.ToString() ?? "",
                    motivacion = reader["motivacion"]?.ToString() ?? "",
                    fecha_inscripcion = Convert.ToDateTime(reader["fecha_inscripcion"]),
                    estado = reader["estado"]?.ToString() ?? "pendiente"
                };
                listaInscripciones.Add(inscripcion);
            }
        }
        
        conexion.Close();
        return listaInscripciones;
    }    
}

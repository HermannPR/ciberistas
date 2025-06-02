using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;

namespace ApiCiberistas.Controllers;

[ApiController]
[Route("[controller]")]
public class CiberistasController : ControllerBase
{
    string connectionString = "Server=127.0.0.1;Port=3306;Database=Ciberistas;Uid=root;password=Rayo2008;";

    // devuelve todos los libros con todos sus datos
    [Route("GetTalleres")]
    [HttpGet]
    public List<Talleres> GetTalleres() {
        List<Talleres> listaTalleres = new List<Talleres>();
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandText = "SP_LGG_getTalleres";
        cmd.Connection = conexion;

        Talleres taller1 = new Talleres();
        using (var reader = cmd.ExecuteReader()) {
                if (reader.Read())
                {
                    taller1.id_taller = Convert.ToInt32(reader["id_taller"]);
                    taller1.nombre = reader["nombre"].ToString();
                    taller1.fecha = DateTime.Parse(reader["fecha"].ToString());
                    taller1.descripcion = reader["descripcion"].ToString();
                    taller1.requisitos = reader["requisitos"].ToString();
                    taller1.modalidad = reader["modalidad"].ToString();
                    taller1.cupo = Convert.ToInt32(reader["cupo"]);
                }
            }

        cmd.Prepare();
        cmd.ExecuteNonQuery();
        conexion.Close();

        return listaTalleres;
    }

    [Route("GetTallerConId/{_id}")]
    [HttpGet]
    public Talleres GetTallerConId(int _id) {
        Talleres taller = new Talleres();
        MySqlConnection conexion = new MySqlConnection(connectionString);
        conexion.Open();
        MySqlCommand cmd = new MySqlCommand();
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.CommandText = "SP_LGG_GetTaller";
        cmd.Connection = conexion;

        cmd.Parameters.AddWithValue("@_id", _id);
        using (var reader = cmd.ExecuteReader()) {
                if (reader.Read())
                {
                    taller.id_taller = Convert.ToInt32(reader["id_taller"]);
                    taller.nombre = reader["nombre"].ToString();
                    taller.fecha = DateTime.Parse(reader["fecha"].ToString());
                    taller.descripcion = reader["descripcion"].ToString();
                    taller.requisitos = reader["requisitos"].ToString();
                    taller.modalidad = reader["modalidad"].ToString();
                    taller.cupo = Convert.ToInt32(reader["cupo"]);
                }
            }

        cmd.Prepare();
        cmd.ExecuteNonQuery();
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
        cmd.Parameters.AddWithValue("@_cupo", _cupo);
        cmd.Prepare();
        cmd.ExecuteNonQuery();
        conexion.Close();
    }

    
}

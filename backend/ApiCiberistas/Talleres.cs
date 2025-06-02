public class Talleres
{
	public int id_taller {get;set;}
	public string nombre {get;set;}
	public DateTime fecha {get;set;}
	public string descripcion {get;set;}
	public string requisitos {get;set;}
	public string modalidad {get;set;}
	public int cupo {get;set;}

	public Talleres(){

	}

	public Talleres(int id_taller_,string nombre_,DateTime fecha_,string descripcion_,string requisitos_,string modalidad_,int cupo_)
	{
		this.id_taller = id_taller_;
		this.nombre = nombre_;
		this.fecha = fecha_;
		this.descripcion = descripcion_;
		this.requisitos = requisitos_;
		this.modalidad = modalidad_;
		this.cupo = cupo_;
	}
}
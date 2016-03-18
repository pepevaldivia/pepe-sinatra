class Database
	def initialize(  )
		@connection = Mysql2::Client.new(
			:host => "us-cdbr-iron-east-03.cleardb.net", 
			:database => "ad_55bfe84174d74d1", 
			:username => "b988d75ac51271", 
			:password => "eb0eb858"
			)
	end

	def get_connection
		@connection
	end

	def close_connection
		@connection.close
	end
end

# +++++++++++++++++++++++++++++++++++++++++

class Model
	def initialize
		@db = Database.new
	end

	def query(query_string)
		connection = @db.get_connection
		hash_result = connection.query(query_string, :as => :hash)
		#hash_result.to_json
		array_json = []
		hash_result.each do |row|
		  	#array_json << JSON[row]
		  	array_json << JSON[row]
		end 
		#array_json.to_json
		@db.close_connection
		array_json.to_json
	end
end

# +++++++++++++++++++++++++++++++++++++++++

class Distritos
	def initialize
		@model = Model.new
	end

	def listar(nombre)
		#puts "SELECT id,nombre FROM vw_distrito_provincia_departamento WHERE nombre LIKE '" + nombre + "%' LIMIT 0,10;"
		@model.query( "SELECT id,nombre FROM vw_distrito_provincia_departamento WHERE nombre LIKE '" + nombre + "%' LIMIT 0,10;")
	end
end

class Distrito
	#atributos :  id, nombre
	def initialize
		@departamentos = Distritos.new
	end

	def autocompletar(nombre)
		rpta_json = @departamentos.listar(nombre)
		#JSON[rpta_json].to_json
		rpta_json
	end
end
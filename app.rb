require 'bundler'
Bundler.require

Dir.glob('./lib/*.rb') do |model|
  require model
end

module App
  class App < Sinatra::Application

    #configure
    configure do
      set :root, File.dirname(__FILE__)
      set :public_folder, 'public'
    end

    #database
    #set :database, "sqlite3:///app.db"

    #filters

    #routes
    get '/' do
      erb :index
    end

    post '/distrito' do
        nombre = params['distrito']
        nombre = JSON.parse(nombre)
        #nombre = nombre['textoBuscar']

        distrito = Distrito.new
        distrito.autocompletar(nombre)
    end
    
    get '/distrito' do
        nombre = params['distrito']
        #nombre = JSON.parse(nombre)
        #nombre = nombre['textoBuscar']

        distrito = Distrito.new
        distrito.autocompletar(nombre)
    end

    #helpers
    helpers do
      def partial(file_name)
        erb file_name, :layout => false
      end
    end

  end
end

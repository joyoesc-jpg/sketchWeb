package Servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svGetProjects extends HttpServlet {
    
    private db DB;
    private ResultSet tableRs;

    public svGetProjects (){
        super();
    }
    
    ///Función parseadora de json
    private int parseJsonID(String json){
        
        String[] jsonElements = json.split(",");
        
        
        int id = Integer.parseInt(jsonElements[0].split(":")[1]);
        
        return id;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        
        ///Variables a utilizar
        String line;
        String json = "";
        int id = 0;
        DB = new db();
        PrintWriter wrt = response.getWriter();
        
        ///Obtener Json
        try{
            BufferedReader reader = request.getReader();
            while((line = reader.readLine()) != null){
                json = json.concat(line);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        int userID = parseJsonID(json);
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            tableRs = DB.executeQuery("SELECT * FROM project where user_id = " + userID + ";"); 
            wrt.print("{drawings:[");
            while(tableRs.next()){
                id = tableRs.getInt("ID");
                wrt = response.getWriter();
                wrt.print("{\"id\" :\"" + id + "\"}");
            }
            wrt.print("{]}");
            DB.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
            wrt = response.getWriter();
            wrt.print("{\"id\" :\"null\"}");
        }
        
    }
    
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

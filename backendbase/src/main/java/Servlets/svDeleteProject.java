package Servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svDeleteProject extends HttpServlet {

    private db DB;
    private ResultSet tableRs;
    
    
    private String getString(String rawObject){
        if(!rawObject.contains("\"")){
            return rawObject;
        }
        
        String newStr = rawObject.substring(
                rawObject.indexOf("\"") + 1,
                rawObject.lastIndexOf("\"")
        );
        
        return newStr;
    }
    
    private HashMap<String, String> parseJson(String json){
        if(json.charAt(0) != '{' || json.charAt(json.length() - 1) != '}'){
            return null;
        }
        
        json = json.substring(1, json.length() - 1);
        
        String[] objects = json.split(",");
        
        HashMap<String, String> map = new HashMap<String, String>();
        for(String object: objects){
            String[] values = object.split(":");
            map.put(getString(values[0]), getString(values[1]));
        }
        
        return map;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        ///Declara devolución de json,
        response.setContentType("application/json");
        
        ///Variables a utilizar
        String line;
        String rawJson = "";
        DB = new db();
        PrintWriter wrt = response.getWriter();
        
        ///Obtener Json
        try{
            BufferedReader reader = request.getReader();
            while((line = reader.readLine()) != null){
                rawJson = rawJson.concat(line);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        HashMap<String, String> json = parseJson(rawJson);
        
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            
            DB.executeUpdate("DELETE FROM Project where id = "+ json.get("idProject") + ";");
            
            DB.closeConnection();
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"}");
            e.printStackTrace();
            return;
        }
        
        wrt.print("{\"error\" : false}");
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

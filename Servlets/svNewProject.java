package Servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author carlo
 */
@WebServlet(name = "svNewProject", urlPatterns = {"/svNewProject"})
public class svNewProject extends HttpServlet {
    
    db DB;

    public svNewProject (){
        super();
        DB = new db();
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
        }catch(Exception e){
            System.out.println(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getParameter("stroke");
        
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

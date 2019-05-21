package admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import api.DataLink;

public class UpdateStock extends HttpServlet {

	/**
		 * Constructor of the object.
		 */
	public UpdateStock() {
		super();
	}

	/**
		 * Destruction of the servlet. <br>
		 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
		 * The doGet method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to get.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}

	/**
		 * The doPost method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to post.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		int sku = Integer.parseInt(request.getParameter("sku"));
		int stock = Integer.parseInt(request.getParameter("stock"));
		JSONObject json = new JSONObject();
		PrintWriter out = response.getWriter();
		Connection conn = null;
		PreparedStatement stmt = null;
		DataLink dataLink = new DataLink();
		conn = dataLink.linkData();
		try {
			stmt = conn.prepareStatement("update price set stock=? where sku = ?");
			stmt.setInt(1, stock);
			stmt.setInt(2, sku);
			int index = stmt.executeUpdate();
			if(index>0){
				json.put("status", "success");
				json.put("message", "库存更新成功");
			}
			else{
				json.put("status", "fail");
				json.put("message", "库存更新出现错误");
			}
			out.write(json.toString());
			out.flush();
			out.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", "fail");
			json.put("message", "库存更新出现错误");
			out.write(json.toString());
			out.flush();
			out.close();
		}
	}

	/**
		 * Initialization of the servlet. <br>
		 *
		 * @throws ServletException if an error occurs
		 */
	public void init() throws ServletException {
		// Put your code here
	}

}
